import React from "react";
import SeoMetadata from "../SEO/seoMetadata";
import { useAuth } from "../context/auth";

const Home = () => {
    const [auth, setAuth] = useAuth();
    return (
        <>
            <SeoMetadata title="Home - Flipkart" />
            <div className="min-h-[60vh]">{JSON.stringify(auth)}</div>
        </>
    );
};

export default Home;
