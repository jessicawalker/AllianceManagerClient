import React, { useState, useEffect, useRef } from 'react';
import { Form } from "react-bootstrap";
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

export default function FilterData(props) {
    const [showCurrentMembers, setShowCurrentMembers] = useState(true);    // all members option
    const [fieldLabel, setFieldLabel] = useState(props.filterName); // label name of field
    const [fieldName, setFieldName] = useState(props.field); // key name of field
    const [dataType, setDataType] = useState(props.criteria_datatype); // datatype of field
    const [trackData, setTrackData] = useState(""); // value of field
    //const [filterData, setFilterData] = useState({}); // value of chosen filters
    const [uniqueValues, setUniqueValues] = useState([]); // unique values for field
    let history = useHistory();

    const dropdownRef = useRef();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

    // read all user data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            if (fieldName !== "user") {
                await axios.get('/userdata-unique', {
                    params: { unique: fieldName }
                })
                    .then(function (response) {
                        console.log(response);
                        setUniqueValues(response.data.results);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        };

        fetchData();
        return () => {
            console.log("unsub userdata-unique");
        };
    }, [fieldName]);

    // create JSX pieces for options in select form control
    let memberCurrentItems;
    let memberAllItems;

    if (fieldName === "user") {
        // generate alphabetized list of current members
        memberCurrentItems = props.membersCurrentList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))

        // generate alphabetized list of all members
        memberAllItems = props.membersAllList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))
    }

    // generate alphabetized list of options per field
    const selectItems = 
        fieldName !== undefined && 
        fieldName !== "user" && 
        fieldName !== "notes" && 
        uniqueValues.sort((a, b) => (a > b) ? -1 : 1).map(
            (item) =>
            <option key={uuidv4()} value={item}>
                {dataType !== "Boolean" && dataType !== "Date" && item}
                {dataType === "Boolean" && (item === true || item === "true") && "Yes"}
                {dataType === "Boolean" && (item === false || item === "false") && "No"}
                {dataType === "Date" && new Date(item).toLocaleDateString('en-US', displayDate)}
            </option>
    );

    // send up filter values, to combine with other filters for pagination
    function handleFilter(e) {
        const newFilterValue = dropdownRef.current.value;
        setTrackData(newFilterValue);
        props.filterValues(fieldName, dropdownRef.current.value);
        history.push('/activities');
    }


     //TODO - fix form control sizes / positioning

    return (
        <>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control 
                className="mb-2 mr-sm-2" 
                size="sm" 
                as="select" 
                name={fieldName} 
                ref={dropdownRef}
                value={trackData}
                onChange={handleFilter}>

                <option value="">all</option>

                {selectItems}

                {showCurrentMembers && fieldName === "user" && memberCurrentItems}
                {!showCurrentMembers && fieldName === "user" && memberAllItems}

            </Form.Control>

            {fieldName === "user" &&
                <Form.Check
                    type="checkbox"
                    id="members_check"
                    name="members_check"
                    label="Current Members Only"
                    checked={showCurrentMembers}
                    onChange={(e) => setShowCurrentMembers(!showCurrentMembers)}
                />
            }
        </>
    )
}