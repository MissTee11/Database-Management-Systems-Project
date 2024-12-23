import DataTable from "react-data-table-component";
import { getMedications } from "./api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Medications(){
  const [medications, setMedications] = useState([]);

useEffect(() => {
    const fetchMeds = async () => {
        const data = await getMedications();
        setMedications(data);
    };
    fetchMeds();
}, []); 

    const columns =[
        {
          name: 'Medication ID',
          selector:row =>row.medication_id
        },
        {
          name: 'Name',
          selector:row =>row.name
        },
        {
          name: 'Description',
          selector:row =>row.description
        },
        {
          name: 'Price',
          selector:row =>row.price
        },
        {
            name: 'Amount in Stock',
            selector:row =>row.stock_amount
        },
        
    
      ];

    return(
        <div>
          <Link to={'/'}>
            <button class="button2">Home Page</button>
          </Link>

          <Link to={'/AddPrescription'}>
                <button class="button1">Add Prescription</button>
              </Link>

              <Link to={`/ViewPrescription`}>
                <button class="button3">View Prescriptions</button>
              </Link>
            <DataTable
            columns={columns}
            data={medications}>
            </DataTable>
        </div>

    );
}
export default Medications;