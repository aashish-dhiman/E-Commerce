const Spinner = () => {
    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            {/* <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-[50px] w-[50px]" /> */}
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600" />
        </div>
    );
};

export default Spinner;
