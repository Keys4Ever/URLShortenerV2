import { AuthProvider } from './context/authContext.jsx';
import Nav from  './components/Nav/Nav.jsx';

const Layout = ({ children }) => {
    return (
        <>
        <AuthProvider>
            <Nav />
            <main>{children}</main>
        </AuthProvider>
        </>
    );
};

export default Layout;
