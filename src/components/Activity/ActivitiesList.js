import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import RowTool from '../Row/RowTool';
import ActivityHead from './TrackingHead';
import ActivityCell from './TrackingCell';
import styles from './activities.module.css';

export default function ActivitiesList() {
    
    const [memberActivityData, setActivityData] = useState([{}]);    // brings in all member data
    let history = useHistory();

    // read alliance data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/userdata',
            );
            setActivityData(result.data.results);
        };

        fetchData();
    }, [memberActivityData]);

    return (
        <div>

        </div>
    )
}
