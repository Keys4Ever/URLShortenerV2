import { useAuth } from '../../../../../context/authContext.jsx'
import LogoutButton from '../../../../../components/LogoutButton.jsx'
import Option from './option.jsx'
const OptionList = () =>{
    const {auth} = useAuth();
    return (
    <ul className="py-2" aria-labelledby="user-menu-button">
        <Option label="Dashboard" moveTo="/dashboard" />
        <Option label="Github Repo" moveTo="https://github.com/Keys4Ever/UrlShortenerV2"/>
        {auth.authenticated && <LogoutButton />}
    </ul>
    )
}


export default OptionList;