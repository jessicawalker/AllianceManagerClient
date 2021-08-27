import React, { useState, useEffect } from 'react';
import { Form, Table, Pagination, Alert } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import FilterData from './FilterData';
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

export default function Activities(props) {
    const [memberDataCurrent, setMemberDataCurrent] = useState([{}]);    // current members list
    const [memberDataAll, setMemberDataAll] = useState([{}]);    // all members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [paginationPage, setPaginationPage] = useState(1);  // choose page of pagination
    const [paginationLimit, setPaginationLimit] = useState(20);  // choose number of items per page
    const [paginationLength, setPaginationLength] = useState(0);  // total number of items paginated
    const [searchMember, setSearchMember] = useState("");  // get member for filter
    const [searchDate, setSearchDate] = useState("");  // get date for filter
    const [sortBy, setSortBy] = useState("");  // get date for filter
    const [searchParams, setSearchParams] = useState([]);  // get custom params
    const [viewMember, setViewMember] = useState(false);  //display username as heading
    const [viewDate, setViewDate] = useState(false);  // display date as heading
    //const [filterKey, setFilterKey] = useState("");  // master array each user
    //const [filterReturnValue, setFilterValue] = useState("");  // master array each user
    let history = useHistory();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

    //TODO - move date display format somewhere so that it only is defined in one location

    //if (props.saveDataBtn) setSearchDate(new Date(props.saveDataDate).toISOString());

    //TODO - Give option to view different types of reports, not just the one default


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
            const result = await axios.get(
                '/userdata', {
                params: { page: paginationPage, limit: paginationLimit, user: searchMember, date: searchDate, sortBy: sortBy }
            }
            );
            setActivityData(result.data.results);
            setPaginationLength(result.data.total);
        };

        fetchData();
    }, [paginationPage, paginationLimit, searchMember, searchDate, sortBy]);

    function getSearchParams(filterField, filterValue) {

        if (filterField === "user") {
            setSearchMember(filterValue);
            setViewMember(true);
            if (filterValue === "") setViewMember(false);
        }
        else if (filterField === "date") {
            setSearchDate(filterValue);
            setViewDate(true);
            if (filterValue === "") setViewDate(false);
        }
        else if (filterField === "sort") {
            setSortBy(filterValue);
        }
        else {
            setViewDate(false);
            setViewMember(false);
            setSearchParams(`${filterField}: ${filterValue}`); 
            console.log(filterField + ": " + filterValue)
        }
    }

    // auto-generate pagination numbered items
    let paginationItems = [];
    const showPagination = () => {
        const NEIGHBOR_COUNT = 2;

        // avoid infinite loop caused by for loop's increment when "Show All"
        if (paginationLimit !== "") {
            paginationItems.push(
                <Pagination.First
                    disabled={(paginationPage <= 1) || paginationLimit === ""}
                    onClick={(e) => setPaginationPage(1)}
                />,
                <Pagination.Prev
                    disabled={(paginationPage <= 1) || paginationLimit === ""}
                    onClick={(e) => setPaginationPage(prevPage => prevPage - 1)}
                />);

            for (let number = 1; number <= Math.ceil(paginationLength / paginationLimit); number++) {

                // show first page and show up to 2 pages left of active page
                if (number !== 1 && number < paginationPage - NEIGHBOR_COUNT ) {
                    paginationItems.push(<Pagination.Ellipsis />);
                    number = paginationPage - NEIGHBOR_COUNT;
                    continue;
                } 
                
                //  show up to 2 pages right of active page and show last page
                else if (number > paginationPage + NEIGHBOR_COUNT && number < Math.ceil(paginationLength / paginationLimit)) {
                    paginationItems.push(<Pagination.Ellipsis />);
                    number = Math.ceil(paginationLength / paginationLimit) - 1;
                    continue;
                }

                paginationItems.push(
                    <Pagination.Item
                        key={number}
                        onClick={(e) => setPaginationPage(number)}
                        active={paginationPage === number}
                    >{number}</Pagination.Item>);
            }

            paginationItems.push(
                <Pagination.Next
                    disabled={(paginationPage >= Math.ceil(paginationLength / paginationLimit) || paginationLimit === "")}
                    onClick={() => setPaginationPage(prevPage => prevPage + 1)}
                />,
                <Pagination.Last
                    disabled={(paginationPage >= Math.ceil(paginationLength / paginationLimit) || paginationLimit === "")}
                    onClick={(e) => setPaginationPage(Math.ceil(paginationLength / paginationLimit))}
                />);
        }
    }
    showPagination();

    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Activity Logs</h2>
            <Form inline>
                <Form.Row className={styles.reportTools}>
                    <Col xs={4}>
                        <FilterData
                            filterName="Date"
                            field="date"
                            criteria_datatype="Date"
                            filterValues={getSearchParams}
                        />
                    </Col>
                    <Col xs={6}>
                        <FilterData
                            filterName="Member"
                            field="user"
                            criteria_datatype="String"
                            membersCurrentList={memberDataCurrent}
                            membersAllList={memberDataAll}
                            filterValues={getSearchParams}
                        /></Col>
                    <Col xs={2}>
                        <FilterData
                            filterName="Sort By"
                            field="sort"
                            filterValues={getSearchParams}
                            criteria_datatype="None"
                        />
                    </Col>
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
                </Form.Group>
*/}

                <Form.Row className={styles.reportTools}>
                    <Col xs lg="2">
                        <Form.Control className="mb-2 mr-sm-2" as="select" name="paginationOptions" onChange={(e) => setPaginationLimit(e.target.value)}>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                            <option>200</option>
                            <option value="">Show All</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Pagination>
                            {paginationItems}
                        </Pagination>
                    </Col>
                </Form.Row>
            </Form>
            <div className={styles.activitiesTable}>

                {viewMember && <h4 className="text-center mb-4 mt-4">{searchMember}</h4>}
                {viewDate && <h4 className="text-center mb-4 mt-4">{new Date(searchDate).toLocaleDateString('en-US', displayDate)}</h4>}

                <Table className="table" striped bordered hover responsive="md">
                    <thead>
                        <tr>
                            {!viewDate && <th scope="col">Date</th>}
                            {!viewMember && <th scope="col">User</th>}
                            {criteriaData.map((criteria) => (
                                <th scope="col" key={uuidv4()}>{criteria.criteria_name}</th>
                            ))}
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberActivityData
                            .map((data) => (
                                <tr key={uuidv4()}>
                                    {!viewDate && <TrackingCellView
                                        key={uuidv4()}
                                        idValue={data._id}
                                        field="date"
                                        value={data.date}
                                        criteria_datatype="Date"
                                    />}
                                    {!viewMember && <TrackingCellView
                                        key={uuidv4()}
                                        idValue={data._id}
                                        field="user"
                                        value={data.user}
                                        criteria_datatype="String"
                                    />}

                                    {criteriaData.map((criteria) => (
                                        <TrackingCellView
                                            key={uuidv4()}
                                            idValue={data._id}
                                            field={criteria.criteria_key}
                                            value={data[criteria.criteria_key]}
                                            criteria_datatype={criteria.criteria_datatype}
                                        />))}

                                    <TrackingCellView
                                        key={uuidv4()}
                                        idValue={data._id}
                                        field="notes"
                                        value={data.notes}
                                        criteria_datatype="String"
                                    />
                                </tr>)
                            )}
                    </tbody>
                </Table>
            </div>
            <Form.Row>
                <Col>
                    <Pagination>
                        {paginationItems}
                    </Pagination>
                </Col>
            </Form.Row>
        </div>
    )
}
