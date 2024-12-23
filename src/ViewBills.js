import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteBill, getBills } from "./api";


function ViewBills(){
  const[bills, setBills]= useState();

    useEffect(() => {
      const fetchBill = async () => {
          const data = await getBills();
          setBills(data);
      };
      fetchBill();
  }, []);

  const handleDeletion = async (billing_id)=>{
              try{
                await deleteBill(billing_id);
              }
             catch (error) {
              console.error('Error deleting bill:', error);
              }
            };

    const columns =[
        {
          name: 'Billing ID',
          selector:row =>row.billing_id
        },
        {
          name: 'Patient ID',
          selector:row =>row.patient_id
        },
        {
          name: 'Doctor ID',
          selector:row =>row.doctor_id
        },
        {
          name: 'Billing Date',
          selector:row =>row.date
        },
        {
          name: 'Total Amount',
          selector:row =>row.total_amount
        },
        {
            name: 'Status',
            selector:row =>row.status
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/UpdateBill/${row.billing_id}`}>
                <button class="button3">Update</button>
              </Link>
              <Link to={`/MakePayment/${row.billing_id}`}>
                <button class="button3">Make Payment</button>
              </Link>
              <button class="button4" onClick={e=> handleDeletion(row.billing_id)}>Delete</button>
            </div>
          ),
        },
    
      ];

    return(
        <div>
             <Link to="/AddBill">
            <button class="button1">Create New Bill </button>
            </Link>
            <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>

            <DataTable
            columns={columns}
            data={bills}>
            </DataTable>

        </div>

    );
}
export default ViewBills;