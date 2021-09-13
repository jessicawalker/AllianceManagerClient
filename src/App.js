import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from "./components/Auth/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dash/Dashboard';
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import AllianceInfo from "./components/Auth/AllianceInfo";
import TrackingSetup from "./components/TrackingSetup/TrackingSetup";
import Members from "./components/Members/Members";
import Activities from "./components/Activity/Activities";
import Tracking from "./components/Activity/Tracking";
import './styles.css';

function App() {
// TODO - separate out and protect data based on user account
// TODO - add user accounts that can share the same alliance data
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100">
                
                <Router>
                    <AuthProvider>
                        <Header />
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            <PrivateRoute path="/alliance-info" component={AllianceInfo} />
                            { /* <PrivateRoute path="/members" component={Members} /> */ }
                            <Route path="/members" component={Members} />
                            <PrivateRoute path="/tracking-setup" component={TrackingSetup} />
                            <PrivateRoute path="/tracking" component={Tracking} />
                            { /* <PrivateRoute path="/activities" component={Activities} /> */ }
                            <Route path="/activities" component={Activities} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                        </Switch>
                        <Footer />
                    </AuthProvider>
                </Router>
            </div>
        </Container>
        )  
}

export default App;