import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
//import AllianceService from "../services/services";
import axios from "../axios";
//import styles from './Auth.module.css'; 

export default function AllianceInfo() {

    const [allianceData, setAllianceData] = useState({});
    const labelStyle = {
        marginTop: '1em'
    };
    const btnStyle = {
        margin: '1em 0 0'
    };
    const hideStyle = {
        display: 'none'
    };

    /*
        axios.get('/allianceprofile', {})
            .then(function (response) {
                // handle success
                const results = response.data.results[0];
                //setAllianceData({_id: results._id, alliance_name: results.alliance_name, game_name: results.game_name});
                console.log(allianceData);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });*/

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




    return (
        <div>
            <div key={allianceData._id}>
                <p style={hideStyle}>{allianceData._id} - {allianceData.alliance_name} - {allianceData.game_name}</p>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Alliance</h2>
                        <Form>
                            <Form.Group id="allianceName">
                                <Form.Label style={labelStyle}>Alliance Name</Form.Label>
                                <Form.Control type="text" required defaultValue={allianceData.alliance_name} />
                            </Form.Group>
                            <Form.Group id="gameName">
                                <Form.Label style={labelStyle}>Game Name</Form.Label>
                                <Form.Control type="text" required defaultValue={allianceData.game_name} />
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