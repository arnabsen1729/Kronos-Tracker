
import Zoom from 'react-reveal/Zoom';
function SnapsLeft2() {
    return (
        <div>
            <div className="motion-safe:animate-fadeIn text-blue-900 mx-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Zoom>
                        <div className="my-auto">
                            <img className="rounded-md" src={process.env.PUBLIC_URL + '/snaps/s3.png'}></img>
                        </div>
                    </Zoom>
                    <div className="my-auto lg:mr-32 lg:ml-12">
                        <div className="py-2">
                            <div className="text-2xl font-bold">
                                Time utilization</div>
                            <div className="text-xl">
                                Try to spend your time for the most urgent and important jobs.
                            </div>
                        </div>
                        <div className="py-2 lg:mt-16">
                            <div className="text-2xl font-bold">
                                Selectivity
                            </div>
                            <div className="text-xl">
                                Prioritize and utilize the day in best possible way.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnapsLeft2;