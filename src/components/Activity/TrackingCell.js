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
    const [isSaved, setIsSaved] = useState(false);


    const resetIsSaved = () => {
        setTimeout(() => { setIsSaved(false) }, 2000)
    }
    
    const clearReset = () => clearTimeout(resetIsSaved);;

    async function handleUpdateLogField(e) {

        setIsSaved(true);

        await axios.put(`/userdata-update/${idValue}`, 
        `{"${fieldName}": "${trackData}"}`
        )
            .then(function (response) {
                console.log(response);
                //resetIsSaved();
                //history.push('/tracking');
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }


    return (
        <td>
            {fieldName === "date" && <Form.Control plaintext readOnly name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}

            {fieldName === "user" && <Form.Control plaintext readOnly name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}

                {fieldName !== "user" && fieldName !== "notes" && dataType === "String" && <Form.Control type="text" name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}

                {dataType === "Number" && <Form.Control type="number" name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}

                {dataType === "Boolean" && <Form.Control as="select" name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </Form.Control>}
                
                {fieldName !== "date" && dataType === "Date" && <Form.Control type="date" name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}

            {fieldName === "notes" && <Form.Control type="text" name={fieldName} value={trackData} onChange={(e) => setTrackData(e.target.value)} isValid={isSaved} />}
            <Autosave data={trackData} onSave={handleUpdateLogField} />
        </td>
    )
}
