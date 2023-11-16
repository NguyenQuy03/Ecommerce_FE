
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Fragment } from "react";


import { publicRoutes } from "~/routes/buyer";
import { DefaultLayout } from "~/layouts/BuyerLayouts"

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            let Page = route.component;
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App