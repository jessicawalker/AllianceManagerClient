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

export default function MemberList(props) {
    const [memberData, setMemberData] = useState([{}]);
    const [memberDataRow, setMemberDataRow] = useState({});
    let history = useHistory();

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members',
            );
            setMemberData(result.data.results);
        };

        fetchData();
    }, [memberDataRow]);

    const updateDataHandler = async (updateMemberDataRow) => {
        setMemberDataRow(updateMemberDataRow);
        const currentId = updateMemberDataRow._id;
        const enteredMemberUsername = updateMemberDataRow.member_username;
        const enteredMemberRole = updateMemberDataRow.member_role;
        const enteredMemberNotes = updateMemberDataRow.member_notes;
        const enteredCurrentMember = updateMemberDataRow.current_member;
        //const enteredMemberAddedDate = memberDataRow.member_added_date;

            await axios.put(`/members-update/${currentId}`, {
                member_username: enteredMemberUsername,
                member_role: enteredMemberRole,
                member_notes: enteredMemberNotes,
                current_member: enteredCurrentMember,
                //member_added_date: enteredMemberAddedDate
            }, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                    console.log(response);
                    history.push('/members');
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        };

    const deleteDataHandler = async (id) => {
        await axios.delete(`/members-delete/${id}`)
            .then(function (response) {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios(
                        '/members',
                    );
                    setMemberData(result.data.results);
                };
        
                fetchData();
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    
    };

    
    // onSubmit, update the form data
    async function handleSubmit(e) {
        e.preventDefault();
        /*console.log(memberDataRow);
        console.log(memberDataRow.id);
        console.log({
            member_username: memberDataRow.member_username,
            member_role: memberDataRow.member_role,
            member_notes: memberDataRow.member_notes,
            current_member: memberDataRow.current_member,
            member_added_date: memberDataRow.member_added_date
        });*/


    }


    return (
        <Form onSubmit={handleSubmit}>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Notes</th>
                        <th>Current</th>
                        <th>Date Added</th>
                        <th colSpan="2"></th>
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
                        onUpdateData={updateDataHandler}
                        onDeleteData={deleteDataHandler}
                    />
                    ))}
                </tbody>
                
            </Table>
        </Form>
    )
}
