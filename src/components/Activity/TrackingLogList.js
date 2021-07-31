import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingHead from './TrackingHead';
import TrackingCell from './TrackingCell';
import RowTool from '../Row/RowTool';
import styles from './activities.module.css';

export default function TrackingLogList() {
    // similar to Members and Tracking Criteria, except columns are dynamically created
    // based on the Tracking Criteria data

    // start at top with default date of today / Date.now()
    // first column: get all members that are current
    // following columns: get names of tracking criteria
    // -- use datatype to determine the type of field

    const activityDate = new Date(Date.now()).toUTCString();
    const [memberCurrentData, setMemberCurrentData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityDataDate, setActivityDataDate] = useState([{date: activityDate}]); //separate date out?
    const [memberActivityDataNotes, setActivityDataNotes] = useState([{notes: ""}]);  // separate notes out?
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    //const headingArray = [];
    const [headingArray, setHeadingArray] = useState([]);    // tracking criteria list
    let history = useHistory();

    function generateArray(objArray) {
        return objArray.map(a => a.foo);
    }
    // read current members
    // change so that the search for current vs all is passed as
    //      params, not set in stone in back-end?
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members-current',
            );
            setMemberCurrentData(result.data.results);
        };

        fetchData();
        console.log(activityDate + "Fetched members-current");
    }, []);

    // read tracking criteria
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();
        console.log(activityDate + "Fetched trackingcriteria");
        /*for (let x = 0; x < criteriaData.length; x++) {
            headingArray.push(criteriaData[x].criteria_name);
        }*/
    
    }, []);

    // update values for master array
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/userdata',
            );
            setActivityData(result.data.results);
        };

        fetchData();
        console.log(activityDate + "Fetched userdata");
    }, []);

    /*
        head row -- have an array of criteria names,
            then have data and username at the start,
            and notes at the end

        {"Date", "Username", criteriaData.criteria_name, "Notes"}
        }

        user row
        {date: userEnteredDate, 
            user: memberCurrentData.username,
                criteriaData.criteria_name: userEnteredDate,
                criteriaData.criteria_name: userEnteredDate,
                criteriaData.criteria_name: userEnteredDate...
            notes: userEnteredNotes
        }
    */

    /*
    const result = {};
    for (let index = 0; index < array1.length; ++index) {
        result[array1[index]] = array2[index];
    }
    // or................
    const result = Object.fromEntries(
        array1.map((array1value, index) => [array1value, array2[index]])
    );
    // or, if need convert.......
    const result = {};
    for (let index = 0; index < array1.length; ++index) {
        result[array1[index]] = String(array2[index]);
    }
*/

        // for reference, current way of mapping arrays in this system
    /*
                {criteriaData.map((criteria) => (<TrackingHead key={criteria._id}  
                        columnHead={criteria.criteria_name}
                    />
                    ))}
                    */

    //headingArray = {criteriaData.criteria_name};
    



    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            
            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                    {criteriaData.map((criteria) => (
                        <th>{criteria.criteria_name}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    <TrackingCell
                        key=""
                        value=""
                        criteria_datatype=""
                    />
                </tbody>
            </Table>
            {memberActivityData.length === 0 && <h3>Error</h3>}
            <Button></Button>
        </Form>
    )
}
