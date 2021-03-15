
import Zoom from 'react-reveal/Zoom';
function SnapsLeft3() {
    return (
        <div>
            <div className="motion-safe:animate-fadeIn text-blue-900 mx-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Zoom>
                        <div className="my-auto">
                            <img className="rounded-md" src={process.env.PUBLIC_URL + '/snaps/s6.png'}></img>
                        </div>
                    </Zoom>
                    <div className="my-auto lg:mr-32 lg:ml-12">
                        <div className="py-2">
                            <div className="text-2xl font-bold">
                                Profile
                            </div>
                            <div className="text-xl">
                                Get a quick look at your total points and todos left.
                            </div>
                        </div>
                        <div className="py-2 lg:mt-16">
                            <div className="text-2xl font-bold">
                                Track
                            </div>
                            <div className="text-xl">
                                Track your best days and compete with yourself for a better you.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnapsLeft3;