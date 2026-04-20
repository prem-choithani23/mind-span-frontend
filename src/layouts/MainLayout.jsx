import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubscribeEmail from "../components/SubscribeEmail.jsx";
import usePageTitle from "../hooks/usePageTitle";

function MainLayout() {
    usePageTitle()
    return (
        <>
            <Navbar />
            <div
                className="
                mx-auto
                px-5        /* mobile */
                md:px-6     /* tablet */
                lg:px-30    /* desktop */
                max-w-screen-2xl
              "
            >
                <main>
                    <Outlet />
                </main>

            </div>
            <SubscribeEmail/>
            <Footer />
        </>

    );
}

export default MainLayout;
