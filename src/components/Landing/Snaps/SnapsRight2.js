import Zoom from 'react-reveal/Zoom';
function SnapsRight2() {
    return (
        <div className="bg-gray-900"><div className="motion-safe:animate-fadeIn text-gray-300 mx-8 py-16">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 ">
                <div className="order-last md:order-first my-auto lg:ml-32 lg:mr-12">
                    <div className="py-2">
                        <div className="text-2xl font-bold">
                            Timer
                        </div>
                        <div className="text-xl">
                            Countdown timer works with you until you complete it.
                        </div>
                    </div>
                    <div className="py-2 lg:mt-16">
                        <div className="text-2xl font-bold">
                            White noise
                        </div>
                        <div className="text-xl">
                            Soothing music while working will help you to concentrate.
                        </div>
                    </div>
                </div>
                <Zoom>
                    <div className="my-auto" >
                        <img className="rounded-md" src={process.env.PUBLIC_URL + '/snaps/s4.png'}></img>
                    </div>
                </Zoom>
            </div>
        </div></div>
    )
}

export default SnapsRight2