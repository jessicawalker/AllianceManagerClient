import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Pagination, Alert, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import FilterData from './FilterData';
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

export default function Activities() {
    const [memberDataCurrent, setMemberDataCurrent] = useState([{}]);    // current members list
    const [memberDataAll, setMemberDataAll] = useState([{}]);    // all members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [paginationPage, setPaginationPage] = useState(1);  // choose page of pagination
    const [paginationLimit, setPaginationLimit] = useState(20);  // choose number of items per page
    const [paginationLength, setPaginationLength] = useState(9999);  // total number of items paginated
    const [searchParams, setSearchParams] = useState([]);  // master array each user
    const [searchMember, setSearchMember] = useState("");  // get member for filter
    const [searchDate, setSearchDate] = useState("");  // get date for filter
    const [filterKey, setFilterKey] = useState("");  // master array each user
    const [filterReturnValue, setFilterValue] = useState("");  // master array each user
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
            console.log("unsub from members-current");
        };
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
        return () => {
            history.push('/activities');
            console.log("unsub from members-all");
        };
    }, []);

    // read tracking criteria
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();
    }, []);

    // read tracking criteria
    useEffect(() => {
        const fetchData = async () => {
            //const querystring = `?page=${paginationPage}&limit=${paginationLimit}&${filterKey}=${filterReturnValue}`;
            //const paramsTest = new URLSearchParams(`page=${paginationPage}&limit=${paginationLimit}&${filterKey}=${filterReturnValue}`);
            //console.log(paramsTest);
            //const paramsTest = new URLSearchParams([['page', paginationPage], ['limit', paginationLimit]]);
            //let filterList = filterKey === "" ? {} : `{"${filterKey}": "${filterReturnValue}"}`;
            const result = await axios.get(
                '/userdata', {
                params: { page: paginationPage, limit: paginationLimit, user: searchMember }
                //params: { page: paginationPage, limit: paginationLimit }
                //params: { paramsTest }
                //params: {page: paginationPage, limit: paginationLimit, filter: searchParams}
                //params: `page: ${paginationPage}, limit: ${paginationLimit}, filter: {${filterKey}: ${filterReturnValue} }`
            }
            );
            setActivityData(result.data.results);
            //setPaginationLength(result.data.results.length);
            /*setActivityData(prevState => {
                console.log("prevState: " + prevState);
                
        console.log("Object.keys prevState: " + Object.keys(prevState));
        console.log("Object.values prevState: " + Object.values(prevState));
        for (const [key, value] of Object.entries(Object.values(prevState))) {
            console.log(`${key}: ${value}`);
          }
                return {...prevState, results: result.data.results}
            });*/
            console.log("1 useEffect setActivityData: " + result.data.results);
            //console.log("2 useEffect setPaginationLength: " + result.data.results.length);
        };

        fetchData();
    }, [paginationPage, paginationLimit, searchMember, searchDate]);


    //}, [searchParams, paginationPage, paginationLimit]);
    // search.append(searchDate)
    // search.append(searchUser)
    // search.append(filter)   ===> [{claimedSSWar: true},  { activeDeclare: false }]

    function getSearchParams(filterField, filterValue) {
        // {fieldName: trackData}
        //const testParams = Object.create(newParams);

        if (filterField === "user") {setSearchMember(filterValue)}
        if (filterField === "date") {setSearchDate(filterValue)}
        
        //if (filterField === "date") {setSearchDate(new Date(filterValue).toISOString())}
        //if (filterField === "date") {setSearchDate(new Date(filterValue).toUTCString())}

        /*setFilterKey(filterField);
        setFilterValue(filterValue);*/
        console.log("3 getSearchParams filterField: " + filterField)
        console.log("4 getSearchParams filterValue: " + filterValue)

        // setSearchParams = ...prevParams + param
        //console.log({newParams});   // {newParams: "{offense: }"}
        //console.log(newParams);     // {offense: }
        /*
        setSearchParams(prevParams => {
            console.log(prevParams);
            console.log(newParams);
            return [...prevParams, newParams];*/

            //return [...prevParams, testParams];
            // return {claim SS: true}, {offense: true}
            // {claim SS: true} then add---
            // {claim SS: true, offense: true}
        //})
    }
