import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
/*import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import RowTool from '../Row/RowTool';
import styles from './activities.module.css';*/

export default function TrackingCell(props) {
    return (
        <td>
            {props.field === "date" && <Form.Control plaintext readOnly defaultValue={props.value} />}
            {props.field === "user" && <Form.Control plaintext readOnly defaultValue={props.value} />}
            {props.field === "criteria_datatype" && <Form.Control type="text" />}
                {props.criteria_datatype === "String" && <Form.Control type="text" />}
                {props.criteria_datatype === "Number" && <Form.Control type="number" />}
                {props.criteria_datatype === "Boolean" && <Form.Control as="select" defaultValue="false">
                    <option>true</option>
                    <option>false</option>
                </Form.Control>}
                {props.criteria_datatype === "Date" && <Form.Control type="date" />}
            {props.field === "notes" && <Form.Control type="text" defaultValue={props.value} />}
        </td>
    )
}
