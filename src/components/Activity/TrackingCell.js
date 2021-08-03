import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
/*import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import RowTool from '../Row/RowTool';*/
import styles from './activities.module.css';

export default function TrackingCell(props) {
    const [trackData, setTrackData] = useState(props.value);    // current members boolean


    return (
        <td>
            {props.field === "date" && <Form.Control plaintext readOnly defaultValue={trackData} />}
            {props.field === "user" && <Form.Control plaintext readOnly defaultValue={trackData} />}
                {props.field !== "user" && props.field !== "notes" && props.criteria_datatype === "String" && <Form.Control type="text" defaultValue={trackData} />}
                {props.criteria_datatype === "Number" && <Form.Control type="number" defaultValue={trackData} />}
                {props.criteria_datatype === "Boolean" && <Form.Control as="select" defaultValue={trackData}>
                    <option>false</option>
                    <option>true</option>
                </Form.Control>}
                {props.field !== "date" && props.criteria_datatype === "Date" && <Form.Control type="date" defaultValue={trackData} />}
            {props.field === "notes" && <Form.Control type="text" defaultValue={props.value} />}
        </td>
    )
}
