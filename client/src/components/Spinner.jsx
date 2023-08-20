import React from "react";

const Spinner = () => {
    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-[50px] w-[50px]" />
        </div>
    );
};

export default Spinner;
