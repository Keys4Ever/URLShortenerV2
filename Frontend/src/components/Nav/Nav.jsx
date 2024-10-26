import { useAuth } from "../../context/authContext";
import ImageDropMenu from "./components/ImageDropMenu/ImageDropMenu.jsx";
import LogoCliqueable from './components/LogoCliqueable.jsx';
import LoginButton from '../LoginButton.jsx'

const Nav = () => {
    const { auth } = useAuth();
    
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <LogoCliqueable />
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <a href="https://keys4ever.dev/" className="text-white mr-4 hover:text-blue-700 dark:hover:text-blue-500">
                        Creator Info
                    </a>

                    {auth.authenticated ? <ImageDropMenu /> : <LoginButton />}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
