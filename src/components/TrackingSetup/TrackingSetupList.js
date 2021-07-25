import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './TrackingSetup.module.css'; 

// option 3 for generating list of members (see Members.js for options 1 and 2)

/*
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
                
                const alliances = data.results.map(u =>
                    <div key={u._id}>
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
*/

    /*if (props.members.length === 0) {
        return  (
            <div>
                <p>No members</p>
            </div>
        )
    }*/

    /*
        <table>
            <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Notes</th>
                <th>Current</th>
            </tr>
        </table>
            {props.members.map(member) => (
                <RowTool key="memberData._id" 
                    dataDisplay="MemberList" 
                    username={memberData.member_username} 
                    memberRole={memberData.member_role} 
                    memberNotes={memberData.member_notes} 
                    currentMember={memberData.current_member}
                />
            )}
            <RowTool key="_id" 
                    dataDisplay="MemberList" 
                    username="Test" 
                    memberRole="Tester" 
                    memberNotes="This is a test" 
                    currentMember="true"
                />
    */
export default function TrackingSetupList(props) {
    const [criteriaData, setCriteriaData] = useState([{}]);

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);   // map, repeating display
            //console.log(result.data.results[1]);
            console.log(criteriaData);
            //console.log(criteriaData.criteria_name);
        };

        fetchData();
    }, []);

    return (
        <table className={styles.centerTable}>
            <thead className={styles.theadDefault}>
                <tr>
                    <th>Criteria Name</th>
                    <th>Criteria Datatype</th>
                </tr>
            </thead>
            <tbody>
            {criteriaData.map((criteria) => (<RowTool key="criteria._id" 
                    dataDisplay="Criteria" 
                    criteriaName={criteria.criteria_name} 
                    criteriaDatatype={criteria.criteria_datatype} 
                />
                ))}
            </tbody>
            
        </table>
    )
}
