import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from './utils/RequireAuth';
import { LayoutDefault } from '~/layouts/BuyerLayouts';
import { LayoutBlank } from './layouts/CommonLayouts';
import { publicRoutes as BuyerPublicRoutes } from '~/routes/buyer';
import { publicRoutes as CommonPublicRoutes } from '~/routes/common';

const buyerRoutes = [...BuyerPublicRoutes];
const commonRoutes = [...CommonPublicRoutes];

const ROLES = {
    MANAGER: 20001,
    BUYER: 20002,
    SELLER: 20003,
};

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {buyerRoutes.map((route, index) => {
                        let Layout = route.layout || LayoutDefault;
                        let Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {commonRoutes.map((route, index) => {
                        let Layout = route.layout || LayoutBlank;
                        let Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
