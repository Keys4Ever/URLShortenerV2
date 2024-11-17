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
        <div className="relative z-50">
            <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-black text-white border-2 border-white hover:bg-white hover:text-black focus:outline-none transition-colors duration-200"
                id="user-menu-button"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                {auth?.user?.picture ? <img src={auth.user.picture}  className='w-10'/> : <User className='w-5 h-5' />}
            </button>
            
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white shadow-lg font-mono"
                    id="user-dropdown"
                >
                    <div className="px-4 py-3 border-b-2 border-white text-center">
                        <span className="block text-sm font-bold">{auth.user?.nickname || 'Usuario'}</span>
                        <span className="block text-xs text-gray-400">{auth.user?.email || 'No hay email'}</span>
                    </div>
                    <OptionList />
                </div>
            )}
        </div>
    );
};

export default ImageDropMenu;
