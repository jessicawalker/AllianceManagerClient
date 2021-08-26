import React from 'react';
import { Table, Form } from "react-bootstrap";
import RowTool from '../Row/RowTool';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Members.module.css'; 

export default function MemberList(props) {
    const { currentUser } = useAuth();

    return (
        <Form>
            <Table className="table" striped bordered hover responsive="md">
                <thead className="thead-dark">
                    <tr>
                        <th id="memberName">Username</th>
                        <th id="memberRole">Role</th>
                        <th id="memberNotes">Notes</th>
                        <th id="memberCurrent">Current</th>
                        <th id="memberAdded" className={styles.dateColumn}>Date Added</th>
                        {currentUser && <th colSpan="2"></th>}
                    </tr>
                </thead>
                <tbody>
                {props.allData.map((member) => (<RowTool key={uuidv4()}  
                        idValue={member._id}
                        dataDisplay="MemberList" 
                        username={member.member_username} 
                        memberRole={member.member_role} 
                        memberNotes={member.member_notes} 
                        currentMember={member.current_member}
                        memberAddedDate={member.member_added_date}
                        crudState="view" 
                        onUpdateData={props.onUpdateData}
                        onDeleteData={props.onDeleteData}
                        showAddRow={false}
                    />
                    ))}
                </tbody>
                
            </Table>
        </Form>
    )
}
