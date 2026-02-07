import React from 'react'
import { useUserAuthorization } from '../hooks/UserAuthorization'
import DashboardMap from '../components/DashboardMap'
import CamerasDashboard from "./CamerasDashboard.jsx"
import { Routes, Route } from "react-router-dom"

const Dashboard = () => {

  

  const { user } = useUserAuthorization()
  return (
    <div>
      <Routes>
        <Route path='/parking' element={
        <div className='items-center'>

          <DashboardMap data={"data"} dataType='parkings' />

        </div>
        }/>

        <Route path='/kamere' element={<CamerasDashboard/>}/>
      </Routes>
    </div>
  )
}

export default Dashboard