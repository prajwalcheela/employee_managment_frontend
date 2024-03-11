import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
const NavBar = () => {
    const navigate = useNavigate()

    const HandleLogOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        navigate('/')
    }


  return (
    <div>
     <nav className="navbar">
            <div className='d-flex justify-content-space-between'>
            <span className="logo">Logo</span>
            
            </div>
            <div className="nav-links">
               <Link to={'/home'}> <span><button className='btn'>Home</button></span> </Link>
               <Link to={'/employee-list'}> <span><button className='btn'>Employee List</button></span> </Link>
            </div>
            <div className="user-info">
                <span> {localStorage.getItem('userName')} </span>
                <button className='btn' onClick={HandleLogOut} >Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default NavBar
