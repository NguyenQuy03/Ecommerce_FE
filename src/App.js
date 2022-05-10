
import './App.scss'

import YoutubeSearch from './Pages/YoutubeSearch/YoutubeSearch'

import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {

  return (
    <div>
      <div className="topnav">
        <NavLink activeclassname="active" to="/">Youtube</NavLink>
      </div>

      <Routes>
        <Route path='/' element={<YoutubeSearch />}></Route>
      </Routes>
    </div>
  )
}

export default App