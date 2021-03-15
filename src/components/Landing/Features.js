function Features() {
    return (
        <div className="text-gray-300 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Salient Features of Kronos Tracker</h1>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center  text-purple-400 mb-5 flex-shrink-0">
                            <img src={process.env.PUBLIC_URL +
                                '/assets/user.svg'} ></img>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-white text-2xl title-font font-medium mb-3">Profile page</h2>
                            <p className="leading-relaxed text-xl">A user profile that gives the insight of your points earned along with other important informations.</p>

                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center text-purple-400 mb-5 flex-shrink-0">

                            <img src={process.env.PUBLIC_URL +
                                '/assets/stopwatch.svg'} ></img>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-white text-2xl title-font font-medium mb-3">Timer</h2>
                            <p className="leading-relaxed text-xl">A countdown timer that accompanies you with a white noise while you concentrate on your work.</p>

                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center  text-purple-400 mb-5 flex-shrink-0">
                            <img src={process.env.PUBLIC_URL +
                                '/assets/graphs.svg'} ></img>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-white text-2xl title-font font-medium mb-3">Graphs and charts</h2>
                            <p className="leading-relaxed text-xl">Charts and graphs visualise your progress to keep you boosted to be more producive.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;