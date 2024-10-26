import { useAuth } from '../../../../../context/authContext.jsx';
import LogoutButton from '../../../../../components/LogoutButton.jsx';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Option from './option.jsx';

const OptionList = () => {
    const { auth } = useAuth();
    
    return (
        <ul 
            aria-labelledby="user-menu-button" 
            className="flex flex-col gap-2 w-full max-w-xs bg-white dark:bg-black"
        >
            <Option 
                icon={<LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />} 
                label="Dashboard" 
                moveTo="/dashboard" 
                hasBorder={true}
            />
            <Option
                icon={<LogOut className="w-5 h-5 sm:w-6 sm:h-6" />} 
                label="Logout" 
                moveTo="http://localhost:3000/logout" 
            />
        </ul>
    );
};

export default OptionList;
