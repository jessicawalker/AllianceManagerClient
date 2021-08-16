import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "../../axios";
import styles from './activities.module.css';

export default function TrackingStart(props) {
    //const [entryExists, setEntryExists] = useState(props.skipNewEntry);
    const [activityDate, setActivityDate] = useState(new Date(Date.now()).toISOString());
    const [memberData, setMemberData] = useState([{}]);    // members list

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
            
            props.criteriaData.map((criteria) => {
                let defaultValue;
                if (criteria.criteria_datatype === "Boolean"){
                    defaultValue = false;
                } else if (criteria.criteria_datatype === "Number") {
                    defaultValue = 0;
                } else if (criteria.criteria_datatype === "Date") {
                    defaultValue = new Date(activityDate).toISOString();
                } else {
                    defaultValue = "";
                }
                addMemberEntry[criteria.criteria_key] = defaultValue;
            }
            );

            addMemberEntry['notes'] = "";

            // TODO - prevent duplicate entries; search if date exists, pull in data to edit if it does; otherwise, post
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
