import React, { useState, useEffect } from 'react';
import { Form, Table, Pagination, Card, Accordion, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import FilterData from './FilterData';
import { v4 as uuidv4 } from 'uuid';
import styles from './activities.module.css';

const FIELDS = {
    ACTIVITY: "activity",
    USER: "user",
    DATE: "date",
    NOTES: "notes",
    SORT: "sort"
}

export default function Activities(props) {
    const [activityLogData, setActivityLogData] = useState([{}]);    // activity log list
    const [memberDataCurrent, setMemberDataCurrent] = useState([{}]);    // current members list
    const [memberDataAll, setMemberDataAll] = useState([{}]);    // all members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [paginationPage, setPaginationPage] = useState(1);  // choose page of pagination
    const [paginationLimit, setPaginationLimit] = useState(20);  // choose number of items per page
    const [paginationLength, setPaginationLength] = useState(0);  // total number of items paginated
    const [searchActivityLog, setSearchActivityLog] = useState("");  // get log for filter
    const [searchMember, setSearchMember] = useState("");  // get member for filter
    const [searchDate, setSearchDate] = useState("");  // get date for filter
    const [sortBy, setSortBy] = useState("");  // get sorting of table
    //const [sortByReverse, setSortByReverse] = useState(false);  // reverse sorting of table
    const [searchParams, setSearchParams] = useState("");  // get custom params
    const [searchCustom, setSearchCustom] = useState("");  // get custom params
    const [viewMember, setViewMember] = useState(false);  //display username as heading
    const [viewDate, setViewDate] = useState(false);  // display date as heading
    let history = useHistory();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
    const centerVert = {
        alignSelf: 'center'
    };

    //TODO - move date display format somewhere so that it only is defined in one location
    //TODO - view by each activity report with filter

    // read tracking criteria
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/activities',
            );
            setActivityLogData(result.data.results);
            setSearchActivityLog(result.data.results[0].activity_name)
        };

        fetchData();
    }, []);

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

    // read activity data
    useEffect(() => {
        const fetchData = async () => {

            await axios.get(
                '/userdata', {
                    params: { page: paginationPage, limit: paginationLimit, activity: searchActivityLog, user: searchMember, date: searchDate, sortBy: sortBy, filter: searchParams }
            }
            )
            .then(function (response) {
                setActivityData(response.data.results);
                setPaginationLength(response.data.total);
                console.log(response);
                //console.log(response.request.responseText);
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        fetchData();
        return () => {
            console.log("=========== Activities.js ===========\nunsub userdata: " + 
                searchActivityLog + ", " + 
                searchMember + ", " + 
                searchDate + ", " + 
                sortBy);
        };
    }, [paginationPage, paginationLimit, paginationLength, searchActivityLog, searchMember, searchDate, searchParams, sortBy]);

    // TODO - get reverse sort to work, either in front-end only or through Mongo
    // directorsArray.sort((a, b) => (a.display > b.display) ? 1 : -1);
    function getSearchParams(filterField, filterValue, filterReverse) {

        console.log("filterField:");
        console.log(filterField);
        console.log("filterValue:");
        console.log(filterValue);

        if (filterField === FIELDS.USER) {
            setSearchMember(filterValue);
            if (filterValue !== "") setViewMember(true)
                else setViewMember(false);
        }
        else if (filterField === FIELDS.DATE) {
            setSearchDate(filterValue);
            if (filterValue !== "") setViewDate(true)
                else setViewDate(false);
        }
        else if (filterField === FIELDS.ACTIVITY) {
            setSearchActivityLog(filterValue)
        }
        else if (filterField === FIELDS.SORT) {
            setSortBy(filterValue);
        }
        else {
            // keeps switching back to "" default option, not selected option
            // seems to be related to mapping & rerendering of components
            setSearchParams(`{"${filterField}": "${filterValue}"}`);
            setSearchCustom(filterValue);
            
            // TODO - fix boolean values input and out; some are being treated like strings; checks numbers too
        }
    }

    function clearFilters(e) {
        e.preventDefault();
        setSearchMember("");
        setSearchDate("");
        setSearchParams("");
        setSortBy("");
        setViewDate(false);
        setViewMember(false);
    }

    // auto-generate pagination numbered items
    let paginationItems = [];
    const showPagination = () => {
        const NEIGHBOR_COUNT = 1;

        // avoid infinite loop caused by for loop's increment when "Show All"
        if (paginationLimit !== "") {
            paginationItems.push(
                <Pagination.First
                    key={uuidv4()}
                    disabled={(paginationPage <= 1) || paginationLimit === ""}
                    onClick={(e) => setPaginationPage(1)}
                />,
                <Pagination.Prev
                    key={uuidv4()}
                    disabled={(paginationPage <= 1) || paginationLimit === ""}
                    onClick={(e) => setPaginationPage(prevPage => prevPage - 1)}
                />);

            for (let number = 1; number <= Math.ceil(paginationLength / paginationLimit); number++) {

                // show first page and show up to 2 pages left of active page
                if (number !== 1 && number < paginationPage - NEIGHBOR_COUNT) {
                    paginationItems.push(<Pagination.Ellipsis key={uuidv4()} />);
                    number = paginationPage - NEIGHBOR_COUNT - 1;
                    continue;
                }

                //  show up to 2 pages right of active page and show last page
                else if (number > paginationPage + NEIGHBOR_COUNT && number < Math.ceil(paginationLength / paginationLimit)) {
                    paginationItems.push(<Pagination.Ellipsis key={uuidv4()} />);
                    number = Math.ceil(paginationLength / paginationLimit) - 1;
                    continue;
                }

                paginationItems.push(
                    <Pagination.Item
                        key={uuidv4()}
                        onClick={(e) => setPaginationPage(number)}
                        active={paginationPage === number}
                    >{number}</Pagination.Item>);
            }

            paginationItems.push(
                <Pagination.Next
                    key={uuidv4()}
                    disabled={(paginationPage >= Math.ceil(paginationLength / paginationLimit) || paginationLimit === "")}
                    onClick={() => setPaginationPage(prevPage => prevPage + 1)}
                    
                />,
                <Pagination.Last
                    key={uuidv4()}
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
                    <Col xs={3} className={styles.filterItem}>
                        <FilterData
                            filterName="Activity"
                            field={FIELDS.ACTIVITY}
                            criteria_datatype="String"
                            activityLogsList={activityLogData}
                            filterValues={getSearchParams}
                        />
                    </Col>
                    <Col xs={3} className={styles.filterItem}>
                        <FilterData
                            filterName="Date"
                            field={FIELDS.DATE}
                            criteria_datatype="Date"
                            filterValues={getSearchParams}
                        />
                    </Col>
                    <Col xs={3} className={styles.filterItem}>
                        <FilterData
                            filterName="Member"
                            field={FIELDS.USER}
                            criteria_datatype="String"
                            membersCurrentList={memberDataCurrent}
                            membersAllList={memberDataAll}
                            filterValues={getSearchParams}
                        /></Col>
                    <Col xs={2} className={styles.filterItem}>
                        <FilterData
                            filterName="Sort By"
                            field={FIELDS.SORT}
                            filterValues={getSearchParams}
                            criteria_datatype="None"
                        />
                    </Col>
                    <Col xs={2} className={styles.filterItem} style={centerVert}>
                        <Button className={styles.filterClearBtn} onClick={clearFilters}>reset filters</Button>
                    </Col>
                </Form.Row>

                <Accordion className={styles.secondaryFilterContainer}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className={styles.secondaryFilterHeader}>
                            View More Options
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form.Group>
                                    <Form.Row className={styles.secondaryFilter}>
                                        {criteriaData.map((criteria) => (
                                            <Col xs={2} className={styles.filterItem} key={uuidv4()}>
                                                <FilterData
                                                    key={uuidv4()}
                                                    idValue={criteria._id}
                                                    filterName={criteria.criteria_name}
                                                    field={criteria.criteria_key}
                                                    criteria_datatype={criteria.criteria_datatype}
                                                    filterValues={getSearchParams}
                                                />
                                            </Col>
                                        ))}
                                    </Form.Row>
                                </Form.Group>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>


                <Form.Row className={styles.paginationTools}>
                    <Col xs lg="2" className={styles.paginationShow}>
                        <Form.Label>Show: </Form.Label>
                        <Form.Control className="mb-2 mr-sm-2" as="select" name="paginationOptions" onChange={(e) => setPaginationLimit(e.target.value)}>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                            <option>200</option>
                            <option value="">Show All</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>{paginationLength} Items: </Form.Label>
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
                            {!viewDate && <th scope="col" field={FIELDS.DATE}>Date</th>}
                            {!viewMember && <th scope="col" field={FIELDS.USER}>User</th>}
                            {criteriaData.map((criteria) => (
                                <th scope="col" key={uuidv4()}>{criteria.criteria_name}</th>
                            ))}
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        { /* 
                        add sort below to be manipulated in the DOM?? not db/params
                        memberActivityData.sort((a, b) => (a > b) ? -1 : 1).map((data) =>
                         */}
                        {memberActivityData
                            .map((data) => (
                                <tr key={uuidv4()}>
                                    {!viewDate && <TrackingCellView
                                        key={uuidv4()}
                                        idValue={data._id}
                                        field={FIELDS.DATE}
                                        value={data.date}
                                        criteria_datatype="Date"
                                    />}
                                    {!viewMember && <TrackingCellView
                                        key={uuidv4()}
                                        idValue={data._id}
                                        field={FIELDS.USER}
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
                                        field={FIELDS.NOTES}
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
