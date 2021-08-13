import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import { Autosave, useAutosave } from "react-autosave";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import styles from './activities.module.css';

export default function TrackingCellView(props) {
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

    return (
        <td>
            {trackData}
        </td>
    )
}
