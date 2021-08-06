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
    const [startTracking, setStartTracking] = useState(false);    // members list
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toLocaleDateString());
    //const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [memberCurrentArray, setMemberCurrentArray] = useState([]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    //const [criteriaDataKey, setCriteriaDataKey] = useState([]);    // tracking criteria list
    const [memberActivityDataDate, setActivityDataDate] = useState([{ date: activityDate }]); //separate date out?
    const [memberActivityDataNotes, setActivityDataNotes] = useState([{ notes: "" }]);  // separate notes out?
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [notesEntry, setNotesEntry] = useState([]);
    let history = useHistory();

    // read current members

    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            setMemberData(result.data.members);
        };

        //setMemberCurrentArray(memberData.values());
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

    async function handleStartLog(e) {
        e.preventDefault();
        //setActivityDate(e.target.value);
        setStartTracking(true);
        for (let x = 0; x < memberData.length; x++) {
            const addMemberEntry = {};
            addMemberEntry['date'] = activityDate;
            addMemberEntry['user'] = memberData[x].member_username;
            criteriaData.map((criteria) => (addMemberEntry[criteria.criteria_key] = ""));
            addMemberEntry['notes'] = "";

            await axios.post('/userdata-add', {
                addMemberEntry
            })
                .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
        }
    }


async function handleUpateLogDate(e) {
    e.preventDefault();
    setActivityDate(e.target.value)

    // add an entry for each member all at once
    // add date - member - criteria... - notes

}

async function handleSubmit(e) {
    e.preventDefault();
}



// test array of values

const testMatrix = [
    { "date": activityDate, "user": "Testing", "claimedSSwar": "", "activeDeclare": true, "defenseEarly": false, "defenselive": true, "offense": false, "notes": "none" },
    { "date": activityDate, "user": "Second Member", "claimedSSwar": true, "activeDeclare": false, "defenseEarly": false, "defenselive": true, "offense": true, "notes": "" },
    { "date": activityDate, "user": "Last Member", "claimedSSwar": true, "activeDeclare": true, "defenseEarly": true, "defenselive": false, "offense": false, "notes": "joined today" }
];
var iterator = testMatrix.values();

return (
    <Form onSubmit={handleSubmit} className={styles.formFormat}>

        <Form.Control type="date" as="input" className="text-center me-auto ms-auto" required defaultValue={activityDate} onChange={(e) => setActivityDate(e.target.value)} />
        <Button type="submit" onClick={handleStartLog}>Set Date and Continue</Button>

        {startTracking &&
            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        {criteriaData.map((criteria) => (
                            <th key={Math.random()}>{criteria.criteria_name}</th>
                        ))}
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {memberData.map((member) => (
                        <tr key={Math.random()}>
                            <TrackingCell
                                key={Math.random()}
                                field="date"
                                value={activityDate}
                                criteria_datatype="Date"
                            />
                            <TrackingCell
                                key={Math.random()}
                                field="user"
                                value={member.member_username}
                                criteria_datatype="String"
                            />

                            {criteriaData.map((criteria) => (
                                <TrackingCell
                                    key={Math.random()}
                                    field={criteria.criteria_key}
                                    value={iterator.next().value}
                                    criteria_datatype={criteria.criteria_datatype}
                                />))}

                            <TrackingCell
                                key={Math.random()}
                                field="notes"
                                value={notesEntry}
                                criteria_datatype="String"
                            />
                        </tr>))}
                </tbody>
            </Table>
        }
        {startTracking && <Button type="submit" onClick={handleSubmit}>finish tracking</Button>}
        {memberActivityData.length === 0 && <h3>Error</h3>}
    </Form>
)
}
