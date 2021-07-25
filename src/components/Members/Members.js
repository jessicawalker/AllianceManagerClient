import React, { useRef, useState, useEffect } from 'react';
import MemberList from './MemberList';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import styles from './Members.module.css'; 

export default function Members() {
    /* option 1: put logic above render
    let membersContent = <p>No members</p>;
    if (membersList.length > 0) {
        membersContent = membersList.map(member) => (
            <Row username={member.username} 
            memberRole={member.memberRole} 
            memberNotes={member.memberNotes} 
            currentMember={member.currentMember} />
    }*/

    /* option 2: use ternary within JSX return
    {membersList.length === 0 ? (
        <p>No members!</p>
        ) : (
            {membersList.map(member) => (
                <Row username={member.username} 
                memberRole={member.memberRole} 
                memberNotes={member.memberNotes} 
                currentMember={member.currentMember}
                />
            )}
        )
    )}*/

    
    const [memberData, setMemberData] = useState({});

    return (
        <div>
            <h2 className="text-center mb-4">Members</h2>
            <MemberList members="none" />
        </div>
    )
}
