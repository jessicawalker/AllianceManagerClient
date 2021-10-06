import React, { useState, useEffect } from 'react';
import TrackingSetupList from './TrackingSetupList';
import RowAdd from '../Row/RowAdd';
import RowList from '../Row/RowList';
import RowTool from '../Row/RowTool';
import axios from "../../axios";
import { v4 as uuidv4 } from 'uuid';

export default function TrackingSetup() {
    const [criteriaData, setCriteriaData] = useState([{}]);
    const [activityData, setActivityData] = useState([{}]);

    //TODO - create criteria for more than one type of report

    // read criteria data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/trackingcriteria',
            );
            setCriteriaData(result.data.results);
        };

        fetchData();

        return () => {console.log("fetched trackingcriteria")}
    }, []);

    // read activity data
    useEffect(() => {
        const fetchData = async () => {
            let result = await axios(
                '/activities',
            );
            setActivityData(result.data.results);
        };

        fetchData();

        return () => {console.log("fetched activities")}
    }, []);

    const activitiesList = [...new Set(criteriaData.map(item => item.activity_name))];

    const addDataHandler = async (newDataRow) => {
            const enteredCriteriaName = newDataRow.criteria_name;
            const enteredCriteriaDatatype = newDataRow.criteria_datatype;

            await axios.post('/trackingcriteria-add', {
                criteria_name: enteredCriteriaName,
                criteria_datatype: enteredCriteriaDatatype
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios(
                        '/trackingcriteria',
                    );
                    setCriteriaData(result.data.results);
                };
        
                fetchData();
            })
                .catch(function (error) {
                    console.log(error.response.data);
                });
};

    const updateDataHandler = async (updateCriteriaData) => {
        const currentId = updateCriteriaData._id;
        const enteredCriteriaName = updateCriteriaData.criteria_name;
        const enteredCriteriaDatatype = updateCriteriaData.criteria_datatype;

            //const updateData = async () => {
                await axios.put(`/trackingcriteria-update/${currentId}`, {
                    criteria_name: enteredCriteriaName,
                    criteria_datatype: enteredCriteriaDatatype
                }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(function (response) {
                    console.log(response);
                    const fetchData = async () => {
                        const result = await axios(
                            '/trackingcriteria',
                        );
                        setCriteriaData(result.data.results);
                    };
            
                    fetchData();
                })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
    };

    const deleteDataHandler = async (id) => {
        await axios.delete(`/trackingcriteria-delete/${id}`)
            .then(function (response) {
                console.log(response);
                const fetchData = async () => {
                    const result = await axios(
                        '/trackingcriteria',
                    );
                    setCriteriaData(result.data.results);
                };
        
                fetchData();
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    };

    const activitiesHeads = ["Activity Name", "Log Type"];
    const activitiesRow = activityData.sort((a, b) => (a > b) ? -1 : 1).map((activity) => (
        <RowTool key={uuidv4()}
            idValue={activity._id}
            dataDisplay="Activity"
            activityName={activity.activity_name}
            logType={activity.log_type}
            crudState="view"
            onUpdateData={updateDataHandler}
            onDeleteData={deleteDataHandler}
        />
    ))

    const criteriaHeads = ["Activity Name", "Criteria Name", "Criteria Datatype"];
    const criteriaRow = criteriaData.map((criteria) => (<RowTool key={uuidv4()}
            idValue={criteria._id}
            dataDisplay="Criteria"
            activitiesList={activityData}
            activityName={criteria.activity_name}
            criteriaName={criteria.criteria_name}
            criteriaDatatype={criteria.criteria_datatype}
            crudState="view"
            onUpdateData={updateDataHandler}
            onDeleteData={deleteDataHandler}
        />
    ));

    return (
        <div className="navGap">
            <h2 className="text-center mb-4">Tracking Setup</h2>
                <RowList
                    listName="Activities to Track"
                    allColumnHeads={activitiesHeads}
                    rowData={activitiesRow}
                    crudState="view" 
                    onUpdateData={updateDataHandler}
                    onDeleteData={deleteDataHandler}
                />
                <RowList
                    listName="Criteria to Track"
                    allColumnHeads={criteriaHeads}
                    rowData={criteriaRow}
                    crudState="view" 
                    onUpdateData={updateDataHandler}
                    onDeleteData={deleteDataHandler}
                />
                {/*<TrackingSetupList
                    crudState="view" 
                    allData={criteriaData}
                    allActivities={activityData}
                    onUpdateData={updateDataHandler}
                    onDeleteData={deleteDataHandler} />*/}
                <RowAdd 
                    addType="Tracking Criteria" 
                    dataDisplay="Criteria"
                    crudState="view"
                    allActivities={activityData}
                    onAddData={addDataHandler}
                />
        </div>
    )
}
