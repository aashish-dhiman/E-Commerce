import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-[60vh]">
                <Routers />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
