import React from 'react'
import { useUserAuthorization } from '../hooks/UserAuthorization'


const Dashboard = () => {

  const {user} = useUserAuthorization()
  return (
    <div className='text-2xl text-center'>Dobrodošli {user?.email}</div>

  )
}

export default Dashboard