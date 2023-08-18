import React from "react";
import SeoMetadata from "../SEO/seoMetadata";
import { useAuth } from "../context/auth";

const Home = () => {
    const [auth, setAuth] = useAuth();
    return (
        <>
            <SeoMetadata title="Home - Flipkart" />
            <pre className="min-h-[60vh]">{JSON.stringify(auth,null,3)}</pre>
        </>
    );
};

export default Home;
