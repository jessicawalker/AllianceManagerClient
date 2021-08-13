import React, { useRef, useState, useEffect } from 'react';
//import { Form, Button, Table, Card, Alert } from "react-bootstrap";
//import { Autosave, useAutosave } from "react-autosave";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import TrackingCell from './TrackingCell';
//import styles from './activities.module.css';

export default function TrackingBody(props) {
    //const [startTracking, setStartTracking] = useState(false);
    //const [activityDate, setActivityDate] = useState(props.logDate);
    //const [membersCurrent, setMembersCurrent] = useState(true);    // current members boolean
    //const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState(props.sendCriteria);    // tracking criteria list sendCriteria
    const [memberActivityData, setActivityData] = useState(props.sendData);  // master array each user
    //const [memberActivityID, setMemberActivityID] = useState([]);
    //const [notesEntry, setNotesEntry] = useState([]);
    //let history = useHistory();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

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
