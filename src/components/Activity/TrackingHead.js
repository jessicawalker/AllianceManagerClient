import React, { useRef, useState, useEffect } from 'react';
/*import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import RowTool from '../Row/RowTool';
import styles from './activities.module.css';*/

export default function TrackingHead(props) {
    return (
        <th>
            {props.head}
        </th>
    )
}
