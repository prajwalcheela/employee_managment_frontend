import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import EmployeeCreate from './components/EmployeeCreate/EmployeeCreate';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeUpdate from './components/EmployeeUpdate/EmployeeUpdate'
import Home from './components/home/home';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/employee-list" element={<EmployeeList/>} />
                <Route path="/create-employee" element={<EmployeeCreate/>} />
                <Route path="/edit-employee/:mveid" element={<EmployeeUpdate/>} />
            </Routes>
        </Router>
    );
}

export default App;
