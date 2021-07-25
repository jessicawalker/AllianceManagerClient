import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
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
    const [memberData, setMemberData] = useState({});

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/members',
            );
            setMemberData(result.data.results[0]);
            console.log(result.data.results[0]);
            console.log(memberData);
            console.log(memberData.member_role);
        };

        fetchData();
    }, []);

    return (
        <table className={styles.centerTable}>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Notes</th>
                    <th>Current</th>
                </tr>
            </thead>
            <tbody>
            <RowTool key="memberData._id" 
                    dataDisplay="MemberList" 
                    username={memberData.member_username} 
                    memberRole={memberData.member_role} 
                    memberNotes={memberData.member_notes} 
                    currentMember={memberData.current_member}
                    memberAddedDate={memberData.member_added_date}
                />
            </tbody>
            
        </table>
    )
}
