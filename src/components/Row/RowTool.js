import React, { useState } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import styles from './Row.module.css'; 

export default function RowTool(props) {
    const [rowType, setRowType] = useState("view");     // types: view, edit, create, delete

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
            // {props.dataDisplay="MemberList" && <td>{props.username}</td>}
            // {props.dataDisplay="MemberList" && <td>{props.memberRole}</td>}
            // {props.dataDisplay="MemberList" && <td>{props.memberNotes}</td>}
            // {props.dataDisplay="MemberList" && <td>{props.currentMember}</td>}
            // {props.dataDisplay="Criteria" && <td>{props.criteriaName}</td>}
            // {props.dataDisplay="Criteria" && <td>{props.criteriaDatatype}</td>}
            // <td class="form-check form-switch">
            //      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            //      <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            // </td>

        <tr key="props.key" className={styles.rowDefault}>
            {props.dataDisplay==="MemberList" && rowType==="view" && <td>{props.username}</td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><input type="text" defaultValue={props.username} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><input type="text" /></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td>{props.memberRole}</td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><input type="text" defaultValue={props.memberRole} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><input type="text" /></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td>{props.memberNotes}</td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><input type="text" defaultValue={props.memberNotes} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td><input type="text" /></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td>{props.currentMember}</td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td className="form-check form-switch"><input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultValue={props.currentMember && `Yes` || !props.currentMember && `No`} /></td>}
            {props.dataDisplay==="MemberList" && rowType==="create" && <td className="form-check form-switch"><input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked /></td>}

            {props.dataDisplay==="MemberList" && rowType==="view" && <td>{props.memberAddedDate}</td>}
            {props.dataDisplay==="MemberList" && rowType==="edit" && <td><input type="text" defaultValue={props.memberAddedDate} /></td>}


            {props.dataDisplay==="Criteria" && rowType==="view" && <td>{props.criteriaName}</td>}
            {props.dataDisplay==="Criteria" && rowType==="edit" && <td><input type="text" defaultValue={props.criteriaName} /></td>}
            {props.dataDisplay==="Criteria" && rowType==="create" && <td><input type="text" /></td>}

            {props.dataDisplay==="Criteria" && rowType==="view" && <td>{props.criteriaDatatype}</td>}
            {props.dataDisplay==="Criteria" && rowType==="edit" && <td><input type="text" defaultValue={props.criteriaDatatype} /></td>}
            {props.dataDisplay==="Criteria" && rowType==="create" && <td><input type="text" /></td>}

            {rowType==="create" && <td><button>Add</button></td>}
            {rowType==="view" && <td><button onClick={() => setRowType("edit")}>Edit</button></td>}
            {rowType==="edit" && <td><button onClick={() => setRowType("view")}>Save</button></td>}
            {rowType==="edit" && <td><button>Delete</button></td>}
        </tr>
    )
}