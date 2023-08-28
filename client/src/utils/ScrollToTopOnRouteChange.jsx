import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnRouteChange = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth", 
        });
    }, [location.pathname]);

    return null;
};

export default ScrollToTopOnRouteChange;
