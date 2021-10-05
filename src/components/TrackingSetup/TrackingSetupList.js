import React, { useState, useEffect } from 'react';
import { Table, Form } from "react-bootstrap";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackingSetup.module.css';

export default function TrackingSetupList(props) {
    const [uniqueValues, setUniqueValues] = useState(props.allActivities); // unique values for field
    // read all user data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/activities', {
                params: { unique: "activity_name" }
            })
            .then(function (response) {
                setUniqueValues(response.data.results);
                //console.log(response.request.responseText);
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        fetchData();
        return () => {
            console.log("unsub trackingcriteria activity_name");
        };
    }, []);

    return (
        <Form>
            <h3>Activities to Track</h3>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        <th>Activity Name</th>
                        <th>Log Type</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.allActivities.sort((a, b) => (a > b) ? -1 : 1).map((activity) => (
                        <RowTool key={uuidv4()}
                            idValue={activity._id}
                            dataDisplay="Activity"
                            activityName={activity.activity_name}
                            logType={activity.log_type}
                            crudState="view"
                            onUpdateData={props.onUpdateData}
                            onDeleteData={props.onDeleteData}
                        />
                    ))}
                </tbody>

            </Table>
            <h3>Criteria to Track</h3>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        <th>Activity Name</th>
                        <th>Criteria Name</th>
                        <th>Criteria Datatype</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.allData.map((criteria) => (<RowTool key={uuidv4()}
                        idValue={criteria._id}
                        dataDisplay="Criteria"
                        activitiesList={props.allActivities}
                        activityName={criteria.activity_name}
                        criteriaName={criteria.criteria_name}
                        criteriaDatatype={criteria.criteria_datatype}
                        crudState="view"
                        onUpdateData={props.onUpdateData}
                        onDeleteData={props.onDeleteData}
                    />
                    ))}
                </tbody>

            </Table>
        </Form>
    )
}
