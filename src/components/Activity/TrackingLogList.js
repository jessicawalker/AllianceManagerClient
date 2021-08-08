import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
//import TrackingHead from './TrackingHead';
import TrackingCell from './TrackingCell';
import TrackingStart from './TrackingStart';
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
    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState();
    //const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [memberActivityID, setMemberActivityID] = useState([]);
    const [notesEntry, setNotesEntry] = useState([]);
    let history = useHistory();


    
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

    // read all current members
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            setMemberData(result.data.members);
        };

        fetchData();
    }, []);

async function handleStartLog(show, activityDate, activityData) {
    setStartTracking(show);
    setActivityDate(activityDate)
    setActivityData(activityData);

    // figure out the one field to update
    // onBlur, autosave/put update
    // do a final put at finish button?
    // date - member - criteria... - notes

}

async function handleSubmit(e) {
    e.preventDefault();
}

return (
    <Form onSubmit={handleSubmit} className={styles.formFormat}>

        <TrackingStart showForm={handleStartLog} />

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
                    {memberActivityData.map((data) => (
                        <tr key={Math.random()}>
                            <TrackingCell
                                key={Math.random()}
                                idValue={data._id}
                                itemDate={activityDate}
                                itemUser={data.user}
                                field="date"
                                value={data.date}
                                criteria_datatype="Date"
                            />
                            <TrackingCell
                                key={Math.random()}
                                idValue={data._id}
                                itemDate={activityDate}
                                itemUser={data.user}
                                field="user"
                                value={data.user}
                                criteria_datatype="String"
                            />

                            {criteriaData.map((criteria) => (
                                <TrackingCell
                                    key={Math.random()}
                                    idValue={data._id}
                                    itemDate={activityDate}
                                    itemUser={data.user}
                                    field={criteria.criteria_key}
                                    criteria_datatype={criteria.criteria_datatype}
                                />))}

                            <TrackingCell
                                key={Math.random()}
                                idValue={data._id}
                                itemDate={activityDate}
                                itemUser={data.user}
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
