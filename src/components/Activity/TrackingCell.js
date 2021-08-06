import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
/*import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import RowTool from '../Row/RowTool';*/
import styles from './activities.module.css';

export default function TrackingCell(props) {
    const [trackData, setTrackData] = useState(props.value);
    const [fieldName, setFieldName] = useState(props.field);
    const [dataType, setDataType] = useState(props.criteria_datatype);

    // {fieldName === "date" && <Form.Control plaintext readOnly name={fieldName} defaultValue={new Date(trackData).toLocaleDateString()} />}


    return (
        <td>
            {fieldName === "date" && <Form.Control plaintext readOnly name={fieldName} defaultValue={trackData} />}
            {fieldName === "user" && <Form.Control plaintext readOnly name={fieldName} defaultValue={trackData} />}
                {fieldName !== "user" && fieldName !== "notes" && dataType === "String" && <Form.Control type="text" name={fieldName} defaultValue={trackData} />}
                {dataType === "Number" && <Form.Control type="number" name={fieldName} defaultValue={trackData} />}
                {dataType === "Boolean" && <Form.Control as="select" name={fieldName} defaultValue={trackData}>
                    <option>false</option>
                    <option>true</option>
                </Form.Control>}
                {fieldName !== "date" && dataType === "Date" && <Form.Control type="date" name={fieldName} defaultValue={trackData} />}
            {fieldName === "notes" && <Form.Control type="text" name={fieldName} defaultValue={trackData} />}
        </td>
    )
}
