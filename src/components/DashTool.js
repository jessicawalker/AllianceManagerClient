import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { fas } from 'fontawesome.macro';
import styles from './Dash.module.css';

export default function DashTool(props) {
    const dashImgStyle = {
        float: 'left',
        height: '1.4em', 
        margin: '0.2em 0.5em 0 0',
        width: '1.4em'
    };
    const dashLinkStyle = {
        textDecoration: 'none'
    };

    return (
        <>
            <Link to={`${props.goto}`} style={dashLinkStyle}>
                <img src={`../../imgs/${props.img}.png`} alt={`${props.pageName}`} style={dashImgStyle} />
                <h4>{props.pageName}</h4>
            </Link>
        </>
    )
}