import React, { useRef, useState, useEffect } from 'react';
import { Table, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
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
    const [criteriaDataRow, setCriteriaDataRow] = useState({});
    let history = useHistory();

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();
    }, [criteriaDataRow]);
/*
    const getData = () => {
        axios.get('/trackingcriteria')
            .then((getData) => {

            })
    }*/

        const updateDataHandler = async (updateCriteriaData) => {
            setCriteriaDataRow(updateCriteriaData);
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
                //updateData(currentId);
        //};

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

        // onSubmit, update the form data
        async function handleSubmit(e) {
            e.preventDefault();
            console.log(criteriaDataRow);
            console.log(criteriaDataRow.id);
            console.log({
                criteria_name: criteriaDataRow.criteria_name,
                criteria_datatype: criteriaDataRow.member_added_date
            });
    
    
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
                    {criteriaData.map((criteria) => (<RowTool key={criteria._id}
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
