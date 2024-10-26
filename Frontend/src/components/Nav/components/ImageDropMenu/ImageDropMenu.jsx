import { useState } from 'react';
import { User } from 'lucide-react';
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
                className="flex items-center justify-center w-10 h-10 bg-black text-white border-2 border-white rounded-full hover:bg-white hover:text-black focus:outline-none transition-colors duration-200"
                id="user-menu-button"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <User className="w-5 h-5" />
            </button>
            
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-black text-white border-2 border-white shadow-lg font-mono"
                    id="user-dropdown"
                >
                    <div className="px-4 py-3 border-b-2 border-white text-center">
                        <span className="block text-sm font-bold">{auth.user?.email || 'Usuario'}</span>
                        <span className="block text-xs text-gray-400">Free Plan</span>
                    </div>
                    <OptionList />
                </div>
            )}
        </div>
    );
};

export default ImageDropMenu;
