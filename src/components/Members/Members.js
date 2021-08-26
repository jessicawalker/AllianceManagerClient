import React, { useState, useEffect } from 'react';
import MemberList from './MemberList';
import RowAdd from '../Row/RowAdd';
import axios from "../../axios";
import { useAuth } from '../../contexts/AuthContext';
import styles from './Members.module.css'; 

export default function Members() {    
    const [memberData, setMemberData] = useState([{}]);    // collects all member data
    const { currentUser } = useAuth();

    // read member data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/members',
            );
            setMemberData(result.data.results);
        };

        fetchData();

        return () => {console.log("fetched")}
    }, []);

    
    const addDataHandler = async (newDataRow) => {
        const enteredMemberUsername = newDataRow.member_username;
        const enteredMemberRole = newDataRow.member_role;
        const enteredMemberNotes = newDataRow.member_notes;
        const enteredCurrentMember = newDataRow.current_member;

        await axios.post('/members-add', {
            member_username: enteredMemberUsername,
            member_role: enteredMemberRole,
            member_notes: enteredMemberNotes,
            current_member: enteredCurrentMember
        }, {
            headers: {'Content-Type': 'application/json'}})
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
    }
    
    const updateDataHandler = async (updateMemberDataRow) => {
        const currentId = updateMemberDataRow._id;
        const enteredMemberUsername = updateMemberDataRow.member_username;
        const enteredMemberRole = updateMemberDataRow.member_role;
        const enteredMemberNotes = updateMemberDataRow.member_notes;
        const enteredCurrentMember = updateMemberDataRow.current_member;

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

    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Members</h2>
            <MemberList 
                crudState="view" 
                allData={memberData}
                onUpdateData={updateDataHandler}
                onDeleteData={deleteDataHandler} />
            {currentUser && <RowAdd 
                addType="Member" 
                dataDisplay="MemberList" 
                crudState="view"
                onAddData={addDataHandler} />}
        </div>
    )
}
