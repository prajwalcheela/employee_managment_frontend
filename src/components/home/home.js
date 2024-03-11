import React from 'react'
import NavBar from '../NavBar/NavBar'


const Home = () => {
  return (
    <div className=' text-center '>
       <div> <NavBar/></div>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <h3>Welcome to admin panel</h3>
        </div>
    </div>
  )
}

export default Home
