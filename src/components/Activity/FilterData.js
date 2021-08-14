import React, { useState, useEffect, useReducer } from 'react';
import { Form, Button, Table, Card, Alert } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

export default function FilterData(props) {
    const [memberDataCurrent, setMemberDataCurrent] = useState([{}]);    // current members list
    const [memberDataAll, setMemberDataAll] = useState([{}]);    // all members list
    const [showCurrentMembers, setShowCurrentMembers] = useState(true);    // all members option
    const [fieldLabel, setFieldLabel] = useState(props.filterName); // label name of field
    const [fieldName, setFieldName] = useState(props.field); // key name of field
    const [dataType, setDataType] = useState(props.criteria_datatype); // datatype of field
    const [trackData, setTrackData] = useState(props.value); // value of field
    const [filterData, setFilterData] = useState({}); // value of chosen filters
    const [uniqueValues, setUniqueValues] = useState([]); // unique values for field
    let history = useHistory();

    
    // read current member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            setMemberDataCurrent(result.data.members);
        };

        fetchData();
        return () => {
            history.push('/activities');
            console.log("unsub");
        };
    }, []);
/*
    // read all member data
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const fetchData = async () => {
            try {
                let result = await axios(
                    '/members-all', {
                        cancelToken: source.token,
                    }
                );
                setMemberDataAll(result.data.members);
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        }
    
        fetchData()
    
        return () => {
            source.cancel()
        }
    }, [])*/

    // read all member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-all',
            );
            setMemberDataAll(result.data.members);
        };

        fetchData();
        return () => {
            history.push('/activities');
            console.log("unsub");
        };
    }, []);

    // read all user data, filter for field's unique values
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/userdata-unique', {
                params: {unique: fieldName}
            })
            .then(function (response) {
                setUniqueValues(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        fetchData();
        return () => {
            history.push('/activities');
            console.log("unsub");
        };
    //}, []);
    }, [fieldName]);


    const memberCurrentItems = memberDataCurrent.map((option) => (
        <option key={uuidv4()}>{option.member_username}</option>
    ))

    const memberAllItems = memberDataAll.map((option) => (
        <option key={uuidv4()}>{option.member_username}</option>
    ))

    // generate alphabetized list of options per field
    const selectItems = fieldName !==undefined && fieldName !=="user" && uniqueValues.sort((a, b) => (a > b) ? -1 : 1).map(
        (item) =>
            <option key={uuidv4()}>
                {dataType !== "Date" && item}
                {dataType === "Date" && new Date(item).toDateString()}
            </option>
    );
    
    async function handleFilter(e) {
        //e.preventDefault();

        setTrackData(e.target.value);
        //filterData, setFilterData
        //setFilterData(prevFilterData => {});

        // send {fieldName: trackData}
        props.filterValues(`{${fieldName}: ${trackData}}`);
        //props.filterValues(fieldName, trackData);

        // send up filter values, to combine with other filters for pagination
    }


    
    return (
        <>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control className="mb-2 mr-sm-2" size="sm" as="select" name={fieldName} onChange={(e) => handleFilter(e)}>

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