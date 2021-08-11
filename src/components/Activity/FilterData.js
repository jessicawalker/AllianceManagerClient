import React, { useState, useEffect } from 'react';
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
    const [showCurrentMembers, setShowCurrentMembers] = useState(true);    // all members list
    const [fieldLabel, setFieldLabel] = useState(props.filterName); // label name of field
    const [fieldName, setFieldName] = useState(props.field); // key name of field
    const [trackData, setTrackData] = useState(props.value); // value of field
    const [dataType, setDataType] = useState(props.criteria_datatype);
    const [optionNames, setOptionNames] = useState(props.fieldOptions); // unique values for field
    const uniqueValues = [];
    
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
    /*

    userdata.user => 

    userdata.date => Aug 1 2021, Aug 3 2021, Aug 4 2021...

        <option>All</option>
        <option>Aug 1 2021</option>
        <option>Aug 3 2021</option>
        <option>Aug 4 2021</option>

    */

    /*
    userdata.map(useritem => {
    if (uniqueValues.indexOf(useritem.tag) === -1) {
        uniqueValues.push(useritem.tag)
    }
});

        <FilterData filterValues={memberActivityData} /> ??
        <FilterData filterValues={criteria} /> ?? field because will make one filter per field
        <FilterData filterValues={criteria} />
        <FilterData filterValues={criteria} />
        <FilterData filterValues={criteria} />

            <Option>All</Option>
            <Option>unique value 1</Option>
            <Option>unique value 2</Option>
            <Option>unique value 3</Option>
            <Option> etc.... </Option>


    */

    
function getUniqueValues(allDataArray) {
    var valueExists;
    var valueList = "";

    var dataValueArray = [{ value: "", display: "- All Users -" }];
    for (let i = 0; i < allDataArray.length; i++) {
        valueExists = dataValueArray.find(function(element) {
            return element.value === allDataArray[i].user;
        });

        if (valueExists) {
            continue;
        } else {
            dataValueArray.push({ value: allDataArray[i].user, display: allDataArray[i].user });
            valueList += allDataArray[i].user + " ";
        }
    }
    dataValueArray.sort((a, b) => (a.display.toLowerCase() > b.display.toLowerCase()) ? 1 : -1);
    return dataValueArray;
}
    
    return (
        <Col>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control className="mb-2 mr-sm-2" size="sm" as="select" name={fieldName} onChange={(e) => setTrackData(e.target.value)}>
                <option>all</option>
                {dataType==="Boolean" && <option>true</option>}
                {dataType==="Boolean" && <option>false</option>}
                
                {showCurrentMembers && fieldName==="user" && memberDataCurrent.map((option) => (
                    <option key={Math.random()}>{option.member_username}</option>
                ))} 
                {!showCurrentMembers && fieldName==="user" && memberDataAll.map((option) => (
                    <option key={Math.random()}>{option.member_username}</option>
                ))} 
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
        </Col>
    )
}