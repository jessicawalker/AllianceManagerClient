import React, { useState, useEffect } from 'react';
import { Table, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import styles from './Members.module.css'; 

export default function MemberList(props) {
    const [memberData, setMemberData] = useState([{}]);    // brings in all member data
    let history = useHistory();

    // read member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members',
            );
            setMemberData(result.data.results);
        };

        fetchData();
    }, [memberData]);

    const updateDataHandler = async (updateMemberDataRow) => {
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

    async function handleSubmit(e) {
        e.preventDefault();
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
                        showAddRow={false}
                    />
                    ))}
                </tbody>
                
            </Table>
        {memberData.length === 0 && <h3>No members! Would you like to add anyone as an alliance member?</h3>}
        </Form>
    )
}
