import { AuthProvider } from './context/authContext.jsx';
import Nav from  './components/Nav/Nav.jsx';

const Layout = ({ children }) => {
    return (
        <>
        <AuthProvider>
            <Nav />
            <main className='bg-white dark:bg-black text-black dark:text-white'>{children}</main>
        </AuthProvider>
        </>
    );
};

export default Layout;
