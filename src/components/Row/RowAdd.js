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
        if (sectionType === "MemberList") {
            const enteredMemberUsername = newDataRow.member_username;
            const enteredMemberRole = newDataRow.member_role;
            const enteredMemberNotes = newDataRow.member_notes;
            const enteredCurrentMember = newDataRow.current_member;

            await axios.post('/members-add', {
                member_username: enteredMemberUsername,
                member_role: enteredMemberRole,
                member_notes: enteredMemberNotes,
                current_member: enteredCurrentMember
            })
                .then(function (response) {
                    console.log(response);
                    setRowType("view");
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        } else
        if (sectionType === "Criteria") {
            const enteredCriteriaName = newDataRow.criteria_name;
            const enteredCriteriaDatatype = newDataRow.criteria_datatype;

            await axios.post('/trackingcriteria-add', {
                criteria_name: enteredCriteriaName,
                criteria_datatype: enteredCriteriaDatatype
            })
                .then(function (response) {
                    console.log(response);
                    setRowType("view");
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }

    // Cancel Add
    async function handleClickCancel(e) {
        e.preventDefault();
        setRowType("");

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
