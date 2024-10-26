import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import App from '../App';

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout><App /></Layout>} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
