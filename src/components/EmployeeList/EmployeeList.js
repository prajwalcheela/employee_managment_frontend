import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import './EmployeeList.css'
import { Link } from 'react-router-dom';
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEmployees,setTotalEmployees] = useState(0);

    useEffect(() => {
        fetchEmployees();
    },[currentPage]);

    const fetchEmployees = async () => {
        try {
            const pageSize = 4; // Number of employees per page
            const response = await axios.get(`http://localhost:5000/api/get_emps?page=${currentPage}&pageSize=${pageSize}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            const { results, pagination } = response.data;
        
            setEmployees(results);
            setTotalPages(pagination.totalPages);
            setTotalEmployees(pagination.totalCount) 
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.f_Designation.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, employees]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteEmployee = async (empId) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete_emp/${empId}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <div>
            <NavBar/>
        <div className="table-container">
            
            
            <div className='d-flex  justify-content-evenly my-2'>
            <Link to={'/create-employee'}> <button className="create-employee-button">Create Employee</button></Link>  
            <div className='d-flex justify-content-end gap-3 py-4 '>
            <span className='py-2'>Total Count :{totalEmployees}</span>
            <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                
                </div>
            </div>
            
            <h5 className='text-center'>Employee List</h5>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td><img src={employee.f_Image} alt={employee.name} /></td>
                            <td>{employee.f_Name}</td>
                            <td>{employee.f_Email}</td>
                            <td>{employee.f_Mobile}</td>
                            <td>{employee.f_Designation}</td>
                            <td>{employee.f_gender}</td>
                            <td>{employee.f_Course}</td>
                            <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                            <td className="action-buttons">
                                <Link to={`/edit-employee/${employee._id}`}> <button>Edit</button></Link>
                                <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
        </div>
        </div>
    );
}

export default EmployeeList
