    import React, { useState } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { FaBars, FaUser, FaPlus, FaHome, FaLayerGroup, FaUsers, FaSignOutAlt } from 'react-icons/fa';
    import './Sidebar.css';


    const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();


    const menuItems = [
        { path: "/admin", label: "Dashboard", icon: <FaHome /> },
        { path: "/admin/add-contract", label: "Shartnoma qo‘shish", icon: <FaPlus /> },
        { path: "/admin/add-user", label: "User qo‘shish", icon: <FaUser /> },
        { path: "/admin/add-department", label: "Bo‘lim qo‘shish", icon: <FaLayerGroup /> },
        { path: "/admin/account", label: "Account", icon: <FaUsers /> },
    ];

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between px-3 py-2">
            {isOpen && <h5 className="mb-0">Admin Panel</h5>}
            <button className="btn btn-sm btn-light" onClick={toggleSidebar}>
            <FaBars />
            </button>
        </div>

        <ul className="list-unstyled sidebar-menu">
            {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path} className="d-flex align-items-center">
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="ms-2">{item.label}</span>}
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default Sidebar;
