import React from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import { useState } from 'react';
import './EmployeeCreate.css'
const EmployeeCreate = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage]=useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !mobile || !designation || !gender || !image || !course ) {
            alert('Please fill in all fields');
            return;
        }

        const obj={
            'f_Id':'1',
            'f_Name':name,
            'f_Email':email,
            'f_Mobile':mobile,
            'f_Designation':designation,
            'f_gender':gender,
            'f_Course':course,
            'f_Image': image
        }
        try {
           
            const res=await axios.post('http://localhost:5000/api/create_emp', obj, {
                headers: {
                    'x-access-token':localStorage.getItem('token')
                }
            });
            console.log(res.data.exists)
            if(res.data.exists){
                alert("Email exists")
                return
            }
            alert('employee created sucessfully');
            setName('');
            setEmail('');
            setMobile('');
            setDesignation('');
            setGender('');
            setCourse('');
            setImage(null);

            
            
        } catch (error) {
            console.log('Error creating employee:', error);
            alert('An error occurred while creating employee');
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
            <NavBar/>
        <div className="create-employee-container">
            <h2>Create Employee</h2>
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
                    <input type="text" value={mobile} onChange={(e)=>handleChangenum(e) } required />
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
                            <input type="radio" value="M" checked={gender === 'M'}  onChange={() => setGender('M')} required />
                            Male
                        </label>
                        <label>
                            <input type="radio" value="F" checked={gender === 'F'}  onChange={() => setGender('F')} required />
                            Female
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <div>
                        <label>
                            <input type="checkbox" value="MCA" checked={course === 'MCA'} onChange={() => setCourse('MCA')}  />
                            MCA
                        </label>
                        <label>
                            <input type="checkbox" value="BCA" checked={course === 'BCA'} onChange={() => setCourse('BCA')}  />
                            BCA
                        </label>
                        <label>
                            <input type="checkbox" value="BSC" checked={course === 'BSC'} onChange={() => setCourse('BSC')}  />
                            BSC
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Image Upload:</label>
                    <input type="file"  onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
        </div>
    );
  
}

export default EmployeeCreate
