import React, { useState, useEffect } from 'react';
import { Table, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackingSetup.module.css';



/*if (props.members.length === 0) {
    return  (
        <div>
            <p>No members</p>
        </div>
    )
}*/

export default function TrackingSetupList(props) {
    const [criteriaData, setCriteriaData] = useState([{}]);
    let history = useHistory();

    // read criteria data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();
    }, [criteriaData]);
/*
    const viewDataHandler = async () => {
        await axios.get(`/trackingcriteria`)
            .then(function (response) {
                console.log(response);
                history.push('/tracking-setup');
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };*/

    const updateDataHandler = async (updateCriteriaData) => {
        const currentId = updateCriteriaData._id;
        const enteredCriteriaName = updateCriteriaData.criteria_name;
        const enteredCriteriaDatatype = updateCriteriaData.criteria_datatype;

            //const updateData = async () => {
                await axios.put(`/trackingcriteria-update/${currentId}`, {
                    criteria_name: enteredCriteriaName,
                    criteria_datatype: enteredCriteriaDatatype
                }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(function (response) {
                        console.log(response);
                        history.push('/tracking-setup');
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
    };

    const deleteDataHandler = async (id) => {
        await axios.delete(`/trackingcriteria-delete/${id}`)
            .then(function (response) {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios(
                        '/trackingcriteria',
                    );
                    setCriteriaData(result.data.results);
                };
        
                fetchData();
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
        <Table className="table" striped bordered hover responsive="md">
            <thead className="thead-dark">
                <tr>
                    <th>Criteria Name</th>
                    <th>Criteria Datatype</th>
                    <th colSpan="2"></th>
                </tr>
            </thead>
            <tbody>
                {criteriaData.map((criteria) => (<RowTool key={uuidv4()}
                    idValue={criteria._id}
                    dataDisplay="Criteria"
                    criteriaName={criteria.criteria_name}
                    criteriaDatatype={criteria.criteria_datatype}
                    crudState="view"
                    onUpdateData={updateDataHandler}
                    onDeleteData={deleteDataHandler}
                />
                ))}
            </tbody>

        </Table>
    </Form>
    )
}
