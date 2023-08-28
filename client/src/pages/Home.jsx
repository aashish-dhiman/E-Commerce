import React from "react";
import SeoMetadata from "../SEO/seoMetadata";
import { useAuth } from "../context/auth";
import ScrollToTopOnRouteChange from "../utils/ScrollToTopOnRouteChange";

const Home = () => {
    const [auth, setAuth] = useAuth();
    return (
        <>
            <SeoMetadata title="Home - Flipkart" />
            <ScrollToTopOnRouteChange />
            <pre className="min-h-[60vh]">{JSON.stringify(auth, null, 3)}</pre>
        </>
    );
};

export default Home;
