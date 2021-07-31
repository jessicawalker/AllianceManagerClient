import React, { useState, useRef } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import { useHistory } from 'react-router-dom';
import RowCellCreate from './RowCellCreate';
import RowCellEdit from './RowCellEdit';
import RowCellView from './RowCellView';
import styles from './Row.module.css'; 

export default function RowCell(props) {
    const [memberUsername, setMemberUsername] = useState(props.username);
    const [memberRole, setMemberRole] = useState(props.memberRole);
    const [memberNotes, setMemberNotes] = useState(props.memberNotes);
    const [currentMember, setCurrentMember] = useState(props.currentMember);
    const [memberAddedDate, setMemberAddedDate] = useState(props.memberAddedDate);
    const [criteriaName, setCriteriaName] = useState(props.criteriaName);
    const [criteriaDatatype, setCriteriaDatatype] = useState(props.criteriaDatatype);

    // current
    const memberUsernameRef = useRef();
    const memberRoleRef = useRef();
    const memberNotesRef = useRef();
    const currentMemberRef = useRef();
    const memberAddedDateRef = useRef();

    // current
    const criteriaNameRef = useRef();
    const criteriaDatatypeRef = useRef();
    /*
            <RowCellView dataDisplay="MemberList" field="memberUsername" />
            <RowCellEdit dataDisplay="MemberList" field="memberUsername" />
            <RowCellCreate dataDisplay="MemberList" field="memberUsername" />
            <RowCellView dataDisplay="MemberList" field="memberRole" />
            <RowCellEdit dataDisplay="MemberList" field="memberRole" />
            <RowCellCreate dataDisplay="MemberList" field="memberRole" />
            <RowCellView dataDisplay="MemberList" field="memberNotes" />
            <RowCellEdit dataDisplay="MemberList" field="memberNotes" />
            <RowCellCreate dataDisplay="MemberList" field="memberNotes" />
            <RowCellView dataDisplay="MemberList" field="currentMember" />
            <RowCellEdit dataDisplay="MemberList" field="currentMember" />
            <RowCellCreate dataDisplay="MemberList" field="currentMember" />
            <RowCellView dataDisplay="MemberList" field="memberAddedDate" />
            <RowCellEdit dataDisplay="MemberList" field="memberAddedDate" />
            <RowCellView dataDisplay="Criteria" field="criteriaName" />
            <RowCellEdit dataDisplay="Criteria" field="criteriaName" />
            <RowCellCreate dataDisplay="Criteria" field="criteriaName" />
            <RowCellView dataDisplay="Criteria" field="criteriaDatatype" />
            <RowCellEdit dataDisplay="Criteria" field="criteriaDatatype" />
            <RowCellCreate dataDisplay="Criteria" field="criteriaDatatype" />
    */
    return (
        <td>
            {props.dataDisplay==="MemberList" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={memberUsername} />}
            {props.dataDisplay==="MemberList" && props.rowType==="edit" && <Form.Control type="text" required defaultValue={memberUsername} ref={memberUsernameRef} />}
            {props.dataDisplay==="MemberList" && props.rowType==="create" && 
                <FloatingLabel type="text" id="floatingMemberUsername" label="Username" onChange={(e) => setMemberUsername(e.target.value)} />
            }

            {props.dataDisplay==="MemberList" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={memberRole} />}
            {props.dataDisplay==="MemberList" && props.rowType==="edit" && <Form.Control type="text" defaultValue={memberRole} ref={memberRoleRef} />}
            {props.dataDisplay==="MemberList" && props.rowType==="create" && 
                <FloatingLabel type="text" id="floatingMemberRole" label="Role" onChange={(e) => setMemberRole(e.target.value)} />
            }

            {props.dataDisplay==="MemberList" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={memberNotes} />}
            {props.dataDisplay==="MemberList" && props.rowType==="edit" && <Form.Control type="text" defaultValue={memberNotes} ref={memberNotesRef} />}
            {props.dataDisplay==="MemberList" && props.rowType==="create" && 
                <FloatingLabel type="text" id="floatingMemberNotes" label="Notes" onChange={(e) => setMemberNotes(e.target.value)} />
            }

            {props.dataDisplay==="MemberList" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={currentMember ? "Yes" : "No"} />}
            {props.dataDisplay==="MemberList" && props.rowType==="edit" && <Form.Check inline id="edit-current" label="Current" checked={currentMember} onChange={() => setCurrentMember(!currentMember)} ref={currentMemberRef} />}
            {props.dataDisplay==="MemberList" && props.rowType==="create" && 
                <Form.Check id="create-current" label="Current" defaultChecked={currentMember} onChange={() => setCurrentMember(!currentMember)} />
            }

            {props.dataDisplay==="MemberList" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={memberAddedDate} />}
            {props.dataDisplay==="MemberList" && props.rowType==="edit" && <Form.Control plaintext readOnly defaultValue={memberAddedDate} ref={memberAddedDateRef} />}


            {props.dataDisplay==="Criteria" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={criteriaName} />}
            {props.dataDisplay==="Criteria" && props.rowType==="edit" && <Form.Control type="text" defaultValue={criteriaName} ref={criteriaNameRef} />}
            {props.dataDisplay==="Criteria" && props.rowType==="create" && 
                    <FloatingLabel type="text" id="floatingCriteriaName" label="Criteria Name" onChange={(e) => setCriteriaName(e.target.value)} />
                }

            {props.dataDisplay==="Criteria" && props.rowType==="view" && <Form.Control plaintext readOnly defaultValue={criteriaDatatype} />}
            {props.dataDisplay==="Criteria" && props.rowType==="edit" && <Form.Control as="select" ref={criteriaDatatypeRef} defaultValue={criteriaDatatype}><option>Boolean</option><option>String</option><option>Number</option><option>Date</option></Form.Control>}
            {props.dataDisplay==="Criteria" && props.rowType==="create" && 
                    <Form.Control as="select" onChange={(e) => setCriteriaDatatype(e.target.value)}>
                        <option>Boolean</option>
                        <option>String</option>
                        <option>Number</option>
                        <option>Date</option>
                    </Form.Control>}
            </td>
    )
}
