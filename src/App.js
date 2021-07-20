import React from "react";
import Signup from "./components/Auth/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dash/Dashboard';
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import AllianceInfo from "./components/AllianceInfo";

function App() {
    return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            <PrivateRoute path="/alliance-info" component={AllianceInfo} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
        )  
}

export default App;