import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className=" w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div>
                            <h1 className="my-2 text-gray-800 font-bold text-[28px]">
                                Looks like you've found the doorway to the great
                                nothing.
                            </h1>
                            <p className="mt-2 text-[20px] mb-5 text-gray-800">
                                Sorry about that! Please visit our homepage to
                                get where you need to go.
                            </p>
                            <Link
                                to="/"
                                className="sm:w-full lg:w-auto border rounded-md py-2 px-4 text-center bg-primaryBlue text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 text-[18px]"
                            >
                                Take me there!
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    );
};

export default PageNotFound;
