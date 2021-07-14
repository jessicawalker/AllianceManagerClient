import React, { useRef, useState, Component } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import AllianceService from "../services/services";
import axios from "../axios";
import styles from './Auth.module.css'; 

export default class AllianceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Alliances: []
        };
    }
    getAllianceData() {
        axios
            .get(`/allianceprofile`, {})
            .then(res => {
                const data = res.data;
                const labelStyle = {
                    marginTop: '1em'
                };
                const btnStyle = {
                    margin: '1em 0 0'
                };
                const hideStyle = {
                    display: 'none'
                };
                console.log(data);
                const alliances = data.results.map(u =>
                    <div>
                    <p style={hideStyle}>{u._id} - {u.alliance_name} - {u.game_name}</p>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Update Alliance</h2>
                            <Form>
                                <Form.Group id="allianceName">
                                    <Form.Label style={labelStyle}>Alliance Name</Form.Label>
                                    <Form.Control type="text" required defaultValue={u.alliance_name} />
                                </Form.Group>
                                <Form.Group id="gameName">
                                    <Form.Label style={labelStyle}>Game Name</Form.Label>
                                    <Form.Control type="text" required defaultValue={u.game_name} />
                                </Form.Group>
                                <Button className="w-100" style={btnStyle} type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    </div>
                )
                
                this.setState({
                    alliances
                })

            })
            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount(){
        this.getAllianceData()
    }
    render() {

        return (
            <>
                <div>{this.state.alliances}</div>
                
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </>
        )
    }
}

/*
export default function AllianceInfo() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}*/
