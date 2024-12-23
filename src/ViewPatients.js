import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import {deletePatient, getPatients} from './api'
import { Link } from 'react-router-dom';

function ViewPatients(){
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const fetchPatients = async() =>{
        const data = await getPatients();
        setPatients(data);
      };
      fetchPatients();
    }, []);

    const handleDeletion = async (person_id)=>{
        try{
          await deletePatient(person_id);
        }
       catch (error) {
        console.error('Error deleting patient:', error);
        }
      };

    const columns =[
        {
          name: 'Patient ID',
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
          name: 'Date of Birth',
          selector:row =>row.date_of_birth
        },
        {
          name: 'Gender',
          selector:row =>row.gender
        },
        {
            name: 'Contact Number',
            selector:row =>row.contact_number
        },
        {
            name: 'City of Residence',
            selector:row =>row.city
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/UpdatePatient/${row.person_id}`}>
                <button class="button3">Update</button>
              </Link>
              
              <button class="button4" onClick={e=> handleDeletion(row.person_id)}>Delete</button>
            </div>
          ),
        },
    
      ];
      const filteredPatients = patients.filter(patient => {
        return (
          patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

    return(
        <div>
             <Link to="/AddPatient">
            <button className="button1">Register New Patient </button>
            </Link>
            <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>

              <input
              type="text"
              placeholder="Search by Name or City"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="search-input"
            />

            <DataTable
            columns={columns}
            data={filteredPatients}>
            
            </DataTable>

        </div>

    );
}
export default ViewPatients;