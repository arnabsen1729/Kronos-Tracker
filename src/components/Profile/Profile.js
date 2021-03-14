import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMedal,
    faFlagCheckered,
    faClipboardList,
    faStar,
    faRunning,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { fetchPoints, fetchTodosDB } from '../../db/db';

const getTotalPoints = (points) => {
    return points.reduce((acc, pt) => acc + pt.points, 0);
};

const getMostProductiveDay = (points) => {
    const ptArr = points.map((pt) => [pt.points, pt.date]);
    ptArr.sort(function (a, b) {
        return b[0] - a[0];
    });

    if (ptArr.length > 0) return ptArr[0];
    else return [0, 'N/A'];
};

const getLongestStreak = (points) => {
    const dateArr = points.map((pt) => pt.date);
    dateArr.sort();
    let maxCount = 0;
    let currCount = 0;
    if (dateArr.length === 0) {
        return 0;
    } else if (dateArr.length === 1) {
        return 1;
    } else {
        for (let index = 1; index < dateArr.length; index += 1) {
            let now = new Date(dateArr[index]).getTime();
            let prev = new Date(dateArr[index - 1]).getTime();
            if (now - prev <= 24 * 60 * 60 * 1000) {
                currCount += 1;
            } else {
                currCount = 0;
            }

            maxCount = Math.max(maxCount, currCount);
        }

        return maxCount;
    }
};

const getCurrentStreak = (points) => {
    const dateArr = points.map((pt) => pt.date);
    dateArr.sort();
    dateArr.reverse();
    let currCount = 0;
    if (dateArr.length === 0) {
        return 0;
    } else if (dateArr.length === 1) {
        return 1;
    } else {
        for (let index = 1; index < dateArr.length; index += 1) {
            let now = new Date(dateArr[index]).getTime();
            let prev = new Date(dateArr[index - 1]).getTime();
            if (prev - now <= 24 * 60 * 60 * 1000) {
                currCount += 1;
            } else {
                break;
            }
        }

        return currCount;
    }
};

const getCompletedTodos = (allTodos) => {
    return allTodos.filter((todo) => todo.completed).length;
};

const getLeftTodos = (allTodos) => {
    return allTodos.filter((todo) => !todo.completed).length;
};

function Profile({ user }) {
    const getUserDetails = (userData) => {
        if (userData.isAnonymous) {
            return {
                name: 'Guest',
                email: 'guest@address.com',
                img:
                    'https://raw.githubusercontent.com/arnabsen1729/static-content/master/tidy/default-avatar.png',
            };
        } else {
            return {
                name: userData.displayName,
                email: userData.email,
                img: userData.photoURL,
            };
        }
    };
    let [points, setPoints] = useState([]);
    let [allTodos, setAllTodos] = useState([]);
    let [userDetails, setUserDetails] = useState({
        name: 'Guest',
        email: 'guest@address.com',
        img:
            'https://raw.githubusercontent.com/arnabsen1729/static-content/master/tidy/default-avatar.png',
    });

    useEffect(() => {
        console.log('Chart mounted...');
        fetchPoints(user).then((ptArr) => {
            setPoints(ptArr);
        });
        fetchTodosDB(user).then((todoArr) => {
            setAllTodos(todoArr);
        });
    }, []);

    useEffect(() => {
        console.log('Points array upd', points);
    }, [points]);

    useEffect(() => {
        setUserDetails(getUserDetails(user));
    }, [user]);

    useEffect(() => {
        console.log('TODOS:', allTodos);
    }, [allTodos]);

    return (
        <div class="border rounded-lg bg-white m-auto border-gray-400 mt-36 w-2/3 h-auto grid grid-cols-3">
            <div className="mt-12 col-span-2">
                <div className="flex justify-around">
                    <div class="">
                        <div class="w-48 h-48 relative mb-4">
                            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                                <img
                                    src={userDetails.img}
                                    alt="lovely avatar"
                                    class="object-cover object-center w-full h-full visible group-hover:hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-10">
                        <div className="text-4xl font-bold">
                            {userDetails.name}
                        </div>
                        <div className="text-2xl text-gray-700">
                            {userDetails.email}
                        </div>
                    </div>
                </div>
                <div class="flex py-2 my-4 text-center px-4 justify-around">
                    <div class="w-1/3 px-2">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FontAwesomeIcon icon={faMedal} size="2x" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                                {getTotalPoints(points)}
                            </h2>
                            <p class="leading-relaxed">Points</p>
                        </div>
                    </div>
                    <div class="w-1/3 px-2">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FontAwesomeIcon icon={faFlagCheckered} size="2x" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                                {getCompletedTodos(allTodos)}
                            </h2>
                            <p class="leading-relaxed">Completed Todos</p>
                        </div>
                    </div>
                    <div class="w-1/3 px-2">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FontAwesomeIcon icon={faClipboardList} size="2x" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                                {getLeftTodos(allTodos)}
                            </h2>
                            <p class="leading-relaxed">Left Todos</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex flex-col px-5 space-y-6">
                    <div class="">
                        <div class="border-l-8 border-red-600 bg-red-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faMedal}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div class="text-center">
                                    <p class="text-sm font-medium text-black-600 ">
                                        Most productive
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        {getMostProductiveDay(points)[1]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-blue-600 bg-blue-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faLightbulb}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div class="text-center">
                                    <p class="text-sm font-medium text-black-600 ">
                                        Max points
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        {getMostProductiveDay(points)[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-yellow-600 bg-yellow-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div class="text-center">
                                    <p class="text-sm font-medium text-black-600 ">
                                        Longest Streak
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        {getLongestStreak(points)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-green-600 bg-green-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faRunning}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div class="text-center">
                                    <p class="text-sm font-medium text-black-600 ">
                                        Current Streak
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        {getCurrentStreak(points)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
