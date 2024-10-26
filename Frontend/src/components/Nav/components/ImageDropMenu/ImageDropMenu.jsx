import { useState } from 'react';
import { useAuth } from '../../../../context/authContext.jsx'; // Importa el contexto de autenticación
import OptionList from './options/OptionList.jsx';

const ImageDropMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useAuth(); // Obtén el estado de autenticación

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                />
            </button>
            <div
                className={`absolute right-0 mt-2 z-50 ${isOpen ? '' : 'hidden'} w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
            >
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{auth.user?.name || 'Usuario'}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{auth.user?.email || 'Email no disponible'}</span>
                </div>
                <OptionList />
            </div>
        </div>
    );
};

export default ImageDropMenu;