/*
    function checkData() {
        console.log("checkData filterKey: " + filterKey)
        console.log("checkData filterReturnValue: " + filterReturnValue)
        memberActivityData.map((data) => (console.log("checkData filterKey: " + data[filterKey])))
        memberActivityData.map((data) => (console.log("checkData filterReturnValue: " + data[filterReturnValue])))
        memberActivityData.map((data) => console.log(data[filterKey] === data[filterReturnValue]))
        let testFilter = memberActivityData.filter(data => data[filterKey].includes(filterReturnValue))
        console.log("testFilter: " + testFilter);
    }*/
    //checkData();
    /*
        {value={new Date(data.date).toLocaleDateString('en-US', displayDate)}
       
    */

    return (
        <div className="navGap">
            <Form inline>
                <Form.Row>
                    <Col xs={4}>
                        <FilterData
                            filterName="Date"
                            field="date"
                            criteria_datatype="Date"
                            filterValues={getSearchParams}
                        />
                    </Col>
                    <Col xs={4}>
                        <FilterData
                            filterName="Member"
                            field="user"
                            criteria_datatype="String"
                            membersCurrentList={memberDataCurrent}
                            membersAllList={memberDataAll}
                            filterValues={getSearchParams}
                        /></Col>
                </Form.Row>
{/*
                <Form.Group className={styles.secondaryFilter}>
                    <Form.Row>
                        {criteriaData.map((criteria) => (
                            <FilterData
                                key={uuidv4()}
                                idValue={criteria._id}
                                filterName={criteria.criteria_name}
                                field={criteria.criteria_key}
                                criteria_datatype={criteria.criteria_datatype}
                                filterValues={getSearchParams}
                            />
                        ))}
                    </Form.Row>
                        </Form.Group>*/}

                <Form.Row>
                    <Col>
                        <Pagination>
                            <Pagination.First onClick={(e) => setPaginationPage(1)} />
                            <Pagination.Prev onClick={(e) => setPaginationPage(paginationPage - 1)} />
                            <Pagination.Item>{1}</Pagination.Item>

                            <Pagination.Item onClick={(e) => setPaginationPage(4)}>{4}</Pagination.Item>
                            <Pagination.Item>{5}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>

                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next onClick={(e) => setPaginationPage(paginationPage + 1)} />
                            <Pagination.Last />
                        </Pagination>
                    </Col>
                    <Col xs lg="2">
                        <Form.Control className="mb-2 mr-sm-2" as="select" name="paginationOptions" onChange={(e) => setPaginationLimit(e.target.value)}>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                            <option>200</option>
                            <option value="">Show All</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
            </Form>

            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        {criteriaData.map((criteria) => (
                            <th key={uuidv4()}>{criteria.criteria_name}</th>
                        ))}
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {memberActivityData
                    .map((data) => (
                        <tr key={uuidv4()}>
                            <TrackingCellView
                                key={uuidv4()}
                                idValue={data._id}
                                itemDate={data.date}
                                itemUser={data.user}
                                field="date"
                                value={data.date}
                                criteria_datatype="Date"
                            />
                            <TrackingCellView
                                key={uuidv4()}
                                idValue={data._id}
                                itemDate={data.date}
                                itemUser={data.user}
                                field="user"
                                value={data.user}
                                criteria_datatype="String"
                            />

                            {criteriaData.map((criteria) => (
                                <TrackingCellView
                                    key={uuidv4()}
                                    idValue={data._id}
                                    itemDate={data.date}
                                    itemUser={data.user}
                                    field={criteria.criteria_key}
                                    value={data[criteria.criteria_key]}
                                    criteria_datatype={criteria.criteria_datatype}
                                />))}

                            <TrackingCellView
                                key={uuidv4()}
                                idValue={data._id}
                                itemDate={data.date}
                                itemUser={data.user}
                                field="notes"
                                value={data.notes}
                                criteria_datatype="String"
                            />
                        </tr>)
                    )}
                </tbody>
            </Table>
        </div>
    )
}
