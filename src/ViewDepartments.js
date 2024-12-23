import DataTable from "react-data-table-component";
import { getDepartment } from "./api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Departments(){

  const[department, setDepartment]= useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
        const data = await getDepartment();
        setDepartment(data);
    };
    fetchDepartments();
}, []);


    const columns =[
        {
          name: 'Department ID',
          selector:row =>row.department_id
        },
        {
          name: 'Name',
          selector:row =>row.name
        },
        {
          name: 'Actions',
          cell: row => (
            <Link to={'/ViewAppointment'}>
            <button class="button3">Make Appointment</button>
          </Link>
          ),
        },
    
      ];

    return(
        <div>
          <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>
            <DataTable
            columns={columns}
            data={department}>
            </DataTable>
        </div>

    );
}
export default Departments;