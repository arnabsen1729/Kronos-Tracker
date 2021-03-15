import React, { useState, useEffect } from 'react';
import { Element } from "react-scroll";
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../../components/Dashboard/Dashboard';
import { provider } from '../../db/db';
import Footer from '../../components/Landing/Footer';
import Features from '../../components/Landing/Features';
import Navbar from '../../components/Landing/Navbar';
import Team from '../../components/Landing/Team';
import SnapsLeft1 from '../../components/Landing/Snaps/SnapsLeft1';
import SnapsRight1 from '../../components/Landing/Snaps/SnapsRight1';
import SnapsLeft2 from '../../components/Landing/Snaps/SnapsLeft2';
import SnapsRight2 from '../../components/Landing/Snaps/SnapsRight2'
import SnapsLeft3 from '../../components/Landing/Snaps/SnapsLeft3';
function Home() {
    let [isAuthorized, setIsAuthorized] = useState(false);
    let [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUserDetails(user);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                setUserDetails(null);
            }
        });
    }, []);

    const logIn = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                //@type {firebase.auth.OAuthCredential}
                //var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = credential.accessToken;

                // The signed-in user info.
                var user = result.user;
                setUserDetails(user);
                setIsAuthorized(true);
                firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                //var errorCode = error.code;

                var errorMessage = error.message;
                alert(errorMessage);

                // The email of the user's account used.
                //var email = error.email;

                // The firebase.auth.AuthCredential type that was used.
                //var credential = error.credential;
            });
    };

    const logInAnonymous = () => {
        firebase
            .auth()
            .signInAnonymously()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                //var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const landingComp = () => {
        return (
            <div>
                <Navbar />
                <Element name="Hero"></Element>
                <div className="home-body h-auto">
                    <div className="text-black text-xl bg-white body-font">
                        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                                <img className="object-cover object-center rounded" alt="hero" src={process.env.PUBLIC_URL + '/assets/kronos.png'}></img>
                            </div>
                            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                                <div className="title-font sm:text-4xl text-4xl mb-4 font-medium text-black">Kronos Tracker</div>
                                <p className="mb-8 leading-relaxed">A modern todo management tool that groups tasks on the basis of priority levels, comes with features of Google schedule, a timer with white noise for focussed work, awesome progress reports, and points for motivation and improved producitvity.</p>
                                <div className="flex justify-center">
                                    {/* <button className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">Button</button>
                                <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Button</button> */}
                                    <div className="flex flex-row justify-around ">
                                        <button
                                            onClick={logIn}
                                            className="flex items-center justify-center border border-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none text-purple-900 font-bold py-2 px-4 rounded w-60 mx-auto "
                                        >
                                            Continue with
                                <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    '/assets/google.svg'
                                                }
                                                style={{
                                                    height: '25px',
                                                    width: '25px',
                                                    paddingLeft: '8px',
                                                }}
                                                alt="Google Sign in"
                                            ></img>
                                        </button>
                                        <button
                                            onClick={logInAnonymous}
                                            className="bg-purple-700 hover:bg-purple-900 text-white flex items-center focus:outline-none justify-center font-bold py-2 px-4 rounded mx-auto w-60 ml-4"
                                        >
                                            Sign in as guest
                                <FontAwesomeIcon
                                                icon={faUser}
                                                size="2x"
                                                className="pl-4"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Element name="Features"></Element>
                <Features />
                <Element name="Snaps"></Element>
                <div className="text-3xl font-medium title-font text-gray-900 w-full text-center mt-20">
                    Snaps

                </div>
                <div className="flex mt-6 justify-center">
                    <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                </div>
                <SnapsLeft1 />
                <SnapsRight1 />
                <SnapsLeft2 />
                <SnapsRight2 />
                <SnapsLeft3 />
                <Element name="Team"></Element>
                <Team />
                <Footer />
            </div>
        );
    };
    const dashboardComp = () => {
        return (
            <div>
                <Dashboard user={userDetails} isAuthorized={isAuthorized} />
            </div>
        );
    };
    return <div>{!isAuthorized ? landingComp() : dashboardComp()}</div>;
}

export default Home;
