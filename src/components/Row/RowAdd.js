import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormCheck, Switch, Button, Table, Card, Alert } from "react-bootstrap";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './Row.module.css';

export default function RowAdd(props) {
    const [viewType, setViewType] = useState(false);
    const [sectionType, setSectionType] = useState();
    let history = useHistory();

    const updateVisibility = (boolean) => {
        setViewType(boolean);
    };

    

    const addDataHandler = async (newDataRow) => {
        if (props.dataDisplay === "MemberList") {
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
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        if (props.dataDisplay === "Criteria") {
            const enteredCriteriaName = newDataRow.criteria_name;
            const enteredCriteriaDatatype = newDataRow.criteria_datatype;

            await axios.post('/trackingcriteria-add', {
                criteria_name: enteredCriteriaName,
                criteria_datatype: enteredCriteriaDatatype
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
    }

    return (
        <>
            {viewType && (<Table className="table addRowTool" responsive="md"><tbody><RowTool crudState="create" dataDisplay={sectionType} onSaveData={addDataHandler} showAdd={updateVisibility} currentMember={true} criteriaDatatype="Boolean" /></tbody></Table>)}
            <div className={styles.addSection}>
                <Button onClick={() => {
                    setViewType(true);
                    setSectionType(props.dataDisplay);
                }
                }>Add New {props.addType}</Button>
            </div>
        </>
    )
}
