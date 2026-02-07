import { Button } from '@heroui/react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


import { UserAuthorization } from './hooks/UserAuthorization.jsx';
import SecureRoute from "./hooks/SecureRoute.jsx"
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
    <BrowserRouter>
     <UserAuthorization>
    <Routes>
     
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
               <Route
                  path="/dashboard/*"
                  element={
                    <SecureRoute userLevel={"admin"} element={<Dashboard/>} />
                  }
                />

    
    </Routes>
      </UserAuthorization>
    </BrowserRouter>
    </>
  )
}

export default App
