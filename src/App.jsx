import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LayoutDefault } from '~/layouts/BuyerLayouts';
import { privateRoutes as BuyerPrivateRoutes, publicRoutes as BuyerPublicRoutes } from '~/routes/buyer';
import { publicRoutes as CommonPublicRoutes } from '~/routes/common';
import { LayoutBlank } from './layouts/CommonLayouts';
import { DashboardLayout } from './layouts/ManagerLayouts';
import { PersistLogin, RequireAuth } from './utils';

import { publicRoutes as ManagerPublicRoutes } from '~/routes/manager';
import { publicRoutes as SellerRoutes } from '~/routes/seller';


const buyerRoutes = [...BuyerPrivateRoutes];
const commonRoutes = [...CommonPublicRoutes, ...BuyerPublicRoutes];

const managerRoutes = [...ManagerPublicRoutes];
const sellerRoutes = [...SellerRoutes];

const ROLES = {
    Manager: 'ROLE_20001',
    Buyer: 'ROLE_20002',
    Seller: 'ROLE_20003',
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
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

                <Route element={<PersistLogin />}>
                    <Route path="/" element={<RequireAuth allowedRoles={[ROLES.Buyer, ROLES.Seller, ROLES.Manager]} />}>
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

                    <Route path="/manager" element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
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
                    </Route>

                    <Route path="/seller" element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
                        {sellerRoutes.map((route, index) => {
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
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
