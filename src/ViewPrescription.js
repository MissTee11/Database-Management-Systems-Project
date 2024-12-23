import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { deletePrescription, getPrescriptions } from './api';
import { Link } from 'react-router-dom';

function ViewPrescriptions() {
    const { medication_id } = useParams(); 
    const [prescriptions, setPrescriptions] = useState([]);

   useEffect(() => {
       const fetchPrescription = async () => {
           const data = await getPrescriptions();
           setPrescriptions(data);
       };
       fetchPrescription();
   }, []);

   const handleDeletion = async (prescription_id)=>{
    try{
      await deletePrescription(prescription_id);
    }
   catch (error) {
    console.error('Error deleting prescription:', error);
    }
  };

    const columns = [
        {
            name: 'Prescription ID',
            selector: row => row.prescription_ID,
        },
        {
            name: 'Patient Name',
            selector: row => row.patient_name,
        },
        {
            name: 'Doctor Name',
            selector: row => row.doctor_name,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
        {
            name: 'Dosage Instructions',
            selector: row => row.dosage_instructions,
        },
        {
            name: 'Actions',
            cell: row => (
              <div>
                <Link to={`/UpdatePrescription/${row.prescription_id}`}>
                  <button class="button3">Update</button>
                </Link>
                <button class="button4" onClick={e=> handleDeletion(row.prescription_id)}>Delete</button>
              </div>
            ),
          },
    ];

    return (
        <div>
            <h2>Prescriptions </h2>
            <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>
            <DataTable
                columns={columns}
                data={prescriptions}
            />
        </div>
    );
}

export default ViewPrescriptions;