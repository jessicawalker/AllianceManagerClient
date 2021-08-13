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
    //const [tempArray, setTempArray] = useState(props.arrayValue); // unique values for field
    //const [uniqueValues, setUniqueValues] = useState([]); // unique values for field
    const [uniqueDates, setUniqueDates] = useState([]); // unique values for field

    const testArr = ["8/13/2021", "8/03/2021", "8/03/2021", "8/04/2021", "8/06/2021", "8/06/2021", "8/07/2021", "8/03/2021", "8/08/2021", "8/08/2021", "8/08/2021", "8/08/2021"];
    // dataValueArray.sort((a, b) => (a.display.toLowerCase() > b.display.toLowerCase()) ? 1 : -1);
    //let uniqueValues = testArr.filter((date, i, uv) => uv.indexOf(date) === i);
    //console.log("var: " + uniqueValues);
    
    //(fullObj, objValue) => { fullObj.map((option) => ({objValue})};
    //const getUniqueValuesTest = (object) => Object.values(object).filter((date, i, uv) => uv.indexOf(date) === i);

    const getUniqueValues = (fullArr) => fullArr.filter((date, i, uv) => uv.indexOf(date) === i);
    const sortValues = (uniqueArr) => getUniqueValues(uniqueArr).sort((a, b) => (a > b) ? 1 : -1);
    //console.log("fnc 1: " + getUniqueValuesTest(uniqueValues).sort((a, b) => (a > b) ? 1 : -1))
    //console.log("fnc 1: " + getUniqueValuesTest(uniqueValues))
    //console.log("fnc 2: " + sortValues(testArr))
    //const sortValues = dataValueArray.sort((a, b) => (a > b) ? 1 : -1);
    
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

    // read all member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios.get('/userdata-unique', {
                params: {unique: "date"}});
                setUniqueDates(result.data.results);
        };

        fetchData();
    }, []);
/*
    const getUniqueValuesTest = async (field) => {
        try {
          let result = await axios.get('/userdata-unique', {
            params: {unique: field}});
          setUniqueValues(result.data.results);
          return result.data.results;
        } catch (error) {
          console.error(error);
        }
        return;
      }*/

    /*
    const getUniqueValues = async (field) => {
        await axios.get('/userdata-unique', {
            params: {unique: field, }})
            .then(function (response) {
                console.log(response);
                setUniqueValues(response.data.results);
                return;
            })
            .catch(function (error) {
                console.log(error.response.data);
                return;
            });
    };*/

    //const test1 = sortValues(memberDataCurrent);
    //const test2 = sortValues(memberDataAll);
    //console.log(test1);
    //console.log(test2);
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
    
    return (
        <>
            <Form.Label>{fieldLabel}: </Form.Label>
            <Form.Control className="mb-2 mr-sm-2" size="sm" as="select" name={fieldName} onChange={(e) => setTrackData(e.target.value)}>
                <option>all</option>
                {dataType==="Boolean" && <option>true</option>}
                {dataType==="Boolean" && <option>false</option>}
                
                {fieldName==="date" && uniqueDates.forEach((item) => 
                    <option key={Math.random()}>{item}</option>
                )} 
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
        </>
    )
}