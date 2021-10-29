import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DeleteModal from '../DeleteModal';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';
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
    const [activityName, setActivityName] = useState(props.activityName);
    const [enteredCriteriaNameIsValid, setEnteredCriteriaNameIsValid] = useState(false);
    const [enteredCriteriaNameTouched, setEnteredCriteriaNameTouched] = useState(false);

    const [allActivities, setAllActivities] = useState(props.activitiesList);
    const [logType, setLogType] = useState(props.logType);
    const [enteredActivityNameIsValid, setEnteredActivityNameIsValid] = useState(false);
    const [enteredActivityNameTouched, setEnteredActivityNameTouched] = useState(false);

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
    const activityNameRef = useRef();
    const logTypeRef = useRef();

    const datatypeOptions = [
        {display_name: "Yes/No", db_name: "Boolean"},
        {display_name: "Text", db_name: "String"},
        {display_name: "Number", db_name: "Number"},
        {display_name: "Date", db_name: "Date"}
        /*{"display_name": "Yes/No", "db_name": "Boolean"},
        {"display_name": "Yes/No", "db_name": "Boolean"},
        {"display_name": "Yes/No", "db_name": "Boolean"},
        {"display_name": "Yes/No", "db_name": "Boolean"}*/
    ]

    // TODO - fix format of member added date to match activity logs date format
    // TODO - update backend to handle date edits


    // Cancel
    async function handleClickCancel(e) {
        e.preventDefault();
        setRowType("view");
        
        if (rowType === "edit" && dataDisplay === "MemberList") {
            history.push('/members');
        } else
        if (rowType === "edit" && (dataDisplay === "Criteria" || dataDisplay === "Activity")) {
            history.push('/tracking-setup');
        }
    }

    async function handleClickUpdate(e) {
        e.preventDefault();

        if (dataDisplay === "MemberList") {
            const enteredMemberUsername = memberUsernameRef.current.value;
            const enteredMemberRole = memberRoleRef.current.value;
            const enteredMemberNotes = memberNotesRef.current.value;
            const enteredMemberAddedDate = memberAddedDateRef.current.value;

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
                current_member: currentMember,
                member_added_date: enteredMemberAddedDate
            };
            await props.onUpdateData(updateMemberData);
        } else
            if (dataDisplay === "Criteria") {
                const enteredCriteriaName = criteriaNameRef.current.value;
                const enteredCriteriaDatatype = criteriaDatatypeRef.current.value;
                const enteredActivityName = activityNameRef.current.value;

                setEnteredCriteriaNameTouched(true);
                setEnteredActivityNameTouched(true);

                if (enteredCriteriaName === "") {
                    setEnteredCriteriaNameIsValid(false);
                    return
                }

                if (enteredActivityName === "") {
                    setEnteredActivityNameIsValid(false);
                    return
                }

                setCriteriaName(enteredCriteriaName);
                setCriteriaDatatype(enteredCriteriaDatatype);
                setActivityName(enteredActivityName);

                const updateCriteriaData = {
                    _id: entryId,
                    criteria_name: enteredCriteriaName,
                    criteria_datatype: enteredCriteriaDatatype,
                    activity_name: enteredActivityName,
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
            setEnteredActivityNameTouched(true);

            if (criteriaName === "") {
                setEnteredCriteriaNameIsValid(false);
                setEnteredActivityNameIsValid(false);
                return
            }

            const newCriteriaData = {
                criteria_name: criteriaName,
                criteria_datatype: criteriaDatatype,
                activity_name: activityName
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
    const activityNameInputIsInvalid = !enteredActivityNameIsValid && enteredActivityNameTouched;

    // TODO - have date input with default value show that value in the calendar

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
                    <Form.Control type="date" defaultValue={new Date(memberAddedDate).toLocaleDateString('en-US', displayDate)} ref={memberAddedDateRef} />
                </td>}


            {props.dataDisplay === "Criteria" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={activityName} />
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "edit" &&
                <td>
                    <Form.Control as="select" ref={activityNameRef} defaultValue={activityName}>
                        {props.activitiesList.sort((a, b) => (a > b) ? -1 : 1).map(
                            (item) =>
                            <option key={uuidv4()} value={item.activity_name}>
                                {item.activity_name}
                            </option>)}
                    </Form.Control>
                </td>}
            {props.dataDisplay === "Criteria" && rowType === "create" &&
                <td>
                    <Form.Control as="select" onChange={(e) => setActivityName(e.target.value)}>
                        {props.activitiesList.sort((a, b) => (a > b) ? -1 : 1).map(
                            (item) =>
                            <option key={uuidv4()} value={item.activity_name}>
                                {item.activity_name}
                            </option>)}
                    </Form.Control>
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
                    <option value="Boolean">Yes/No</option>
                    <option value="String">Text</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>
                </Form.Control></td>}

            {props.dataDisplay === "Criteria" && rowType === "create" &&
                <td><Form.Control as="select" onChange={(e) => setCriteriaDatatype(e.target.value)}>
                    <option value="Boolean">Yes/No</option>
                    <option value="String">Text</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>

                    {/* {datatypeOptions.map(
                            (item) =>
                            <option key={uuidv4()} value={item.db_name}>
                                {item.display_name}
                            </option>)}*/}
                            
                    </Form.Control></td>} 

            {props.dataDisplay === "Activity" && rowType === "view" &&
                <td>
                    <Form.Control plaintext readOnly defaultValue={activityName} />
                </td>}
            {props.dataDisplay === "Activity" && rowType === "edit" &&
                <td>
                    <Form.Control type="text" defaultValue={activityName} ref={activityNameRef} isInvalid={activityNameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Activity name must not be empty.
                    </Form.Control.Feedback>
                </td>}
            {props.dataDisplay === "Activity" && rowType === "create" &&
                <td>
                    <FloatingLabel type="text" id="floatingActivityName" label="Activity Name" onChange={(e) => setActivityName(e.target.value)} isInvalid={activityNameInputIsInvalid} />
                    <Form.Control.Feedback type="invalid">
                        Activity name must not be empty.
                    </Form.Control.Feedback>
                </td>}

                {props.dataDisplay === "Activity" && rowType === "view" &&
                    <td>
                        <Form.Control plaintext readOnly defaultValue={logType} />
                    </td>}
                {props.dataDisplay === "Activity" && rowType === "edit" &&
                    <td>
                        <Form.Control as="select" ref={logTypeRef} defaultValue={logType}>
                            <option>Daily Report</option>
                            <option>Summary Report</option>
                            <option>On-Going Log</option>
                        </Form.Control>
                    </td>}
                {props.dataDisplay === "Activity" && rowType === "create" &&
                    <td>
                        <Form.Control as="select" onChange={(e) => setLogType(e.target.value)}>
                            <option>Daily Report</option>
                            <option>Summary Report</option>
                            <option>On-Going Log</option>
                        </Form.Control>
                    </td>}

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