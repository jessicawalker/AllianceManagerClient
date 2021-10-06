import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const dashBtnStyle = {
        backgroundColor: 'cornflowerblue',
        color: 'white',
        textDecoration: 'none'
    }

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
            <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/"><img src="../imgs/logo-AM.png" alt="Alliance Manager" className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/activities">Activity Logs</Nav.Link>
                        <Nav.Link href="/members">Members</Nav.Link>
                        {currentUser && <NavDropdown title="Manage Activity" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/tracking">Record New Activity</NavDropdown.Item>
                            <NavDropdown.Item href="/">Update Activity</NavDropdown.Item>
                        </NavDropdown>}
                        {currentUser && <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/tracking-setup">Tracking Setup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/alliance-info">Alliance Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/update-profile">Account Profile</NavDropdown.Item>
                        </NavDropdown>}
                    </Nav>
                    {currentUser && <Nav className="justify-content-end">
                        <Nav.Link href="/tracking">
                            <Button variant="primary" style={dashBtnStyle}>Add New Activity</Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button onClick={handleLogout}>Log Out</Button>
                        </Nav.Link>
                    </Nav>}
                    {!currentUser && <Nav className="justify-content-end">
                        <Nav.Link href="/signup">
                            <Button variant="primary" style={dashBtnStyle}>Sign Up</Button>
                        </Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
