import React from 'react';
import { Link } from 'react-router-dom';
import style0 from '../Employee Dashboard/EmployeeDashboard.module.css'
import Header from '../../Product/Header';

const EmployeeDashboard = () => {
    return (
        <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
        <div>
            <div>
                <Header/>
            </div>
            <div className={style0.heading1}>
            <h1>Employees Dashboard</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:'90px', marginLeft:'50px' }}>
                <Link to="/employee/add" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2} >Add Employee</button>
                </Link>
                <Link to="/employee/all" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2}  >All Employees List</button>
                </Link>
                <Link to="/employee/admin/leave" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2}  >Leave Requests</button>
                </Link>
                {/* <Link to="/employee/salary" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2} >Salary Details</button>
                </Link> */}
                {/* <Link to="/employee/addBonus" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2} >Add Bonus Salary</button>
                </Link> */}
                <Link to="/employee/report" style={{ textDecoration: 'none' }}>
                    <button className={style0.dashboard_button2}  >Salary Report</button>
                </Link>
            </div>
            <div style={{ height: "500px" }}></div>
        </div>
        </div>
    );
};



export default EmployeeDashboard;
