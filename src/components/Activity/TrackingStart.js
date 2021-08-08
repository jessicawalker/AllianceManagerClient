import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCell from './TrackingCell';
import styles from './activities.module.css';

export default function TrackingStart(props) {
    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toLocaleDateString());
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
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/userdata-filter', {
                    params: {
                      date: activityDate
                    }
                  }
            );
            setActivityData(result.data.results);
        };

        fetchData();
    }, [activityDate]);

    async function handleStartLog(e) {
        e.preventDefault();

        // generate for each member: the same date, criteria, and note fields
        for (let x = 0; x < memberData.length; x++) {
            const addMemberEntry = {};
            addMemberEntry['date'] = activityDate;
            addMemberEntry['user'] = memberData[x].member_username;
            criteriaData.map((criteria) => (addMemberEntry[criteria.criteria_key] = ""));
            addMemberEntry['notes'] = "";

            // add each member row into the userdata database
            await axios.post('/userdata-add', {
                addMemberEntry
            })
                .then(function (response) {
                console.log(response);
                props.showForm(true, activityDate, memberActivityData);
                history.push('/tracking');
            })
                .catch(function (error) {
                console.log(error.response.data);
            });
        }
    }

    return (
        <div className={styles.addSection}>
            <Form.Control type="date" as="input" className="text-center me-auto ms-auto" required defaultValue={activityDate} onChange={(e) => setActivityDate(e.target.value)} />
            <Button type="submit" onClick={handleStartLog}>Set Date and Continue</Button>
        </div>
    )
}
