import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
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
    const [trackData, setTrackData] = useState(props.value); // value of field
    //const [filterData, setFilterData] = useState({}); // value of chosen filters
    const [uniqueValues, setUniqueValues] = useState([]); // unique values for field
    let history = useHistory();

    const dropdownRef = useRef();

    /*
    // read current member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            console.log(result.data);
            console.log(result.data.members);
            setMemberDataCurrent(result.data.members);
        };

        fetchData();
        return () => {
            //history.push('/activities');
            console.log("unsub");
        };
    }, []);

    // read all member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-all',
            );
            console.log(result.data);
            console.log(result.data.members);
            setMemberDataAll(result.data.members);
        };

        fetchData();
        return () => {
            //history.push('/activities');
            console.log("unsub");
        };
    }, []);*/

    // read all user data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            //if (props.field === "user") return;
            await axios.get('/userdata-unique', {
                params: { unique: props.field }
            })
                .then(function (response) {
                    console.log(response);
                    setUniqueValues(response.data.results);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        fetchData();
        return () => {
            console.log("unsub userdata-unique for " + props.field);
        };
        //}, []);
    }, [props.field]);

    /*
            <option key={uuidv4()} value={option.member_username} onSelect={(e) => props.filterValues(fieldName, e.target.value)}>{option.member_username}</option>
            
            <option key={uuidv4()} value={option.member_username} onSelect={(e) => props.filterValues(fieldName, e.target.value)}>{option.member_username}</option>
    */


    let memberCurrentItems;
    let memberAllItems;

    if (fieldName === "user") {
        // generate alphabetized list of current members
        memberCurrentItems = props.membersCurrentList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))
        console.log("gen fieldName === current user: " + fieldName);

        // generate alphabetized list of all members
        memberAllItems = props.membersAllList.map((option) => (
            <option key={uuidv4()} value={option.member_username}>{option.member_username}</option>
        ))
        console.log("gen fieldName === all user: " + fieldName);
    }

    // generate alphabetized list of options per field
    const selectItems = 
        fieldName !== undefined && 
        fieldName !== "user" && 
        fieldName !== "notes" && 
        console.log("selectItems: " + fieldName) &&
        uniqueValues.sort((a, b) => (a > b) ? -1 : 1).map(
            (item) =>
            <option key={uuidv4()} value={item}>
                {dataType !== "Date" && item}
                {dataType === "Date" && new Date(item).toDateString()}
            </option>
    );

    function handleFilter(e) {
        //e.preventDefault();
        const newFilterValue = dropdownRef.current.value;
        setTrackData(newFilterValue);
        //filterData, setFilterData
        //setFilterData(prevFilterData => {});

        // send {fieldName: trackData}
        //props.filterValues(`{${fieldName}: ${trackData}}`);
        console.log("handleFilter track e.target.value:" + e.target.value);
        console.log("handleFilter track setTrackData:" + trackData);
        props.filterValues(fieldName, dropdownRef.current.value);
        console.log("handleFilter filterValues fieldName:" + fieldName);
        console.log("handleFilter filterValues trackData:" + trackData);
        history.push('/activities');

        // send up filter values, to combine with other filters for pagination
        // onChange={(e) => handleFilter(e)
    }



    return (
        <>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control 
                className="mb-2 mr-sm-2" 
                size="sm" 
                as="select" 
                name={fieldName} 
                value={trackData} 
                ref={dropdownRef}
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