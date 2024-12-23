import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoctor,getDoctor } from "./api";

function ViewDoctors(){
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const fetchDoctor = async () => {
          const data = await getDoctor();
          setDoctors(data);
      };
      fetchDoctor();
  }, []);

  const handleDeletion = async (person_id)=>{
            try{
              await deleteDoctor(person_id);
            }
           catch (error) {
            console.error('Error deleting doctor:', error);
            }
          };
  


  
    const columns =[
        {
          name: 'Doctor ID',
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
          name: 'Gender',
          selector:row =>row.gender
        },
        {
            name: 'Specialty',
            selector:row =>row.specialty
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/UpdateDoctor/${row.person_id}`}>
                <button className="button3">Update</button>
              </Link>
              <button class="button4" onClick={e=> handleDeletion(row.person_id)}>Delete</button>
            </div>
          ),
        },
    
      ];
      const filteredDoctors = doctors.filter(doctor => {
        return (
          doctor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

    return(
        <div>
             <Link to="/AddDoctor">
            <button class="button1">Register New Doctor </button>
            </Link>
            <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>

              <input
        type="text"
        placeholder="Search by Name or Specialty"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input"
      />

            <DataTable
            columns={columns}
            data={filteredDoctors}>
            </DataTable>

        </div>

    );
}
export default ViewDoctors;