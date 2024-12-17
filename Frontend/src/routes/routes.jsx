import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import { Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Dashboard from '../pages/Dashboard';
import ShortUrl from './ShortUrl';
const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout><MainPage/></Layout>} />
                <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
                <Route path='/:shortUrl' element={<ShortUrl />} />
                <Route path='/auth/login' element={<Navigate to="https://keys.lat" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
