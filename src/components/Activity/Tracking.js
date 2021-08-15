import React from 'react';
import TrackingLogList from './TrackingLogList';

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
