import React, { useState, useEffect, useRef } from 'react';
import { Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

export default function FilterData(props) {
    const [showCurrentMembers, setShowCurrentMembers] = useState(true);    // all members option
    const [showReverseSort, setShowReverseSort] = useState(false);    // all members option
    //const [fieldLabel, setFieldLabel] = useState(props.filterName); // label name of field
    //const [fieldName, setFieldName] = useState(props.field); // key name of field
    //const [dataType, setDataType] = useState(props.criteria_datatype); // datatype of field
    const [trackData, setTrackData] = useState(""); // value of field
    //const [filterData, setFilterData] = useState({}); // value of chosen filters
    const [uniqueValues, setUniqueValues] = useState([]); // unique values for field
    let history = useHistory();

    const dropdownRef = useRef();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

    // read all user data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            if (props.field !== "user" && props.field !== "activity") {
                await axios.get('/userdata-unique', {
                    params: { unique: props.field }
                })
                .then(function (response) {
                    setUniqueValues(response.data.results);
                    //console.log(response);
                    //console.log(response.request.responseText);
                })
                .catch(function (error) {
                    console.log(error);
                });;
                //setUniqueValues(result.data.results);
            }
        };

        fetchData();
        return () => {
            console.log("unsub userdata-unique: " + props.field);
        };
    }, [trackData, props.field]);

    // create JSX pieces for options in select form control
    let memberCurrentItems;
    let memberAllItems;
    let activityLogItems;

    if (props.field === "user") {
        // generate alphabetized list of current members
        memberCurrentItems = props.membersCurrentList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))

        // generate alphabetized list of all members
        memberAllItems = props.membersAllList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))
    }

    if (props.field === "activity") {
        // generate alphabetized list of current members
        // activityLogsList
        activityLogItems = props.activityLogsList.map((option) => (
            <option key={uuidv4()} value={option.activity_name}>{option.activity_name}</option>
        ))
    }

    // generate alphabetized list of options per field
    const selectItems = 
        props.field !== undefined && 
        props.field !== "user" && 
        props.field !== "activity" && 
        props.field !== "notes" && 
            uniqueValues.sort((a, b) => (a > b) ? -1 : 1).map(
                (item) =>
                <option key={uuidv4()} value={item} trackdataval={trackData}>
                    {props.criteria_datatype !== "Boolean" && props.criteria_datatype !== "Date" && item}
                    {props.criteria_datatype === "Boolean" && (item === true || item === "true") && "Yes"}
                    {props.criteria_datatype === "Boolean" && (item === false || item === "false") && "No"}
                    {props.criteria_datatype === "Date" && new Date(item).toLocaleDateString('en-US', displayDate)}
                </option>
        );

    // send up filter values, to combine with other filters for pagination
    function handleFilter() {
        setTrackData(dropdownRef.current.value);
        props.filterValues(props.field, dropdownRef.current.value, showReverseSort);
    }

    return (
            <div className={styles.filterOption}>
                <Form.Label>{props.filterName}: </Form.Label>
                <Form.Control 
                    className="mb-2 mr-sm-2" 
                    size="sm" 
                    as="select" 
                    name={props.field} 
                    ref={dropdownRef}
                    value={trackData}
                    onChange={handleFilter}>

                    {props.field !== "sort" && props.field !== "activity" && <option value="">all</option>}

                    {selectItems}

                    {props.field === "activity" && activityLogItems}

                    {showCurrentMembers && props.field === "user" && memberCurrentItems}
                    {!showCurrentMembers && props.field === "user" && memberAllItems}

                    {props.field === "sort" && props.criteria_datatype === "None" && <option key={uuidv4()} value="date">Date</option>}
                    {props.field === "sort" && props.criteria_datatype === "None" && <option key={uuidv4()} value="user">Member</option>}
                </Form.Control>

                {props.field === "user" &&
                    <Form.Check
                        type="checkbox"
                        id="members_check"
                        name="members_check"
                        label="Current Members Only"
                        checked={showCurrentMembers}
                        onChange={(e) => setShowCurrentMembers(!showCurrentMembers)}
                    />
                }

                {props.field === "sort" &&
                    <Form.Check
                        type="checkbox"
                        id="reverse_check"
                        name="reverse_check"
                        label="Reverse"
                        checked={showReverseSort}
                        onChange={(e) => setShowReverseSort(!showReverseSort)}
                    />
                }
            </div>
    )
}