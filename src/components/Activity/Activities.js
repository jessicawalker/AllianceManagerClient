import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Pagination, Alert, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import TrackingCellView from "./TrackingCellView";
import FilterData from './FilterData';
import styles from './activities.module.css';

export default function Activities() {
    const [memberData, setMemberData] = useState([{}]);    // members list
    const [criteriaData, setCriteriaData] = useState([{}]);    // tracking criteria list
    const [memberActivityData, setActivityData] = useState([{}]);  // master array each user
    const [paginationPage, setPaginationPage] = useState(1);  // master array each user
    const [paginationLimit, setPaginationLimit] = useState(20);  // master array each user
    const [searchParams, setSearchParams] = useState({page: paginationPage,
        limit: paginationLimit,});  // master array each user
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
    
    // read member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members-current',
            );
            setMemberData(result.data.members);
        };

        fetchData();
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
                    params: {page: paginationPage, limit: paginationLimit,}
                    //params: searchParams
                  }
            );
            setActivityData(result.data.results);
        };

        fetchData();
    //}, [searchParams, paginationPage, paginationLimit]);
    }, [paginationPage, paginationLimit]);
    return (
        <div className="navGap">
            <Form inline>
                <Form.Row>
                <Col xs={4}>
                    <FilterData 
                        filterName="Date" 
                        field="date" 
                        criteria_datatype="Date"
                    />
                    </Col>
                <Col xs={4}>
                    <FilterData 
                        filterName="Member" 
                        field="user" 
                        criteria_datatype="String"
                    /></Col>
                </Form.Row>
                
        <Form.Group>
                    {criteriaData.map((criteria) => (
                        <FilterData 
                            filterName={criteria.criteria_name} 
                            field={criteria.criteria_key} 
                            criteria_datatype={criteria.criteria_datatype}
                        />
                    ))}
        </Form.Group>
                <Form.Row>
                    
        <Col>
            <Pagination>
  <Pagination.First onClick={(e) => setPaginationPage(1)} />
  <Pagination.Prev onClick={(e) => setPaginationPage(paginationPage - 1)} />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item onClick={(e) => setPaginationPage(4)}>{4}</Pagination.Item>
  <Pagination.Item>{5}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next onClick={(e) => setPaginationPage(paginationPage + 1)} />
  <Pagination.Last />
</Pagination></Col>
        <Col xs lg="2">
<Form.Control className="mb-2 mr-sm-2" as="select" name="paginationOptions" onChange={(e) => setPaginationLimit(e.target.value)}>
<option>20</option>
<option>50</option>
<option>100</option>
<option>200</option>
<option value="">Show All</option>
</Form.Control></Col></Form.Row>
            </Form>

            <Table className="table" striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        {criteriaData.map((criteria) => (
                            <th key={Math.random()}>{criteria.criteria_name}</th>
                        ))}
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                {memberActivityData.map((data) => (
                    <tr key={Math.random()}>
                        <TrackingCellView
                            key={Math.random()}
                            idValue={data._id}
                            itemDate={data.date}
                            itemUser={data.user}
                            field="date"
                            value={new Date(data.date).toLocaleDateString('en-US', displayDate)}
                            criteria_datatype="Date"
                        />
                        <TrackingCellView
                            key={Math.random()}
                            idValue={data._id}
                            itemDate={data.date}
                            itemUser={data.user}
                            field="user"
                            value={data.user}
                            criteria_datatype="String"
                        />

                        {criteriaData.map((criteria) => (
                            <TrackingCellView
                                key={Math.random()}
                                idValue={data._id}
                                itemDate={data.date}
                                itemUser={data.user}
                                field={criteria.criteria_key}
                                criteria_datatype={criteria.criteria_datatype}
                            />))}

                        <TrackingCellView
                            key={Math.random()}
                            idValue={data._id}
                            itemDate={data.date}
                            itemUser={data.user}
                            field="notes"
                            value={data.notes}
                            criteria_datatype="String"
                        />
                    </tr>))}
                </tbody>
            </Table>
        </div>
    )
}
