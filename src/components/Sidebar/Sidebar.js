import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { signOut } from '../../db/db';

import {
    faSignOutAlt,
    faChartPie,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
function Sidebar({ showChartFn }) {
    return (
        <div className="h-screen z-30 fixed inset-y-0 left-0 w-14">
            <div className="h-screen w-14 hidden md:flex items-center">
                <div className=" w-full rounded-3xl flex flex-col rounded-l-none bg-gray-300">
                    <div className="px-2 py-6 cursor-pointer font-bold rounded-3xl rounded-l-none rounded-b-none text-gray-800 hover:bg-yellow-400 hover:text-white transform hover:translate-x-1 transition duration-300">
                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </div>

                    <div
                        className="px-2 py-6 cursor-pointer font-bold text-gray-800 hover:bg-green-400 hover:text-white transform hover:translate-x-1 transition duration-300"
                        onClick={showChartFn}
                    >
                        <FontAwesomeIcon icon={faChartPie} size="2x" />
                    </div>
                    <div
                        onClick={signOut}
                        className="px-2 py-6 cursor-pointer font-bold rounded-3xl rounded-l-none rounded-t-none text-gray-800 hover:bg-red-400 hover:text-white transform hover:translate-x-1 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                    </div>
                </div>
            </div>
            <div className="w-screen bg-gray-400 rounded-3xl rounded-b-none fixed bottom-0 h-16 flex md:hidden justify-items-center items-center">
                <div className="flex w-full justify-around">
                    <div className="px-2 py-4 rounded-3xl rounded-b-none rounded-r-none font-bold text-gray-800 hover:bg-yellow-400 hover:text-white w-full text-center transform hover:-translate-y-1 transition duration-300">
                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </div>

                    <div
                        className="px-2 py-4 font-bold text-gray-800 hover:bg-green-400 hover:text-white w-full text-center transform hover:-translate-y-1 transition duration-300"
                        onClick={showChartFn}
                    >
                        <FontAwesomeIcon icon={faChartPie} size="2x" />
                    </div>
                    <div
                        onClick={signOut}
                        className="px-2 py-4 rounded-3xl rounded-b-none rounded-l-none font-bold text-gray-800 hover:bg-red-400 hover:text-white w-full text-center transform hover:-translate-y-1 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
