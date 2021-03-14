import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../../components/Dashboard/Dashboard';
import { provider } from '../../db/db';

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
            <div className="home-body">
                <header className="home-showcase">
                    <div className="home-content md:pt-32">
                        <img
                            src={process.env.PUBLIC_URL + '/assets/kronos.png'}
                            className="home-logo text-center m-auto"
                            alt="Traversy Media"
                        ></img>
                        <div className="home-title mb-4">Kronos Tracker</div>
                        <div className="flex flex-col justify-items-center">
                            <button
                                onClick={logIn}
                                className="flex items-center justify-center bg-red-400 hover:bg-red-700 focus:outline-none text-white font-bold py-2 px-4 rounded w-48 mx-auto "
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
                                className="bg-blue-500 hover:bg-blue-700 text-white flex items-center focus:outline-none justify-center font-bold py-2 px-4 rounded mx-auto w-52 mt-4"
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
                </header>
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
