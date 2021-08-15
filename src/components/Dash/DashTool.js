import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dash.module.css';

export default function DashTool(props) {

    return (
        <div className={styles.dashToolItem}>
            <Link to={`${props.goto}`} className={styles.dashLinkStyle}>
                <img src={`../../imgs/${props.img}.png`} alt={`${props.pageName}`} className={styles.dashImg} />
                <h3>{props.pageName}</h3>
            </Link>
        </div>
    )
}