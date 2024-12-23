import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteAdmission, getAdmissions } from "./api";

function Admissions(){
  const[admissions,setAdmissions]=useState([]);

  useEffect(() => {
    const fetchAdmission = async () => {
        const data = await getAdmissions();
        setAdmissions(data);
    };
    fetchAdmission();
}, []);

const handleDeletion = async (admission_id)=>{
    try{
      await deleteAdmission(admission_id);
    }
   catch (error) {
    console.error('Error deleting room:', error);
    }
  };


    const columns =[
        {
          name: 'Admission ID',
          selector:row =>row.admission_id
        },
        {
          name: 'Patient',
          selector:row =>row.patient_id
        },
        {
          name: 'Room',
          selector:row =>row.room_id
        },
        {
          name: 'Admission Date',
          selector:row =>row.admission_date
        },
        {
          name: 'Discharge Date',
          selector:row =>row.discharge_date
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/Update/${row.admission_id}`}>
                <button class="button3">Update</button>
              </Link>
              <Link to={`/ViewRecord/${row.room_id}`}>
                <button class="button3">Check Room Availability</button>
              </Link>
              <button class="button4" onClick={e=> handleDeletion(row.admission_id)}>Delete</button>
            </div>
          ),
        },
    
      ];

    return(
        <div>
             <Link to="/AddAdmission">
            <button class="button1">New Admissions </button>
            </Link>

            <DataTable
            columns={columns}
            data={admissions}>
            </DataTable>

        </div>

    );
}
export default Admissions;