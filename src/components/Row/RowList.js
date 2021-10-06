import React, { useState, useEffect } from 'react';
import { Table, Form } from "react-bootstrap";
import RowTool from './RowTool';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Row.module.css';

// props.allColumnHeads = array with th values
// props.rowData = generates the RowTool components

export default function RowList(props) {
    const { currentUser } = useAuth();
    return (
        <Form>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        {props.allColumnHeads.map((heading) => (
                            <th key={uuidv4()}>{heading}</th>
                        ))}
                        {currentUser && <th colSpan="2"></th>}
                    </tr>
                </thead>
                <tbody>
                    {props.rowData}
                </tbody>
            </Table>
        </Form>
    )
}
