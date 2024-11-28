import { useAuth } from "../../context/authContext"; 
import { useLocation } from 'react-router-dom';
import ImageDropMenu from "./components/ImageDropMenu/ImageDropMenu.jsx";
import LogoCliqueable from './components/LogoCliqueable.jsx';
import LoginButton from '../LoginButton.jsx';
import ABtn from "../ABtn.jsx";
import { useEffect, useState } from "react";

const Nav = () => {
    const { auth } = useAuth();
    let location = useLocation();
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <nav className="sticky top-0 bg-white dark:bg-black border-b-2 border-black dark:border-white z-50 shadow-sm">
            <div className="flex flex-wrap items-center justify-between px-4 py-3 max-w-[900px] mx-auto">
                <LogoCliqueable />
                <div className="flex items-center gap-2 sm:gap-4">
                    {url !== '/' ? (
                        <ABtn 
                            label="Home" 
                            link="/" 
                            className="text-xs sm:text-sm"
                        />
                    ) : (
                        <ABtn
                            link="https://keys4ever.dev"
                            label="Creator Info"
                            className="text-xs sm:text-sm"
                            external
                        />
                    )}

                    {auth.authenticated ? <ImageDropMenu /> : <LoginButton />}
                </div>
            </div>
        </nav>
    );
};

export default Nav;