import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { Autosave, useAutosave } from "react-autosave";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import styles from './activities.module.css';

export default function TrackingCell(props) {
    const [trackData, setTrackData] = useState(props.value);
    const [fieldName, setFieldName] = useState(props.field);
    const [dataType, setDataType] = useState(props.criteria_datatype);
    const [idValue, setIdValue] = useState(props.idValue);
    const [itemDate, setItemDate] = useState(props.itemDate);
    const [itemUser, setItemUser] = useState(props.itemUser);
    let history = useHistory();
/*
    if (dataType === "Boolean" && trackData === "") {
        setTrackData(false)
    } else
    if (dataType === "String" && trackData === "") {
        setTrackData("")
    } else
    if (dataType === "Number" && trackData === "") {
        setTrackData("0")
    } else
    if (dataType === "Date" && trackData === "") {
        setTrackData(new Date(Date.now()).toISOString())
    }*/

    async function handleUpdateLogField(e) {

        await axios.put(`/userdata-update/${idValue}`, {
            fieldName: fieldName,
            trackData: trackData
        })
            .then(function (response) {
                console.log(response);
                history.push('/tracking');
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    
        // figure out the one field to update
        // onBlur, autosave/put update
        // do a final put at finish button?
        // date - member - criteria... - notes
    
    }


    return (
        <td>
            {fieldName === "date" && <Form.Control plaintext readOnly name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
            {fieldName === "user" && <Form.Control plaintext readOnly name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
                {fieldName !== "user" && fieldName !== "notes" && dataType === "String" && <Form.Control type="text" name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
                {dataType === "Number" && <Form.Control type="number" name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
                {dataType === "Boolean" && <Form.Control as="select" name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)}>
                    <option>false</option>
                    <option>true</option>
                </Form.Control>}
                {fieldName !== "date" && dataType === "Date" && <Form.Control type="date" name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
            {fieldName === "notes" && <Form.Control type="text" name={fieldName} defaultValue={trackData} onChange={(e) => setTrackData(e.target.value)} />}
            <Autosave data={trackData} onSave={handleUpdateLogField} />
        </td>
    )
}
