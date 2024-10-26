import { useAuth } from '../../../../../context/authContext.jsx'
import LogoutButton from '../../../../../components/LogoutButton.jsx'
import { LayoutDashboard, LogOut } from 'lucide-react'
import Option from './option.jsx'
const OptionList = () => {
    const { auth } = useAuth();
    return (
        <ul aria-labelledby="user-menu-button">
            <Option icon={<LayoutDashboard />} label="Dashboard" moveTo="/dashboard" hasBorder="true" />
            <Option icon={<LogOut />} label="Logout" moveTo="http://localhost:3000/logout" />
        </ul>
    );
};


export default OptionList;