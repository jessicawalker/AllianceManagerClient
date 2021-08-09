import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCell from './TrackingCell';
import styles from './activities.module.css';

export default function TrackingStart(props) {
    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toISOString());
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    let history = useHistory();

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
    /*useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/userdata',
            );
            setActivityData(result.data.results);
            console.log("47 result.data.results: " + result.data.results);  // object Object
            console.log("48 memberActivityData: " + memberActivityData);  // object Object
        };

        fetchData();
    }, [activityDate]);*/

    // previous attempt to send to MongoDB the datatypes of fields
    // TODO, if necessary for quality of data tracking and reading
    const setType = (addMemberEntry, criteria) => {
        if (criteria.criteria_datatype === "Boolean") {
            return addMemberEntry[criteria.criteria_key] = false;
        } else
        if (criteria.criteria_datatype === "Number") {
            return addMemberEntry[criteria.criteria_key] = 0;
        } else
        if (criteria.criteria_datatype === "Date") {
            return addMemberEntry[criteria.criteria_key] = new Date(Date.now()).toISOString();
        } else
        if (criteria.criteria_datatype === "String") {
            return addMemberEntry[criteria.criteria_key] = "";
        } else {
            return addMemberEntry[criteria.criteria_key] = "";
        }
    }

    async function handleStartLog(e) {
        e.preventDefault();

        // generate for each member: the same date, criteria, and note fields
        for (let x = 0; x < memberData.length; x++) {
            //console.log(memberData.length);
            const addMemberEntry = {};
            //const dateFormatted = new Date(activityDate).toISOString();
            addMemberEntry['date'] = new Date(activityDate).toISOString();
            addMemberEntry['user'] = memberData[x].member_username;
            criteriaData.map((criteria) => (addMemberEntry[criteria.criteria_key] = ""));
            //criteriaData.map((criteria) => (setType(addMemberEntry, criteria.criteria_datatype)) );
            addMemberEntry['notes'] = "";

            // add each member row into the userdata database
            await axios.post('/userdata-add', {
                addMemberEntry
            })
                .then(function (response) {
                console.log(response);
                // then, after data posted to DB, run function to send up data
                // from TrackingStart up to TrackingLogList
                //props.showForm(true, activityDate, addMemberEntry);
                //console.log("91 activityDate: " + activityDate);
                //console.log("92 addMemberEntry: " + addMemberEntry);
            })
                .catch(function (error) {
                console.log(error.response.data);
            });
        }
        props.showForm(true, activityDate);
    }

    return (
        <div className={styles.addSection}>
            <Form.Control type="date" as="input" className="text-center me-auto ms-auto" required  onChange={(e) => setActivityDate(e.target.value)} />
            <Button type="submit" onClick={handleStartLog}>Set Date and Continue</Button>
        </div>
    )
}
