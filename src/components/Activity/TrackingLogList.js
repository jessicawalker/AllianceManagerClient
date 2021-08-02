import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
//import TrackingHead from './TrackingHead';
import TrackingCell from './TrackingCell';
//import RowTool from '../Row/RowTool';
import styles from './activities.module.css';

export default function TrackingLogList() {
    // similar to Members and Tracking Criteria, except columns are dynamically created
    // based on the Tracking Criteria data

    // start at top with default date of today / Date.now()
    // first column: get all members that are current
    // following columns: get names of tracking criteria
    // -- use datatype to determine the type of field

    //const activityDate = new Date(Date.now()).toUTCString();
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toUTCString());
    const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityDataDate, setActivityDataDate] = useState([{ date: activityDate }]); //separate date out?
    const [memberActivityDataNotes, setActivityDataNotes] = useState([{ notes: "" }]);  // separate notes out?
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    //const headingArray = [];
    const [headingArray, setHeadingArray] = useState([]);    // tracking criteria list
    let history = useHistory();

    // read current members
    // change so that the search for current vs all is passed as
    //      params, not set in stone in back-end?
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/members', {
                params: {
                    current_member: membersCurrent
                }
            });
                setMemberData(result.data.members);
                //console.log(memberData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members-current',
            );
            setMemberData(result.data.members);
        //console.log(result.data.members);
        };

        fetchData();
    }, []);

    // read tracking criteria
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();
    }, []);

    // update values for master array
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/userdata',
            );
            setActivityData(result.data.results);
        };

        fetchData();
    }, []);

    /*
        head row -- have an array of criteria names,
            then have data and username at the start,
            and notes at the end

        {"Date", "Username", criteriaData.criteria_name, "Notes"}
        }

        user row
        {date: userEnteredDate, 
            user: memberCurrentData.username,
                criteriaData.criteria_name: userEnteredDate,
                criteriaData.criteria_name: userEnteredDate,
                criteriaData.criteria_name: userEnteredDate...
            notes: userEnteredNotes
        }
    */

    /*
    const result = {};
    for (let index = 0; index < array1.length; ++index) {
        result[array1[index]] = array2[index];
    }
    // or................
    const result = Object.fromEntries(
        array1.map((array1value, index) => [array1value, array2[index]])
    );
    // or, if need convert.......
    const result = {};
    for (let index = 0; index < array1.length; ++index) {
        result[array1[index]] = String(array2[index]);
    }
*/

    // for reference, current way of mapping arrays in this system
    /*
                {criteriaData.map((criteria) => (<TrackingHead key={criteria._id}  
                        columnHead={criteria.criteria_name}
                    />
                    ))}
                    */

    //headingArray = {criteriaData.criteria_name};

    console.log(memberData);

    async function handleSubmit(e) {
        e.preventDefault();/*
        { "msg": "SUCCESS", "members": [{ "_id": "60fb2d9d145d57236c7cce6e", "member_username": "Test Member", "member_role": "Tester", "member_notes": "TBD", "current_member": true, "member_added_date": "2021-04-09T04:00:00.000Z", "__v": 0 }, { "_id": "60fe86c68cbbdc8ef0a88e5e", "member_username": "Tester User", "member_role": "test", "member_notes": "Testing", "current_member": true, "member_added_date": "Mon, 26 Jul 2021 09:56:22 GMT" }, { "_id": "6105c9e3c53b4b4bec5f6487", "member_username": "Newest Member", "member_role": "", "member_notes": "", "current_member": true, "member_added_date": "Sat, 31 Jul 2021 22:08:35 GMT" }] }*/
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Control type="date" defaultValue={activityDate} />

            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                        {criteriaData.map((criteria) => (
                            <th>{criteria.criteria_name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TrackingCell
                            key="date123"
                            field="date"
                            value=""
                            criteria_datatype=""
                        />
                        <TrackingCell
                            key="user123"
                            field="user"
                            value="Test"
                            criteria_datatype=""
                        />
                        <TrackingCell
                            key="test123"
                            field=""
                            value=""
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test234"
                            field=""
                            value=""
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test345"
                            field=""
                            value={true}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test456"
                            field=""
                            value=""
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test567"
                            field=""
                            value=""
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="notes123"
                            field="notes"
                            value=""
                            criteria_datatype=""
                        />
                    </tr>
                    <tr>
                        
                    {criteriaData.map((criteria) => (
                        <TrackingCell
                            key={criteria._id}
                            field={criteria.criteria_key}
                            value="test"
                            criteria_datatype={criteria.criteria_datatype}
                        />))}
                    </tr>
                </tbody>
            </Table>
            {memberActivityData.length === 0 && <h3>Error</h3>}
            <Button>finish tracking</Button>
        </Form>
    )
}
