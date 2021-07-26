import React, { useState, useEffect } from 'react';
import { Form, FormCheck, Switch, Button, Table, Card, Alert } from "react-bootstrap";
import RowTool from '../Row/RowTool';
import styles from './Row.module.css'; 

export default function RowAdd(props) {
    const [viewType, setViewType] = useState(false);
    const [sectionType, setSectionType] = useState();

    /*useEffect(() => {
    }, []);*/

    return (
        <>
            {viewType && (<Table className="table addRowTool" responsive="md"><tbody><RowTool crudState="create" dataDisplay={sectionType} /></tbody></Table>)}
            <div className={styles.addSection}>
                <Button onClick={() => {
                    setViewType(true);
                    setSectionType(props.dataDisplay)}
                }>Add New {props.addType}</Button>
            </div>
        </>
    )
}
