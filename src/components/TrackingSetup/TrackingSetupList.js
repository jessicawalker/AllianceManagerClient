import React from 'react';
import { Table, Form } from "react-bootstrap";
import RowTool from '../Row/RowTool';
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackingSetup.module.css';

export default function TrackingSetupList(props) {

    return (
        <Form>
        <Table className="table" striped bordered hover responsive="md">
            <thead className="thead-dark">
                <tr>
                    <th>Criteria Name</th>
                    <th>Criteria Datatype</th>
                    <th colSpan="2"></th>
                </tr>
            </thead>
            <tbody>
                {props.allData.map((criteria) => (<RowTool key={uuidv4()}
                    idValue={criteria._id}
                    dataDisplay="Criteria"
                    criteriaName={criteria.criteria_name}
                    criteriaDatatype={criteria.criteria_datatype}
                    crudState="view"
                    onUpdateData={props.onUpdateData}
                    onDeleteData={props.onDeleteData}
                />
                ))}
            </tbody>

        </Table>
    </Form>
    )
}
