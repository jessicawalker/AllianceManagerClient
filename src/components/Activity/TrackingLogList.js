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
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toDateString());
    const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [memberCurrentArray, setMemberCurrentArray] = useState([]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityDataDate, setActivityDataDate] = useState([{ date: activityDate }]); //separate date out?
    const [memberActivityDataNotes, setActivityDataNotes] = useState([{ notes: "" }]);  // separate notes out?
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [notesEntry, setNotesEntry] = useState([]);
    const [headingArray, setHeadingArray] = useState([]);    // tracking criteria list
    let history = useHistory();

    // read current members
    // change so that the search for current vs all is passed as
    //      params, not set in stone in back-end?
    /*useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members-current',
            );
            setMemberData(result.data.members);
        console.log(result.data.members);
        };

        setMemberCurrentArray(memberData.values());
        fetchData();
        for (const value of memberCurrentArray) {
            console.log(value);
          }
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

    //console.log(memberData);

    function generateUserdataMatrix(activityDate, memberData, criteriaData) {
        for (let x = 0; x < memberData.length; x++) {
            // make matrix
            // date, member[x], criteria, notes
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();/*
        { "msg": "SUCCESS", "members": [{ "_id": "60fb2d9d145d57236c7cce6e", "member_username": "Test Member", "member_role": "Tester", "member_notes": "TBD", "current_member": true, "member_added_date": "2021-04-09T04:00:00.000Z", "__v": 0 }, 
        { "_id": "60fe86c68cbbdc8ef0a88e5e", "member_username": "Tester User", "member_role": "test", "member_notes": "Testing", "current_member": true, "member_added_date": "Mon, 26 Jul 2021 09:56:22 GMT" }, 
        { "_id": "6105c9e3c53b4b4bec5f6487", "member_username": "Newest Member", "member_role": "", "member_notes": "", "current_member": true, "member_added_date": "Sat, 31 Jul 2021 22:08:35 GMT" }] }*/
    }

    // array => 
    // * date - from date field located at top of form, defaulting to today
    // * user - from memberData.member_username
    // * criteria - from criteriaData.{...}
    // * notes - all new

    // test array of values
    const testArrayFields = ["date", "user", "claimedSSwar", "activeDeclare", "defenseEarly", "defenselive", "offense", "notes"];
    const testArrayValues = [activityDate, "Testing", "", true, false, true, false, "none"];
    const testArrayKeyValuePairs = {"date": activityDate, "user": "Testing", "claimedSSwar": "", "activeDeclare": true, "defenseEarly": false, "defenselive": true, "offense": false, "notes": "none"};
    const testMatrix = [
        {"date": activityDate, "user": "Testing", "claimedSSwar": "", "activeDeclare": true, "defenseEarly": false, "defenselive": true, "offense": false, "notes": "none"}, 
        {"date": activityDate, "user": "Second Member", "claimedSSwar": true, "activeDeclare": false, "defenseEarly": false, "defenselive": true, "offense": true, "notes": ""}, 
        {"date": activityDate, "user": "Last Member", "claimedSSwar": true, "activeDeclare": true, "defenseEarly": true, "defenselive": false, "offense": false, "notes": "joined today"}
    ];
    //var iterator = testArrayKeyValuePairs.values();
    var iterator = testMatrix.values();
    //console.log(memberCurrentArray);
    /*
    
                    {criteriaData.map((criteria) => (
                        <TrackingCell
                            key={criteria._id}
                            field={criteria.criteria_key}
                            value={iterator.next().value}
                            criteria_datatype={criteria.criteria_datatype}
                        />))}
                        */

    return (
        <Form onSubmit={handleSubmit} className={styles.formFormat}>

            <Form.Control type="date" as="input" className="text-center me-auto ms-auto" required defaultValue={activityDate} onChange={(e) => setActivityDate(e.target.value)} />

            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        {criteriaData.map((criteria) => (
                            <th>{criteria.criteria_name}</th>
                        ))}
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TrackingCell
                            key="date123"
                            field="date"
                            value={testArrayValues[0]}
                            criteria_datatype=""
                        />
                        <TrackingCell
                            key="user123"
                            field="user"
                            value={testArrayValues[1]}
                            criteria_datatype=""
                        />
                        <TrackingCell
                            key="test123"
                            field=""
                            value={testArrayValues[2]}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test234"
                            field=""
                            value={testArrayValues[3]}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test345"
                            field=""
                            value={testArrayValues[4]}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test456"
                            field=""
                            value={testArrayValues[5]}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="test567"
                            field=""
                            value={testArrayValues[6]}
                            criteria_datatype="Boolean"
                        />
                        <TrackingCell
                            key="notes123"
                            field="notes"
                            value={testArrayValues[7]}
                            criteria_datatype=""
                        />
                    </tr>
                    {memberData.map((member) => (
                        <tr>
                            <TrackingCell
                                key={member}
                                field="date"
                                value={activityDate}
                                criteria_datatype="Date"
                            />
                            <TrackingCell
                                key={member}
                                field="user"
                                value={member.member_username}
                                criteria_datatype="String"
                            />
                            
                            {criteriaData.map((criteria) => (
                                <TrackingCell
                                    key={criteria._id}
                                    field={criteria.criteria_key}
                                    value={iterator.next().value}
                                    criteria_datatype={criteria.criteria_datatype}
                                />))}

                            <TrackingCell
                                key={member}
                                field="notes"
                                value={notesEntry}
                                criteria_datatype="String"
                            />
                        </tr>))}
                </tbody>
            </Table>
            {memberActivityData.length === 0 && <h3>Error</h3>}
            <Button>finish tracking</Button>
        </Form>
    )
}
