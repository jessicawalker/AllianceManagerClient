import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DeleteModal from '../DeleteModal';
import axios from "../../axios";
import styles from './Row.module.css';

export default function RowTool(props) {
    // this component represents one row, which can be reused to create a full table
    const [rowType, setRowType] = useState(props.crudState);       // types: view, edit, create, delete
    const [memberUsername, setMemberUsername] = useState(props.username);
    const [memberRole, setMemberRole] = useState(props.memberRole);
    const [memberNotes, setMemberNotes] = useState(props.memberNotes);
    const [currentMember, setCurrentMember] = useState(props.currentMember);
    const [memberAddedDate, setMemberAddedDate] = useState(props.memberAddedDate);
    const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false);
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false);

    const [criteriaName, setCriteriaName] = useState(props.criteriaName);
    const [criteriaDatatype, setCriteriaDatatype] = useState(props.criteriaDatatype);
    const [enteredCriteriaNameIsValid, setEnteredCriteriaNameIsValid] = useState(false);
    const [enteredCriteriaNameTouched, setEnteredCriteriaNameTouched] = useState(false);

    const [entryId, setEntryId] = useState(props.idValue);
    const [dataDisplay, setDataDisplay] = useState(props.dataDisplay);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let history = useHistory();
    const { currentUser } = useAuth();
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

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

        if (dataDisplay === "MemberList") {
            const enteredMemberUsername = memberUsernameRef.current.value;
            const enteredMemberRole = memberRoleRef.current.value;
            const enteredMemberNotes = memberNotesRef.current.value;

            setEnteredUsernameTouched(true);

            if (enteredMemberUsername === "") {
                setEnteredUsernameIsValid(false);
                return
            }

            setMemberUsername(enteredMemberUsername);
            setMemberRole(enteredMemberRole);
            setMemberNotes(enteredMemberNotes);

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

                setEnteredCriteriaNameTouched(true);

                if (enteredCriteriaName === "") {
                    setEnteredCriteriaNameIsValid(false);
                    return
                }

                setCriteriaName(enteredCriteriaName);
                setCriteriaDatatype(enteredCriteriaDatatype);

                const updateCriteriaData = {
                    _id: entryId,
                    criteria_name: enteredCriteriaName,
                    criteria_datatype: enteredCriteriaDatatype
                };
                await props.onUpdateData(updateCriteriaData);
            }
        setRowType("view");
    }

    function handleClickAdd(e) {
        e.preventDefault();

        if (dataDisplay === "MemberList") {
            setEnteredUsernameTouched(true);

            if (memberUsername === "") {
                setEnteredUsernameIsValid(false);
                return
            }

            const newMemberData = {
                member_username: memberUsername,
                member_role: memberRole,
                member_notes: memberNotes,
                current_member: currentMember
            };

            props.onSaveData(newMemberData);
        }
        else if (dataDisplay === "Criteria") {
            setEnteredCriteriaNameTouched(true);

            if (criteriaName === "") {
                setEnteredCriteriaNameIsValid(false);
                return
            }

            const newCriteriaData = {
                criteria_name: criteriaName,
                criteria_datatype: criteriaDatatype
            };
            props.onSaveData(newCriteriaData);
        };

    }

    function handleClickDelete(willDelete) {
        if (willDelete === true) {
            props.onDeleteData(entryId);
        } else {
            setShowDeleteModal(true); // show delete modal
        }
    }

    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;
    const criteriaNameInputIsInvalid = !enteredCriteriaNameIsValid && enteredCriteriaNameTouched;

    return (

        <tr className="align-middle border-top border-bottom">
            <DeleteModal
                show={showDeleteModal}
                animation={false}
                onHide={() => setShowDeleteModal(false)}
                onDelete={() => { handleClickDelete(true); setShowDeleteModal(false); }}
            />
            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberUsername} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" && currentUser &&
                <td>
                    <Form.Control type="text" required defaultValue={memberUsername} ref={memberUsernameRef} isInvalid={usernameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Member username must not be empty.
                    </Form.Control.Feedback>
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" && currentUser &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberUsername" label="Username" onChange={(e) => setMemberUsername(e.target.value)} isInvalid={usernameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Member username must not be empty.
                    </Form.Control.Feedback>
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberRole} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" && currentUser &&
                <td>
                    <Form.Control type="text" defaultValue={memberRole} ref={memberRoleRef} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" && currentUser &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberRole" label="Role" onChange={(e) => setMemberRole(e.target.value)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={memberNotes} /></td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" && currentUser &&
                <td>
                    <Form.Control type="text" defaultValue={memberNotes} ref={memberNotesRef} /></td>}
            {props.dataDisplay === "MemberList" && rowType === "create" && currentUser &&
                <td>
                    <FloatingLabel type="text" id="floatingMemberNotes" label="Notes" onChange={(e) => setMemberNotes(e.target.value)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={currentMember ? "Yes" : "No"} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" && currentUser &&
                <td>
                    <Form.Check inline id="edit-current" label="Current" checked={currentMember} onChange={() => setCurrentMember(!currentMember)} ref={currentMemberRef} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "create" && currentUser &&
                <td>
                    <Form.Check id="create-current" label="Current" defaultChecked={currentMember} onChange={() => setCurrentMember(!currentMember)} />
                </td>}

            {props.dataDisplay === "MemberList" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={new Date(memberAddedDate).toLocaleDateString('en-US', displayDate)} />
                </td>}
            {props.dataDisplay === "MemberList" && rowType === "edit" && currentUser &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={new Date(memberAddedDate).toLocaleDateString('en-US', displayDate)} ref={memberAddedDateRef} />
                </td>}


            {props.dataDisplay === "Criteria" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={criteriaName} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" defaultValue={criteriaName} ref={criteriaNameRef} isInvalid={criteriaNameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Criteria name must not be empty.
                    </Form.Control.Feedback>
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingCriteriaName" label="Criteria Name" onChange={(e) => setCriteriaName(e.target.value)} isInvalid={criteriaNameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Criteria name must not be empty.
                    </Form.Control.Feedback>
                </td>}

            {props.dataDisplay === "Criteria" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={criteriaDatatype} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "edit" &&
                <td><Form.Control as="select" ref={criteriaDatatypeRef} defaultValue={criteriaDatatype}>
                    <option>Yes/No</option>
                    <option>Text</option>
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

            {rowType === "view" && currentUser &&
                <td className="text-center">
                    <Button onClick={() => setRowType("edit")}>Edit</Button>
                </td>}
            {rowType === "edit" && currentUser &&
                <td className="text-center">
                    <Button type="submit" onClick={handleClickUpdate}>Save</Button>
                </td>}

            {rowType === "view" && currentUser &&
                <td className="text-center">
                    <Button variant="danger" onClick={handleClickDelete}>Delete</Button>
                </td>}

            {rowType === "create" && currentUser &&
                <td className="text-center">
                    <Button type="submit" onClick={handleClickAdd}>Add</Button>
                </td>}

            {rowType === "create" && currentUser &&
                <td className="text-center">
                    <Button type="submit" variant="danger" onClick={props.onCancelData}>Cancel</Button>
                </td>}

            {rowType === "edit" && currentUser &&
                <td className="text-center">
                    <Button type="submit" variant="danger" onClick={handleClickCancel}>Cancel</Button>
                </td>}

        </tr>
    )
}