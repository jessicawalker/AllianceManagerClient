import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const dashBtnStyle = {
        backgroundColor: 'cornflowerblue',
        color: 'white',
        textDecoration: 'none'
    };

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.pushState('/logout');
        } catch {
            setError('Failed to log out');
        }
    }
    
    return (
        <header className="fixed-top bg-primary">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Link className="navbar-brand" to="/"><img src="../imgs/logo-AM.png" alt="Alliance Manager" className="logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/update-profile" className="nav-link">Add New Activity</Link></li>
                        <li className="nav-item"><Link to="/update-profile" className="nav-link">Activity Logs</Link></li>
                        <li className="nav-item"><Link to="/members" className="nav-link">Members</Link></li>
                        <li className="nav-item"><Link to="/tracking-setup" className="nav-link">Tracking Setup</Link></li>
                        <li className="nav-item"><Link to="/alliance-info" className="nav-link">Alliance Profile</Link></li>
                        <li className="nav-item"><Link to="/update-profile" className="nav-link">Account Profile</Link></li>
                    </ul>
                    <Button variant="link" style={dashBtnStyle} onClick={handleLogout}>Log Out</Button>
                </div>
            </nav>
        </header>
    )
}
