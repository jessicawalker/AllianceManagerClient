import React, { useState, useEffect, useReducer } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import styles from './activities.module.css';

export default function FilterData(props) {
    const [memberDataCurrent, setMemberDataCurrent] = useState([{}]);    // current members list
    const [memberDataAll, setMemberDataAll] = useState([{}]);    // all members list
    const [showCurrentMembers, setShowCurrentMembers] = useState(true);    // all members option
    const [fieldLabel, setFieldLabel] = useState(props.filterName); // label name of field
    const [fieldName, setFieldName] = useState(props.field); // key name of field
    const [dataType, setDataType] = useState(props.criteria_datatype); // datatype of field
    const [trackData, setTrackData] = useState(props.value); // value of field
    const [uniqueValues, setUniqueValues] = useState([]); // unique values for field

    
    // read current member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            setMemberDataCurrent(result.data.members);
        };

        fetchData();
    }, []);

    // read all member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-all',
            );
            setMemberDataAll(result.data.members);
        };

        fetchData();
    }, []);

    // read all member data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/userdata-unique', {
                params: {unique: fieldName}
            })
            .then(function (response) {
                setUniqueValues(response.data.results);
            })
            .catch(function (error) {
                //console.log(error.response.data);
            });
        };

        fetchData();
    }, [fieldName]);

    const selectItems = fieldName !=="user" && uniqueValues.sort((a, b) => (a > b) ? -1 : 1).map(
        (item) =>
            <option>
                {dataType !== "Date" && item}
                {dataType === "Date" && new Date(item).toDateString()}
            </option>
    );

    const memberCurrentItems = memberDataCurrent.map((option) => (
        <option key={Math.random()}>{option.member_username}</option>
    ))

    const memberAllItems = memberDataAll.map((option) => (
        <option key={Math.random()}>{option.member_username}</option>
    ))
    
    return (
        <>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control className="mb-2 mr-sm-2" size="sm" as="select" name={fieldName} onChange={(e) => setTrackData(e.target.value)}>

                <option>all</option>

                {selectItems}
                
                {showCurrentMembers && fieldName==="user" && memberCurrentItems} 
                {!showCurrentMembers && fieldName==="user" && memberAllItems} 

            </Form.Control>
            {fieldName==="user" && 
                <Form.Check 
                    type="checkbox"
                    id="members_check"
                    label="Current Members Only"
                    checked={showCurrentMembers}
                    onChange={(e) => setShowCurrentMembers(!showCurrentMembers)}
                />
    }
        </>
    )
}