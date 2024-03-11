

import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeUpdate.css'

const EmployeeUpdate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);
    const {mveid : id}=useParams()

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/get_emp/${id}`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                });
                setName(data.f_Name);
                setEmail(data.f_Email);
                setMobile(data.f_Mobile);
                setDesignation(data.f_Designation);
                setGender(data.f_gender);
                setCourse(data.f_Course);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const updatedEmployee = {
            f_Name: name,
            f_Email: email,
            f_Mobile: mobile,
            f_Designation: designation,
            f_gender: gender,
            f_Course: course,
             f_Image: image
        };

        try {
            await axios.put(`http://localhost:5000/api/update_emp/${id}`, updatedEmployee, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            

            alert('Employee updated successfully');
            
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('An error occurred while updating employee');
        }
    };

    const handleChangenum = (e) => {
        const input = e.target.value;
    
        if (/^\d*$/.test(input) || input === '') {
          setMobile(e.target.value)
        } else {
          alert("only numarical values are allowed")
          return
        }
      };

    return (
        <div>
            <NavBar />
            <div className="edit-employee-container">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Mobile No:</label>
                        <input type="text" value={mobile} onChange={(e) => handleChangenum(e)} required />
                    </div>
                    <div className="form-group">
                        <label>Designation:</label>
                        <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <div>
                            <label>
                                <input type="radio" value="M" checked={gender === 'M'} onChange={() => setGender('M')} required />
                                Male
                            </label>
                            <label>
                                <input type="radio" value="F" checked={gender === 'F'} onChange={() => setGender('F')} required />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Course:</label>
                        <div>
                            <label>
                                <input type="checkbox" value="MCA" checked={course.includes('MCA')} onChange={() => setCourse('MCA')} />
                                MCA
                            </label>
                            <label>
                                <input type="checkbox" value="BCA" checked={course.includes('BCA')} onChange={() => setCourse( 'BCA')} />
                                BCA
                            </label>
                            <label>
                                <input type="checkbox" value="BSC" checked={course.includes('BSC')} onChange={() => setCourse('BSC')} />
                                BSC
                            </label>
                        </div>
                    </div>
                    
                     <div className="form-group">
                        <label>Image Upload:</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div> 
                    <button type="submit" className="submit-button">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeUpdate
