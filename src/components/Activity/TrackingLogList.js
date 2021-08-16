import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from "react-bootstrap";
import axios from "../../axios";
import TrackingStart from './TrackingStart';
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';
import TrackingBody from './TrackingBody';

export default function TrackingLogList() {
    // similar to Members and Tracking Criteria, except columns are dynamically created
    // based on the Tracking Criteria data

    // first column: get all members that are current
    // following columns: get names of tracking criteria
    // -- use datatype to determine the type of field

    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toISOString());
    const [entryExists, setEntryExists] = useState(false);    // do new entries need to be added?
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user

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
            console.log(activityDate);
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

    }

    async function handleSubmit(e) {
        e.preventDefault();

        // TODO - go to activities page with that date
    }

    return (
        <Form onSubmit={handleSubmit} className={styles.formFormat}>

            <TrackingStart showForm={handleStartLog} initialData={memberActivityData} criteriaData={criteriaData} />

            {startTracking &&
                <Table className="table" striped bordered hover responsive="md">
                    <caption>Your updates are being autosaved</caption>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Member</th>
                            {criteriaData.map((criteria) => (
                                <th key={uuidv4()}>{criteria.criteria_name}</th>
                            ))}
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <TrackingBody sendData={memberActivityData} sendCriteria={criteriaData} logDate={activityDate} />

                </Table>
            }
            {startTracking && 
                <div className={styles.addSection}>
                    <Button href="/activities" saveDataBtn="true">Finish Tracking</Button>
                </div>}
        </Form>
    )
}
