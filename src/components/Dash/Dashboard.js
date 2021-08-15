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
        <div className={styles.containWidth}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Manager Tools</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    <div className={styles.cardContainer}>
                        <DashTool goto="/tracking" img="plus" pageName="Add New Activity" />
                        <DashTool goto="/activities" img="edit" pageName="Activity Logs" />
                        <DashTool goto="/members" img="multiple-users-silhouette" pageName="Members" />
                        <DashTool goto="/tracking-setup" img="settings" pageName="Tracking Setup" />
                        <DashTool goto="/alliance-info" img="gamepad" pageName="Alliance Profile" />
                        <DashTool goto="/update-profile" img="user" pageName="Account Profile" />
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" className={styles.dashBtnStyle} onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}
