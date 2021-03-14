import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMedal,
    faFlagCheckered,
    faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { fetchPoints } from '../../db/db';

const getTotalPoints = (points) => {
    return points.reduce((acc, pt) => acc + pt.points, 0);
};

const getTotalMarkedTodos = (allTodos) => {};

function Profile({ user, allTodos }) {
    const getUserDetails = (userData) => {
        if (userData.isAnonymous) {
            return {
                name: 'Gues',
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
    let [userDetails, setUserDetails] = useState({
        name: 'Gues',
        email: 'guest@address.com',
        img:
            'https://raw.githubusercontent.com/arnabsen1729/static-content/master/tidy/default-avatar.png',
    });

    useEffect(() => {
        console.log('Chart mounted...');
        fetchPoints(user).then((ptArr) => {
            setPoints(ptArr);
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
        <div class="border rounded-lg bg-white m-auto border-gray-400 mt-36 w-2/3 h-1/2 grid grid-cols-3">
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
                                1.3K
                            </h2>
                            <p class="leading-relaxed">Points</p>
                        </div>
                    </div>
                    <div class="w-1/3 px-2">
                        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FontAwesomeIcon icon={faClipboardList} size="2x" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">
                                1.3K
                            </h2>
                            <p class="leading-relaxed">Points</p>
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
                                <div>
                                    <p class="text-sm font-medium text-black-600 ">
                                        Most productive day
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        10/10/10
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-blue-600 bg-blue-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faMedal}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div>
                                    <p class="text-sm font-medium text-black-600 ">
                                        Most points
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        10/10/10
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-yellow-600 bg-yellow-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faMedal}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div>
                                    <p class="text-sm font-medium text-black-600 ">
                                        Longest Streak
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        10/10/10
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="border-l-8 border-green-600 bg-green-200 px-4 py-4">
                            <div class="flex justify-around">
                                <FontAwesomeIcon
                                    icon={faMedal}
                                    size="2x"
                                    className="my-auto"
                                />
                                <div>
                                    <p class="text-sm font-medium text-black-600 ">
                                        Current Streak
                                    </p>
                                    <p class="text-2xl font-bold text-gray-700">
                                        10/10/10
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
