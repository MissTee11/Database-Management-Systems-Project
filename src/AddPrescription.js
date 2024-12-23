import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMedications, addPrecsriptions, getPatients } from './api';

function CreatePrescription(){
   
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const navigate=useNavigate();

    const [values, setValues] = useState({
        patient_id: '',
        medication_id: '',
        amount: '',
        dosage_instructions: '',
    });

    useEffect(() => {
        const fetchData = async () => {
                const patientsData = await getPatients();
                setPatients(patientsData);
                const medicationData = await getMedications();
                setMedications(medicationData);
        };
        fetchData();
    }, []);

const resetInfo = () => {
    setValues({
        patient_id: '',
        medication_id: '',
        amount: '',
        dosage_instructions: ''
    });
};

const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        patient_id: values.patient_id,
        medication_id: values.medication_id,
        amount: values.amount,
        dosage_instructions: values.dosage_instructions,
    };
    try{
            const response = await addPrecsriptions(payload);
            console.log('Prescription Created:', response);
            navigate('/ViewPrescription')
           }
        catch(error){
            console.log(error);
          }
        };

return (
    <div className="container">
        <h1>Create Prescription</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="patient_id">Patient</label>
            <select
                name="patient_id"
                onChange={handleChanges}
                value={values.patient_id}
                required
            >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                    <option key={patient.person_id} value={patient.person_id}>
                        {patient.first_name} {patient.last_name}
                    </option>
                ))}
            </select>

            <label htmlFor="medication_id">Medication</label>
            <select
                name="medication_id"
                onChange={handleChanges}
                value={values.medication_id}
                required
            >
                <option value="">Select Medication</option>
                {medications.map((medication) => (
                    <option key={medication.medication_id} value={medication.medication_id}>
                        {medication.name} 
                    </option>
                ))}
            </select>

            <label htmlFor="amount">Amount</label>
            <input
                type="number"
                name="amount"
                onChange={handleChanges}
                value={values.amount}
                required
            />

            <label htmlFor="dosage_instructions">Dosage Instructions</label>
            <textarea
                name="dosage_instructions"
                onChange={handleChanges}
                value={values.dosage_instructions}
                required
            ></textarea>

            <button type="button" onClick={resetInfo} className="button2">
                Reset
            </button>
            <button type="submit" className="button1">
                Save Prescription
            </button>
        </form>
    </div>
);
}


export default CreatePrescription;