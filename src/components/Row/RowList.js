import React, { useState, useEffect } from 'react';
import { Table, Form } from "react-bootstrap";
import RowTool from './RowTool';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import styles from './Row.module.css';

// props.listName = h3
// props.allColumnHeads = array with th values
// props.rowData = generates the RowTool components

export default function RowList(props) {
    return (
        <Form>
            <h3>{props.listName}</h3>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        {props.allColumnHeads.map((heading) => (
                            <th key={uuidv4()}>{heading}</th>
                        ))}
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.rowData}
                </tbody>
            </Table>
        </Form>
    )
}
