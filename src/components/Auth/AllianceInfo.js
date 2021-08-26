import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
//import AllianceService from "../services/services";
import axios from "../../axios";
import styles from './Auth.module.css'; 

export default function AllianceInfo() {

    const [allianceData, setAllianceData] = useState({});
    const [error, setError] = useState('');
    const allianceNameRef = useRef();
    const gameNameRef = useRef();
    const labelStyle = {
        marginTop: '1em'
    };
    const btnStyle = {
        margin: '1em 0 0'
    };
    const hideStyle = {
        display: 'none'
    };

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/allianceprofile',
            );
            setAllianceData(result.data.results[0]);
        };

        fetchData();
    }, []);

    // onSubmit, update the form data
    async function handleSubmit(e) {
        e.preventDefault();

        const enteredAllianceName = allianceNameRef.current.value;
        const enteredGameName = gameNameRef.current.value;
        const currentId = allianceData._id;

        if (enteredAllianceName === "" || enteredGameName === "") {
            return setError('All fields must be filled in.');
        }
        setError('');
        
        if (currentId === "") {  // new entry
            await axios.post('/allianceprofile-add', {
                alliance_name: enteredAllianceName,
                game_name: enteredGameName
            })
                .then(function (response) {
                    console.log(response);
                    setError("Failed to add your information.");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {    // update entry
            await axios.put(`/allianceprofile-update/${currentId}`, {
                alliance_name: enteredAllianceName,
                game_name: enteredGameName
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                    setError("Failed to update your information.");
                });
        }

    }



    return (
        <div className={styles.containWidth}>
            <div key={allianceData._id}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Alliance</h2>
                        { error && <Alert variant="danger">{ error }</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="allianceName">
                                <Form.Label className={styles.labelStyle}>Alliance Name</Form.Label>
                                <Form.Control type="text" ref={allianceNameRef} required defaultValue={allianceData.alliance_name} />
                            </Form.Group>
                            <Form.Group id="gameName">
                                <Form.Label className={styles.labelStyle}>Game Name</Form.Label>
                                <Form.Control type="text" ref={gameNameRef} required defaultValue={allianceData.game_name} />
                            </Form.Group>
                            <Button className="w-100" style={btnStyle} type="submit">
                                Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </div>
    )

}