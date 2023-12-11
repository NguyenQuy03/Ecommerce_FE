import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { LayoutDefault } from '~/layouts/BuyerLayouts';
import { publicRoutes as BuyerPublicRoutes } from '~/routes/buyer';
import { publicRoutes as CommonPublicRoutes } from '~/routes/common';

var publicRoutes = [...BuyerPublicRoutes, ...CommonPublicRoutes];

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = LayoutDefault;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
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
        </Router>
    );
}

export default App;
