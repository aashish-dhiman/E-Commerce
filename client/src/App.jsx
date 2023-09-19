import "./App.css";
import Layout from "./layouts/Layout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return (
        <>
            <Layout />
        </>
    );
}

export default App;
