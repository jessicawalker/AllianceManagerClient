import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function RowTool(props) {
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

        <tr key="props.key">
            {props.dataDisplay==="MemberList" && <td>{props.username}</td>}
            {props.dataDisplay==="MemberList" && <td>{props.memberRole}</td>}
            {props.dataDisplay==="MemberList" && <td>{props.memberNotes}</td>}
            {props.dataDisplay==="MemberList" && <td>{props.currentMember}</td>}
            {props.dataDisplay==="MemberList" && <td>{props.memberAddedDate}</td>}
            {props.dataDisplay==="Criteria" && <td>{props.criteriaName}</td>}
            {props.dataDisplay==="Criteria" && <td>{props.criteriaDatatype}</td>}
            <td className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
            </td>
            <td><input type="text" defaultValue="test" /></td>
            <td><button>Add</button></td>
            <td><button>Edit</button></td>
            <td><button>Save</button></td>
            <td><button>Delete</button></td>
        </tr>
    )
}