import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from './utils/RequireAuth';
import { LayoutDefault } from '~/layouts/BuyerLayouts';
import { LayoutBlank } from './layouts/CommonLayouts';
import { DashboardLayout } from './layouts/ManagerLayouts';
import { publicRoutes as BuyerPublicRoutes } from '~/routes/buyer';
import { publicRoutes as CommonPublicRoutes } from '~/routes/common';

import { publicRoutes as ManagerPublicRoutes } from '~/routes/manager';

const buyerRoutes = [...BuyerPublicRoutes];
const commonRoutes = [...CommonPublicRoutes];

const managerRoutes = [...ManagerPublicRoutes];

const ROLES = {
    Buyer: 'ROLE_20001',
    Seller: 'ROLE_20002',
    Manager: 'ROLE_20003',
};

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<RequireAuth allowedRoles={[ROLES.Buyer]} />}>
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
                    </Route>

                    {managerRoutes.map((route, index) => {
                        let Layout = route.layout || DashboardLayout;
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
