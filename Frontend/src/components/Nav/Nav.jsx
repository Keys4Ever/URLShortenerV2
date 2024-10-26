import { useAuth } from "../../context/authContext";
import ImageDropMenu from "./components/ImageDropMenu/ImageDropMenu.jsx";
import LogoCliqueable from './components/LogoCliqueable.jsx';
import LoginButton from '../LoginButton.jsx'
import CreatorInfo from "./components/CreatorInfo.jsx";

const Nav = () => {
    const { auth } = useAuth();
    
    return (
        <nav className="bg-white dark:bg-black border-b-2 border-black dark:border-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <LogoCliqueable />
                <div className="flex items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <CreatorInfo link="https://keys4ever.dev" label="Creator Info"/>
                    {auth.authenticated ? <LoginButton /> : <ImageDropMenu /> }
                </div>
            </div>
        </nav>
    );
}

export default Nav;
