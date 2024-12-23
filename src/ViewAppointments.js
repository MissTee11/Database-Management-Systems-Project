import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, deleteAppointment } from "./api";


function ViewAppointments(){

  const[appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
        const data = await getAppointments();
        setAppointments(data);
    };
    fetchAppointment();
}, []);

const handleDeletion = async (appointment_id)=>{
  try{
    await deleteAppointment(appointment_id);
  }
 catch (error) {
  console.error('Error deleting appointment:', error);
  }
};


    const columns =[
        {
          name: 'Appointment ID',
          selector:row =>row.appointment_id
        },
        {
          name: 'Patient ID',
          selector:row =>row.patient_name
        },
        {
          name: 'Doctor ID',
          selector:row =>row.doctor_id
        },
        {
          name: 'Appointment Date',
          selector:row =>row.appointment_date
        },
        {
          name: 'Time',
          selector:row =>row.time
        },
        {
            name: 'Status',
            selector:row =>row.status
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/Update/${row.appointment_id}`}>
                <button class="button3">Update</button>
              </Link>
              <button class="button4" onClick={e=> handleDeletion(row.appointment_id)}>Delete</button>
            </div>
          ),
        },
    
      ];

    return(
        <div>
             <Link to="/AddAppointment">
            <button class="button1">New Appointment </button>
            </Link>
            <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>

            <DataTable
            columns={columns}
            data={appointments}>
            </DataTable>

        </div>

    );
}
export default ViewAppointments;