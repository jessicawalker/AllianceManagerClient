import React, { useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './Row.module.css';

export default function RowAdd(props) {
    const [rowType, setRowType] = useState(props.crudState); 
    const [sectionType, setSectionType] = useState(props.dataDisplay);
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
        if (sectionType==="MemberList"){
            history.push('/members');
        } else
        if (sectionType==="Criteria"){
            history.push('/tracking-setup');
        }
    setRowType("view");
    }

    return (
        <>
            {rowType === "create" && (
                <Table className="table addRowTool" responsive="md">
                    <tbody>
                        <RowTool 
                            crudState="create" 
                            dataDisplay={sectionType} 
                            onSaveData={addDataHandler} 
                            onCancelData={handleClickCancel} 
                            currentMember={true} 
                            criteriaDatatype="Boolean" />
                    </tbody>
                </Table>)
            }
            {rowType === "view" && (
                <div className={styles.addSection}>
                    <Button onClick={() => {
                        setSectionType(props.dataDisplay);
                        setRowType("create");
                        }
                    }>Add New {props.addType}</Button>
                </div>)}
        </>
    )
}
