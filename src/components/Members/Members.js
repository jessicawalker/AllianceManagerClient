import React from 'react';
import MemberList from './MemberList';
import RowAdd from '../Row/RowAdd';
import styles from './Members.module.css'; 

export default function Members() {

    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Members</h2>
            <MemberList crudState="view" />
            <RowAdd 
                addType="Member" 
                dataDisplay="MemberList" 
                crudState="view" />
        </div>
    )
}
