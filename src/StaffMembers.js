import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteStaff, getStaff } from "./api";


function StaffMembers(){
  const[staff, setStaff]= useState([]);
  
  useEffect(() => {
    const fetchStaff = async () => {
        const data = await getStaff();
        setStaff(data);
    };
    fetchStaff();
}, []);

const handleDeletion = async (person_id)=>{
  try{
    await deleteStaff(person_id);
  }
 catch (error) {
  console.error('Error deleting staff member:', error);
  }
};
    const columns =[
        {
          name: 'Staff ID',
          selector:row =>row.person_id
        },
        {
          name: 'First Name',
          selector:row =>row.first_name
        },
        {
          name: 'Last Name',
          selector:row =>row.last_name
        },
        {
          name: 'Role',
          selector:row =>row.role
        },
        {
          name: 'Department',
          selector:row =>row.department
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/UpdateStaff/${row.person_id}`}>
                <button class="button3">Update</button>
              </Link>
              <button cl ass="button4" onClick={e=> handleDeletion(row.person_id)}>Delete</button>
            </div>
          ),
        },
    
      ];

    return(
        <div>
             <Link to="/AddStaff">
            <button class="button1">Register New Employee </button>
            </Link>

            <DataTable
            columns={columns}
            data={staff}>
            
            </DataTable>

        </div>

    );
}
export default StaffMembers;