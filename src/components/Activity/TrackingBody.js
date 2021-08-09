import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { Autosave, useAutosave } from "react-autosave";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import TrackingCell from './TrackingCell';
import styles from './activities.module.css';

export default function TrackingBody(props) {
    const [startTracking, setStartTracking] = useState(false);
    const [activityDate, setActivityDate] = useState(props.logDate);
    //const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    const [memberData, setMemberData] = useState([{}]);    // members list
    //const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list 
    const [criteriaData, setCriteriaData] = useState(props.sendCriteria);    // tracking criteria list sendCriteria
    const [memberActivityData, setActivityData] = useState(props.sendData);  // master array each user
    //const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [memberActivityID, setMemberActivityID] = useState([]);
    const [notesEntry, setNotesEntry] = useState([]);
    let history = useHistory();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
    //console.log("TrackingBody ln 19 props.sendData: " + props.sendData);
    console.log("TrackingBody ln 21 memberActivityData: " + JSON.stringify(memberActivityData));
    console.log("TrackingBody ln 22 props: " + JSON.stringify(props));
    //console.log("TrackingBody ln 22 memberActivityData: " + memberActivityData);
    /*console.log("TrackingBody ln 23 props.logDate: " + props.logDate);
    console.log("TrackingBody ln 24 activityDate: " + activityDate);
    console.log("TrackingBody ln 25 Object.keys(memberActivityData): " + Object.keys(memberActivityData));
    console.log("TrackingBody ln 26 Object.values(memberActivityData): " + Object.values(memberActivityData));*/

    // taking out to test if objects show up better from LogList, then pass down
/*
        // update values for master array
        useEffect(() => {
            const fetchData = async () => {
                let result = await axios.get(
                    //'/userdata', {
                    '/userdata-filter', {
                    params: { date: activityDate }
                    }
                );
    
                console.log("3 Array.isArray(result.data.results): " + Array.isArray(result.data.results))
                console.log("4 Array.isArray(JSON.stringify(result.data.results)): " + Array.isArray(JSON.stringify(result.data.results)))
                //setActivityData(JSON.stringify(result.data.results));
                setActivityData(result.data.results);
                console.log("5 Array.isArray(memberActivityData): " + Array.isArray(memberActivityData))

            };
            
            console.log("2 Array.isArray(memberActivityData): " + Array.isArray(memberActivityData))
    
            fetchData();
            console.log("TrackingBody ln 49: " + memberActivityData);
        }, [activityDate]);
    //}, [memberActivityData]);*/
    /*
    console.log("TrackingBody ln 52 activityDate: " + activityDate);
    //console.log("TrackingBody ln 47 result.data.results: " + result.data.results);
    console.log("TrackingBody ln 54 memberActivityData: " + memberActivityData);
    console.log("TrackingBody ln 55: Object.keys(newActivityData): " + Object.keys(memberActivityData));
    console.log("TrackingBody ln 56: Object.values(newActivityData): " + Object.values(memberActivityData));
    console.log("TrackingBody ln 57: Object.keys(newActivityData): " + Object.keys(Object.values(memberActivityData)));*/
    console.log("1 Array.isArray(memberActivityData): " + Array.isArray(memberActivityData))

    //{Array.isArray(memberActivityData)  && console.log("loop Array.isArray(memberActivityData): " + Array.isArray(memberActivityData)) && memberActivityData.map((data) => (
        

    return (
        <tbody>
        {props.sendData.map((data) => (
            <tr key={Math.random()}>
                <TrackingCell
                    key={Math.random()}
                    idValue={data._id}
                    itemDate={data.date}
                    itemUser={data.user}
                    field="date"
                    value={new Date(data.date).toLocaleDateString('en-US', displayDate)}
                    criteria_datatype="Date"
                />
                <TrackingCell
                    key={Math.random()}
                    idValue={data._id}
                    itemDate={data.date}
                    itemUser={data.user}
                    field="user"
                    value={data.user}
                    criteria_datatype="String"
                />

                {criteriaData.map((criteria) => (
                    <TrackingCell
                        key={Math.random()}
                        idValue={data._id}
                        itemDate={data.date}
                        itemUser={data.user}
                        field={criteria.criteria_key}
                        criteria_datatype={criteria.criteria_datatype}
                    />))}

                <TrackingCell
                    key={Math.random()}
                    idValue={data._id}
                    itemDate={data.date}
                    itemUser={data.user}
                    field="notes"
                    value={data.notes}
                    criteria_datatype="String"
                />
            </tr>))}
    </tbody>
    )
}
