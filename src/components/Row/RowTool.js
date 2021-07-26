import React, { useState } from 'react';
import { Form, FormCheck, Button, Card, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import Switch from "react-switch";
import { Link, useHistory } from 'react-router-dom';
import styles from './Row.module.css'; 

export default function RowTool(props) {
    const [rowType, setRowType] = useState(props.crudState);     // types: view, edit, create, delete
    //const [checked, setChecked] = useState(true);


    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
            // click and drag on outer left
            // name, with two states:
            //      1) viewed
            //      2) input field to edit
            // if page = members, also includes:
            //      1) role text field 
            //      2) notes text field
            //      3) current members checkbox 
            // if page = make tracking criteria, also include:
            //      1) data type dropdown 
            // edit, remove, add buttons to the right
            // <td class="form-check form-switch">
            //      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            //      <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            // </td>

        <tr className="align-middle border-top border-bottom">
            {props.dataDisplay==="MemberList" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.username} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><Form.Control type="text" required defaultValue={props.username} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><FloatingLabel controlId="floatingMemberUsername" label="Username"><Form.Control type="text" placeholder="Username" required /></FloatingLabel></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.memberRole} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><Form.Control type="text" defaultValue={props.memberRole} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><FloatingLabel controlId="floatingMemberRole" label="Role"><Form.Control type="text" placeholder="Role" /></FloatingLabel></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.memberNotes} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><Form.Control type="text" defaultValue={props.memberNotes} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><FloatingLabel controlId="floatingMemberNotes" label="Notes"><Form.Control type="text" placeholder="Notes" /></FloatingLabel></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.currentMember ? "Yes" : "No"} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><Form.Check inline id="edit-current" label="Current" checked={props.currentMember} onChange={console.log("To Do")} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><Form.Check id="create-current" label="Current" /></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.memberAddedDate} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><Form.Control plaintext readOnly defaultValue={props.memberAddedDate} /></td>}


            {props.dataDisplay==="Criteria" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.criteriaName} /></td>}
            {props.dataDisplay==="Criteria" && rowType==="edit" && <td><Form.Control type="text" defaultValue={props.criteriaName} /></td>}
            {props.dataDisplay==="Criteria" && rowType==="create" && <td><FloatingLabel controlId="floatingCriteriaName" label="Criteria Name"><Form.Control type="text" placeholder="Criteria Name" /></FloatingLabel></td>}

            {props.dataDisplay==="Criteria" && rowType==="view" && <td><Form.Control plaintext readOnly defaultValue={props.criteriaDatatype} /></td>}
            {props.dataDisplay==="Criteria" && rowType==="edit" && <td><Form.Control as="select" defaultValue={props.criteriaDatatype}><option>Boolean</option><option>String</option><option>Integer</option><option>Decimal</option><option>Date</option></Form.Control></td>}
            {props.dataDisplay==="Criteria" && rowType==="create" && <td><Form.Control as="select"><option>Boolean</option><option>String</option><option>Integer</option><option>Decimal</option><option>Date</option></Form.Control></td>}

            {rowType==="view" && <td className="text-center"><Button onClick={() => setRowType("edit")}>Edit</Button></td>}
            {rowType==="edit" && <td colspan="2" className="text-center"><Button onClick={() => setRowType("view")}>Save</Button></td>}
            {rowType==="view" && <td className="text-center"><Button variant="danger">Delete</Button></td>}
            {rowType==="create" && <td className="text-center"><Button onClick={() => setRowType("view")}>Add</Button></td>}
            {rowType==="create" && <td className="text-center"><Button variant="danger" onClick={() => setRowType("view")}>Cancel</Button></td>}
        </tr>
    )
}