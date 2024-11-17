import { useAuth } from "../../context/authContext"; 
import { useLocation } from 'react-router-dom'
import ImageDropMenu from "./components/ImageDropMenu/ImageDropMenu.jsx";
import LogoCliqueable from './components/LogoCliqueable.jsx';
import LoginButton from '../LoginButton.jsx';
import ABtn from "../ABtn.jsx";
import { useEffect, useState } from "react";

const Nav = () => {
    const { auth } = useAuth();
    let location = useLocation();
    const [url, setUrl] = useState('');

    useEffect(()=>{
         setUrl(location.pathname);
         console.log(url);  
    },  [location])

    return (
        <nav className="bg-white dark:bg-black border-b-2 border-black dark:border-white">
            <div className="flex flex-wrap items-center justify-between max-w-[932px] mx-auto p-4">
                <LogoCliqueable />
                <div className="flex items-center gap-4">
                    {url != '/' ? <ABtn label='Home'link='/' /> : <ABtn link="https://keys4ever.dev" label="Creator Info" className="text-xs sm:text-sm md:text-base lg:text-lg" external />}

                    {auth.authenticated ? <ImageDropMenu /> : <LoginButton /> }
                </div>
            </div>
        </nav>
    );
}

export default Nav;
