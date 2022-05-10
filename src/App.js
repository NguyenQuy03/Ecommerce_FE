
import { publicRoutes } from "./routes";

import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";

import './App.scss'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App