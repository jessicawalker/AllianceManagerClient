import React, { useRef, useState, useEffect } from 'react';
import TrackingSetupList from './TrackingSetupList';
import RowAdd from '../Row/RowAdd';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";

export default function TrackingSetup() {
    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Tracking Setup</h2>
                <TrackingSetupList crudState="view" />
                <RowAdd addType="Tracking Criteria" dataDisplay="Criteria" />
        </div>
    )
}
