import React, { useState } from 'react';
import { Button, Table, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './Row.module.css';

export default function RowAdd(props) {
    const [rowType, setRowType] = useState(props.crudState); 
    const [sectionType, setSectionType] = useState(props.dataDisplay);
    const [sectionName, setSectionName] = useState(props.addType);
    let history = useHistory();

    // Removes add item form, sends data up to be processed
    const addDataHandler = async (newDataRow) => {
        setRowType("view");
        props.onAddData(newDataRow);
    }

    // Cancel add
    async function handleClickCancel(e) {
        e.preventDefault();
        setRowType("view");

        if (sectionType==="MemberList"){
            history.push('/members');
        } else
        if (sectionType==="Criteria"){
            history.push('/tracking-setup');
        }
    }

    // Show add item form
    async function handleSubmit(e) {
        e.preventDefault();
        setSectionType(sectionType);
        setRowType("create");
    }

    return (
        <Form onSubmit={handleSubmit}>
            {rowType === "create" && (
                <Table className="table addRowTool" responsive="md">
                    <tbody>
                        <RowTool 
                            crudState={rowType} 
                            dataDisplay={sectionType} 
                            onSaveData={addDataHandler} 
                            onCancelData={handleClickCancel} 
                            currentMember={true} 
                            criteriaDatatype="Boolean" />
                    </tbody>
                </Table>)
            }

            
                <div className={styles.addSection}>
                    <Button type="submit">Add New {sectionName}</Button>
                </div>
        </Form>
    )
}
