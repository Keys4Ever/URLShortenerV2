import { useAuth } from "../../context/authContext"; 
import ImageDropMenu from "./components/ImageDropMenu/ImageDropMenu.jsx";
import LogoCliqueable from './components/LogoCliqueable.jsx';
import LoginButton from '../LoginButton.jsx';
import ABtn from "../ABtn.jsx";

const Nav = () => {
    const { auth } = useAuth();
    
    return (
        <nav className="bg-white dark:bg-black border-b-2 border-black dark:border-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                
                <LogoCliqueable />
                
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 md:order-2">
                    
                    <ABtn link="https://keys4ever.dev" label="Creator Info" className="text-xs sm:text-sm md:text-base lg:text-lg" />

                    {auth.authenticated ? <ImageDropMenu /> : <LoginButton /> }
                </div>
            </div>
        </nav>
    );
}

export default Nav;
