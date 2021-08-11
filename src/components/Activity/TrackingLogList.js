import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
//import TrackingHead from './TrackingHead';
import TrackingCell from './TrackingCell';
import TrackingStart from './TrackingStart';
//import RowTool from '../Row/RowTool';
import styles from './activities.module.css';
import TrackingBody from './TrackingBody';

export default function TrackingLogList() {
    // similar to Members and Tracking Criteria, except columns are dynamically created
    // based on the Tracking Criteria data

    // start at top with default date of today / Date.now()
    // first column: get all members that are current
    // following columns: get names of tracking criteria
    // -- use datatype to determine the type of field

    //const activityDate = new Date(Date.now()).toUTCString();
    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toISOString());
    //const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [memberActivityRow, setActivityRow] = useState({});  // master array each user
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

    // update values for master array
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/userdata-filter', {
                params: {
                    date: activityDate
                }
            }
            );
            // bring in data to display that only matches the chosen date
            setActivityData(result.data.results);
        };

        fetchData();
    }, [activityDate]);


    // bring in data from TrackingStart child component
    async function handleStartLog(activityDate) {
        // update date for activity, based on TrackingStart selection
        // doing it this way prevents any capricious updating of the date
        //      without updating the database
        setActivityDate(activityDate);
        setStartTracking(true);

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
                    <TrackingBody sendData={memberActivityData} sendCriteria={criteriaData} logDate={activityDate} />

                </Table>
            }
            {startTracking && 
                <div className={styles.addSection}>
                    <Button type="submit" onClick={handleSubmit}>Finish Tracking</Button>
                </div>}
        </Form>
    )
}
