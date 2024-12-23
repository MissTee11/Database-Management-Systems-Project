import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { deleteRecord, getMedicalRecords } from './api';
import { Link } from 'react-router-dom';

function ViewMedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(()=>{
    const fetchRecords = async ()=>{
      const data = await getMedicalRecords();
      setMedicalRecords(data);
    };
    fetchRecords();
  },[]);

    const handleDeletion = async (record_id)=>{
          try{
            await deleteRecord(record_id);
          }
         catch (error) {
          console.error('Error deleting record:', error);
          }
        };

  const columns = [
    {
      name: 'Record ID',
      selector: (row) => row.record_ID,
    },
    {
      name: 'Appointment ID',
      selector: (row) => row.appointment_ID,
    },
    {
      name: 'Patient ID',
      selector: (row) => row.patient_ID,
    },
    {
      name: 'Doctor ID',
      selector: (row) => row.doctor_ID,
    },
    {
      name: 'Diagnosis',
      selector: (row) => row.diagnosis,
    },
    {
      name: 'Prescription ID',
      selector: (row) => row.prescription_ID,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link to={`/UpdateRecord/${row.record_ID}`}>
            <button className="button3">Update</button>
          </Link>
          <button className="button4" onClick={() => handleDeletion(row.record_ID)}>
            Delete
          </button>
        </div>
      ),
    },
];

return (
    <div>
        <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>
      <DataTable
      columns={columns}
      data={medicalRecords}>
      </DataTable>
    </div>
  );
}

export default ViewMedicalRecords