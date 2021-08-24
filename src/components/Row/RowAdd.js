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

    const addDataHandler = async (newDataRow) => {

        setRowType("view");
        props.onAddData(newDataRow);

        if (sectionType === "Criteria") {
            const enteredCriteriaName = newDataRow.criteria_name;
            const enteredCriteriaDatatype = newDataRow.criteria_datatype;

            if (enteredCriteriaName === "") {
                <Form.Text muted>
                    Criteria name must not be empty.
                </Form.Text>
                return
            }

            await axios.post('/trackingcriteria-add', {
                criteria_name: enteredCriteriaName,
                criteria_datatype: enteredCriteriaDatatype
            })
                .then(function (response) {
                    console.log(response);
                    //setRowType("view");
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        //await setRowType("view");
    }

    // Cancel Add
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
