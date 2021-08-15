import React, { useState } from 'react';
import TrackingCell from './TrackingCell';
import { v4 as uuidv4 } from 'uuid';
//import styles from './activities.module.css';

export default function TrackingBody(props) {
    const [criteriaData, setCriteriaData] = useState(props.sendCriteria);    // tracking criteria
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

    return (
        <tbody>
        {props.sendData.map((data) => (
            <tr key={Math.random()}>
                <TrackingCell
                    key={uuidv4()}
                    idValue={data._id}
                    field="date"
                    value={new Date(data.date).toLocaleDateString('en-US', displayDate)}
                    criteria_datatype="Date"
                />
                <TrackingCell
                    key={uuidv4()}
                    idValue={data._id}
                    field="user"
                    value={data.user}
                    criteria_datatype="String"
                />

                {criteriaData.map((criteria) => (
                    <TrackingCell
                    key={uuidv4()}
                        idValue={data._id}
                        field={criteria.criteria_key}
                        criteria_datatype={criteria.criteria_datatype}
                    />))}

                <TrackingCell
                    key={uuidv4()}
                    idValue={data._id}
                    field="notes"
                    value={data.notes}
                    criteria_datatype="String"
                />
            </tr>))}
    </tbody>
    )
}
