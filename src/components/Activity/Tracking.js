import React from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import RowAdd from '../Row/RowAdd';
import TrackingLogList from './TrackingLogList';
import axios from "../../axios";

export default function Tracking() {
    // similar to Members and Tracking Criteria, except columns are dynamically created
    // based on the Tracking Criteria data
    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Add New Activity Report</h2>
            <TrackingLogList />
        </div>
    )
}
