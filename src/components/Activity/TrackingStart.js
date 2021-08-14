import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCell from './TrackingCell';
import styles from './activities.module.css';

export default function TrackingStart(props) {
    //const [entryExists, setEntryExists] = useState(props.skipNewEntry);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toISOString());
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState(props.criteriaData);    // tracking criteria list

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

    async function handleStartLog(e) {
        e.preventDefault();

        // generate for each member: the same date, criteria, and note fields
        for (let x = 0; x < memberData.length; x++) {
            const addMemberEntry = {};
            addMemberEntry['date'] = new Date(activityDate).toISOString();
            addMemberEntry['user'] = memberData[x].member_username;
            
            criteriaData.map(criteria => {
                if (criteria.criteria_datatype === "Boolean"){
                    return addMemberEntry[criteria.criteria_key] = false;
                } else if (criteria.criteria_datatype === "Number") {
                    return addMemberEntry[criteria.criteria_key] = 0;
                } else if (criteria.criteria_datatype === "Date") {
                    return addMemberEntry[criteria.criteria_key] = new Date(activityDate).toISOString();
                } else {
                    return addMemberEntry[criteria.criteria_key] = "";
                }
            });
            //criteriaData.map((criteria) => (addMemberEntry[criteria.criteria_key] = ""));
            addMemberEntry['notes'] = "";

            let compare = false;

            for (let y = 0; y < props.initialData.length; y++) {
                compare = Object.is(addMemberEntry['date'], props.initialData[y].date) && Object.is(addMemberEntry['user'], props.initialData[y].user);

                if (compare === true) break;

                // using props isn't working for this
                // it's comparing to the previous date, not all dates read

                console.log(addMemberEntry['date']);
                console.log(props.initialData[y].date);

                console.log("Objects.value(addMemberEntry['date']: " + 
                    Object.values(addMemberEntry['date']));
                console.log("Object.values(props.initialData[y].date) " + 
                    Object.values(props.initialData[y].date));

                console.log("Object.is(date): " + Object.is(addMemberEntry['date'], props.initialData[y].date))
                console.log("Object.is(user): " + Object.is(addMemberEntry['user'], props.initialData[y].user))
                console.log("compare if: " + compare)

            }
            
            // get out of outer loop to skip post of duplicate
            if (compare === true) continue;

                // add each member row into the userdata database
                await axios.post('/userdata-add', {
                    addMemberEntry
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
                //}
            }
            props.showForm(activityDate);
        }

        return (
            <div className={styles.addSection}>
                <Form.Control type="date" as="input" className="text-center me-auto ms-auto" required onChange={(e) => setActivityDate(e.target.value)} />
                <Button type="submit" onClick={handleStartLog}>Set Date and Continue</Button>
            </div>
        )
    }
