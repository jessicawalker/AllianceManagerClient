import React, { useRef, useState, useEffect } from 'react';
import { Table, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './Members.module.css'; 

// option 3 for generating list of members (see Members.js for options 1 and 2)

    /*if (props.members.length === 0) {
        return  (
            <div>
                <p>No members</p>
            </div>
        )
    }*/

    /*
        <table>
            <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Notes</th>
                <th>Current</th>
            </tr>
        </table>
            {props.members.map(member) => (
                <RowTool key="memberData._id" 
                    dataDisplay="MemberList" 
                    username={memberData.member_username} 
                    memberRole={memberData.member_role} 
                    memberNotes={memberData.member_notes} 
                    currentMember={memberData.current_member}
                />
            )}
            <RowTool key="_id" 
                    dataDisplay="MemberList" 
                    username="Test" 
                    memberRole="Tester" 
                    memberNotes="This is a test" 
                    currentMember="true"
                />
    */
export default function MemberList(props) {
    const [memberData, setMemberData] = useState([{}]);
    const memberUsernameRef = useRef();
    const memberRoleRef = useRef();
    const memberNotesRef = useRef();
    const currentMemberRef = useRef();
    const memberAddedDateRef = useRef();

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members',
            );
            setMemberData(result.data.results);
        };

        fetchData();
    }, []);

    // onSubmit, update the form data
    async function handleSubmit(e) {
        e.preventDefault();

        const enteredMemberUsername = memberUsernameRef.current.value;
        const enteredMemberRole = memberRoleRef.current.value;
        const enteredMemberNotes = memberNotesRef.current.value;
        const enteredCurrentMember = currentMemberRef.current.value;
        const enteredMemberAddedDate = memberAddedDateRef.current.value;
        const currentId = memberData._id;

        // should there also be a setAlData here?
        if (enteredMemberUsername === "") {
            return;
        }
        
        if (currentId === "") {  // new entry
            await axios.post('/members-add', {
                member_username: enteredMemberUsername,
                member_role: enteredMemberRole,
                member_notes: enteredMemberNotes,
                current_member: enteredCurrentMember,
                member_added_date: enteredMemberAddedDate
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {    // update entry
            await axios.put(`/members-update/${currentId}`, {
                member_username: enteredMemberUsername,
                member_role: enteredMemberRole,
                member_notes: enteredMemberNotes,
                current_member: enteredCurrentMember,
                member_added_date: enteredMemberAddedDate
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <Table className="table" striped bordered hover responsive="md">
            <thead className="thead-dark">
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Notes</th>
                    <th>Current</th>
                    <th>Date Added</th>
                    <th colspan="2"></th>
                </tr>
            </thead>
            <tbody>
            {memberData.map((member) => (<RowTool key={member._id}  
                    idValue={member._id}
                    dataDisplay="MemberList" 
                    username={member.member_username} 
                    memberRole={member.member_role} 
                    memberNotes={member.member_notes} 
                    currentMember={member.current_member}
                    memberAddedDate={member.member_added_date}
                    crudState="view"
                />
                ))}
            </tbody>
            
        </Table>
    )
}
