import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import DashTool from './DashTool';
import styles from './Dash.module.css'; 

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const dashBtnStyle = {
        color: 'black',
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
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Manager Tools</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    <DashTool goto="/update-profile" img="plus" pageName="Add New Activity" />
                    <DashTool goto="/update-profile" img="edit" pageName="Activity Logs" />
                    <DashTool goto="/members" img="multiple-users-silhouette" pageName="Members" />
                    <DashTool goto="/tracking-setup" img="settings" pageName="Tracking Setup" />
                    <DashTool goto="/alliance-info" img="gamepad" pageName="Alliance Profile" />
                    <DashTool goto="/update-profile" img="user" pageName="Account Profile" />
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" style={dashBtnStyle} onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
