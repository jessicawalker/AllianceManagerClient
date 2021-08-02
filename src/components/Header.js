import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, Alert, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

/*
        <header className="fixed-top bg-primary">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Link className="navbar-brand" to="/"><img src="../imgs/logo-AM.png" alt="Alliance Manager" className="logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/tracking" className="nav-link">Add New Activity</Link></li>
                        <li className="nav-item"><Link to="/activities" className="nav-link">Activity Logs</Link></li>
                        <li className="nav-item"><Link to="/members" className="nav-link">Members</Link></li>
                        <li className="nav-item"><Link to="/tracking-setup" className="nav-link">Tracking Setup</Link></li>
                        <li className="nav-item"><Link to="/alliance-info" className="nav-link">Alliance Profile</Link></li>
                        <li className="nav-item"><Link to="/update-profile" className="nav-link">Account Profile</Link></li>
                    </ul>
                    <Button variant="link" style={dashBtnStyle} onClick={handleLogout}>Log Out</Button>
                </div>
            </nav>
        </header>*/

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
                        <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/tracking-setup">Tracking Setup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/alliance-info">Alliance Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/update-profile">Account Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/tracking">
                            <Button variant="primary" style={dashBtnStyle}>Add New Activity</Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button onClick={handleLogout}>Log Out</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
