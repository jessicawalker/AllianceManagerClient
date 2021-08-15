import React, { useState } from 'react';
//import styles from './activities.module.css';

export default function TrackingCellView(props) {
    const [trackData, setTrackData] = useState(props.value);
    const [styleData, setStyleData] = useState({});
    const [variantClass, setVariantClass] = useState();
    const [dataType, setDataType] = useState(props.criteria_datatype);
    const displayDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };

    const cellTrueStyle = {
        backgroundColor: "#d1e7dd",
        borderColor: "#badbcc",
        color: "#0f5132"
    };
    const cellFalseStyle = {
        backgroundColor: "#f8d7da",
        borderColor: "#f5c2c7",
        color: "#842029"
    };

    if (trackData === true || trackData === "true") {
        setTrackData("Yes");
        setVariantClass("table-success");
        setStyleData({cellTrueStyle});
    }

    if (trackData === false || trackData === "false") {
        setTrackData("No");
        setVariantClass("table-danger");
        setStyleData({cellFalseStyle});
    }

    return (
        <td style={styleData} className={variantClass}>
            {dataType === "Date" && new Date(trackData).toLocaleDateString('en-US', displayDate)}
            {dataType !== "Date" && trackData}
        </td>
    )
}
