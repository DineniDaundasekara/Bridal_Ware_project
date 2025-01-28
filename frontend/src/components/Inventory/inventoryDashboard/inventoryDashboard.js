import React from 'react';
import { Link } from 'react-router-dom';
import style from './inventoryDashboard.module.css';
import Header from '../../Product/Header';

const InventoryDashboard = () => {
    return (
        <div className='bg' style={{backgroundColor: '#D0BCA0'}}>
            <div>
                <Header/>
            </div>
            <div className={style.heading} style={{backgroundColor: '#D0BCA0'}}>
            <h1>Inventory Dashboard</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:'90px' }}>
                <Link to="/inventory/addinventory" style={{ textDecoration: 'none',backgroundColor:'#5B3E31' }}>
                    <button className={style.dashboard_button} style={{backgroundColor:'#5B3E31',color:'#EDE1D2' }}>Add Inventory</button>
                </Link>
                <Link to="/inventory/all" style={{ textDecoration: 'none' }}>
                    <button className={style.dashboard_button} style={{backgroundColor:'#5B3E31',color:'#EDE1D2' }}>Manage Inventory</button>
                </Link>
                <Link to="/inventory/report" style={{ textDecoration: 'none' }}>
                    <button className={style.dashboard_button} style={{backgroundColor:'#5B3E31',color:'#EDE1D2' }} >Generate Report</button>
                </Link>
                
            </div>
            <div style={{ height: "500px" }}></div>
        </div>
    );
};



export default InventoryDashboard;
