import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Check if splash was already shown in this session
        const splashShown = sessionStorage.getItem("splashShown");
        if (splashShown) {
            setShowSplash(false);
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
    };

    return (
        <>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <AppRoutes />
        </>
    );
}

export default App;
