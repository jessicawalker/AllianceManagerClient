import React, { useState, useRef } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import { useHistory } from 'react-router-dom';
//import RowCell from './RowCell';
import styles from './Row.module.css';

export default function RowTool(props) {
    const [rowType, setRowType] = useState(props.crudState);       // types: view, edit, create, delete
    const [memberUsername, setMemberUsername] = useState(props.username);
    const [memberRole, setMemberRole] = useState(props.memberRole);
    const [memberNotes, setMemberNotes] = useState(props.memberNotes);
    const [currentMember, setCurrentMember] = useState(props.currentMember);
    const [memberAddedDate, setMemberAddedDate] = useState(props.memberAddedDate);
    const [criteriaName, setCriteriaName] = useState(props.criteriaName);
    const [criteriaDatatype, setCriteriaDatatype] = useState(props.criteriaDatatype);
    const [entryId, setEntryId] = useState(props.idValue);
    const [dataDisplay, setDataDisplay] = useState(props.dataDisplay);
    let history = useHistory();

    // members
    const memberUsernameRef = useRef();
    const memberRoleRef = useRef();
    const memberNotesRef = useRef();
    const currentMemberRef = useRef();
    const memberAddedDateRef = useRef();

    // tracking criteria
    const criteriaNameRef = useRef();
    const criteriaDatatypeRef = useRef();

    // Cancel
    async function handleClickCancel(e) {
        e.preventDefault();
        if (rowType === "create") {
            setRowType("view");
        } else
        if (rowType === "edit" && dataDisplay === "MemberList") {
            setRowType("view");
            history.push('/members');
        } else
        if (rowType === "edit" && dataDisplay === "Criteria") {
            setRowType("view");
            history.push('/tracking-setup');
        }
    }

    async function handleClickUpdate(e) {
        e.preventDefault();
        setRowType("view");

        if (dataDisplay === "MemberList") {
            const enteredMemberUsername = memberUsernameRef.current.value;
            const enteredMemberRole = memberRoleRef.current.value;
            const enteredMemberNotes = memberNotesRef.current.value;

            setMemberUsername(enteredMemberUsername);
            setMemberRole(enteredMemberRole);
            setMemberNotes(enteredMemberNotes);
            //if (props.idValue.length > 0)
            //   {} //memberData._id;

            const updateMemberData = {
                _id: entryId,
                member_username: enteredMemberUsername,
                member_role: enteredMemberRole,
                member_notes: enteredMemberNotes,
                current_member: currentMember
            };
            await props.onUpdateData(updateMemberData);
        } else
            if (dataDisplay === "Criteria") {
                const enteredCriteriaName = criteriaNameRef.current.value;
                const enteredCriteriaDatatype = criteriaDatatypeRef.current.value;
                //const currentId = entryId;

                setCriteriaName(enteredCriteriaName);
                setCriteriaDatatype(enteredCriteriaDatatype);
                //if (props.idValue.length > 0)
                //   {} //memberData._id;

                const updateCriteriaData = {
                    _id: entryId,
                    criteria_name: enteredCriteriaName,
                    criteria_datatype: enteredCriteriaDatatype
                };
                await props.onUpdateData(updateCriteriaData);
            }
    }

    async function handleClickAdd(e) {
        e.preventDefault();
        setRowType("view");

        if (dataDisplay === "MemberList") {
            //if (props.idValue.length > 0)
            //   {} //memberData._id;

            const newMemberData = {
                member_username: memberUsername,
                member_role: memberRole,
                member_notes: memberNotes,
                current_member: currentMember
            };

            await props.onSaveData(newMemberData);
        } else
            if (dataDisplay === "Criteria") {

                //if (props.idValue.length > 0)
                //   {} //memberData._id;

                const newCriteriaData = {
                    criteria_name: criteriaName,
                    criteria_datatype: criteriaDatatype
                };
                await props.onSaveData(newCriteriaData);
            }
    }

    async function handleClickDelete(e) {
        e.preventDefault();
        setRowType("view");
        await props.onDeleteData(entryId);
    }

    return (

        <tr className="align-middle border-top border-bottom">
            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberUsername} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" required defaultValue={memberUsername} ref={memberUsernameRef} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberUsername" label="Username" onChange={(e) => setMemberUsername(e.target.value)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberRole} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" defaultValue={memberRole} ref={memberRoleRef} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberRole" label="Role" onChange={(e) => setMemberRole(e.target.value)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberNotes} /></td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" defaultValue={memberNotes} ref={memberNotesRef} /></td>}
            {props.dataDisplay === "MemberList" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberNotes" label="Notes" onChange={(e) => setMemberNotes(e.target.value)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={currentMember ? "Yes" : "No"} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" &&
                <td>
                    <Form.Check inline id="edit-current" label="Current" checked={currentMember} onChange={() => setCurrentMember(!currentMember)} ref={currentMemberRef} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" &&
                <td>
                    <Form.Check id="create-current" label="Current" defaultChecked={currentMember} onChange={() => setCurrentMember(!currentMember)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberAddedDate} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberAddedDate} ref={memberAddedDateRef} />
                </td>}


            {props.dataDisplay === "Criteria" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={criteriaName} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" defaultValue={criteriaName} ref={criteriaNameRef} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingCriteriaName" label="Criteria Name" onChange={(e) => setCriteriaName(e.target.value)} />
                </td>}

            {props.dataDisplay === "Criteria" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={criteriaDatatype} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "edit" &&
                <td><Form.Control as="select" ref={criteriaDatatypeRef} defaultValue={criteriaDatatype}>
                    <option>Boolean</option>
                    <option>String</option>
                    <option>Number</option>
                    <option>Date</option>
                </Form.Control></td>}

            {props.dataDisplay === "Criteria" && rowType === "create" &&
                <td><Form.Control as="select" onChange={(e) => setCriteriaDatatype(e.target.value)}>
                    <option>Boolean</option>
                    <option>String</option>
                    <option>Number</option>
                    <option>Date</option>
                </Form.Control></td>}

            {rowType === "view" &&
                <td className="text-center">
                    <Button onClick={() => setRowType("edit")}>Edit</Button>
                </td>}
            {rowType === "edit" &&
                <td className="text-center">
                    <Button type="submit" onClick={handleClickUpdate}>Save</Button>
                </td>}

            {rowType === "view" &&
                <td className="text-center">
                    <Button type="submit" variant="danger" onClick={handleClickDelete}>Delete</Button>
                </td>}

            {rowType === "create" &&
                <td className="text-center">
                    <Button type="submit" onClick={handleClickAdd}>Add</Button>
                </td>}

            {rowType === "create" &&
                <td className="text-center">
                    <Button type="submit" variant="danger" onClick={props.onCancelData}>Cancel</Button>
                </td>}

            {rowType === "edit" &&
                <td className="text-center">
                    <Button type="submit" variant="danger" onClick={handleClickCancel}>Cancel</Button>
                </td>}
        </tr>
    )
}