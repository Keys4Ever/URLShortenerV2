import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import MainPage from '../pages/MainPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout><MainPage/></Layout>} />
                <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
