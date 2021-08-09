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
            //console.log(result.data);
            // bring in data to display that only matches the chosen date
            setActivityData(result.data.results);
            //console.log("61 result.data.userdata: " + result.data.userdata);
            console.log("62 memberActivityData: " + memberActivityData);
        };

        fetchData();
    }, [activityDate]);


    // bring in data from TrackingStart child component
    async function handleStartLog(show, activityDate, newActivityData) {
        // update date for activity, based on TrackingStart selection
        // doing it this way prevents any capricious updating of the date
        //      without updating the database
        setActivityDate(activityDate);
        setStartTracking(true);
        //setActivityRow(newActivityData);    // this brings in the newly create data, but could just as easily be an updated useEffect in this component?
        console.log("70 activityDate: " + activityDate);
        //console.log("71 newActivityData: " + newActivityData);
        //console.log("72 memberActivityData: " + memberActivityData);
        //console.log("73 Object.keys(newActivityData): " + Object.keys(newActivityData));
        //console.log("74 Object.values(newActivityData): " + Object.values(newActivityData));

        /*const fetchData = async () => {
            const result = await axios.get(
                //'/userdata'
                
              '/userdata-filter', {
                  params: {
                    date: activityDate
                  }
                }
                
            );
            //console.log(result.data);
            console.log("86 result.data.userdata: " + result.data.userdata);
            setActivityData(result.data.userdata);
            console.log("88 memberActivityData: " + memberActivityData);
        };

        fetchData();*/
        //console.log("94 memberActivityData: " + memberActivityData);
        //setActivityData(activityData);

        // figure out the one field to update
        // onBlur, autosave/put update
        // do a final put at finish button?
        // date - member - criteria... - notes

    }

    async function handleSubmit(e) {
        e.preventDefault();
    }

    // why these logs render three times upon first arriving
    // 3rd time, 3rd log comes out as [] rather than [{}]
    console.log(startTracking);
    console.log(activityDate);
    console.log(memberActivityData); // this is coming in perfect

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
            {startTracking && <Button type="submit" onClick={handleSubmit}>finish tracking</Button>}
        </Form>
    )
}
