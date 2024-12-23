import React, { useState, useEffect } from 'react';
import { updatePrescription, addPrecsriptions, getPatients } from './api';

function UpdatePrescription(){

    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);

    const [values, setValues] = useState({
        patient_ID: '',
        medication_ID: '',
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
        patient_ID: '',
        medication_ID: '',
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
        patient_ID: values.patient_ID,
        medication_ID: values.medication_ID,
        amount: values.amount,
        dosage_instructions: values.dosage_instructions,
    };
    try{
            const response = await updatePrescription(payload);
           }
        catch(error){
            console.log(error);
          }
        };

return (
    <div className="container">
        <h1>Create Prescription</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="patient_ID">Patient</label>
            <select
                name="patient_ID"
                onChange={handleChanges}
                value={values.patient_ID}
                required
            >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                    <option key={patient.person_ID} value={patient.person_ID}>
                        {patient.first_name} {patient.last_name}
                    </option>
                ))}
            </select>

            <label htmlFor="medication_ID">Medication</label>
            <select
                name="medication_ID"
                onChange={handleChanges}
                value={values.medication_ID}
                required
            >
                <option value="">Select Medication</option>
                {medications.map((medication) => (
                    <option key={medication.medication_ID} value={medication.medication_ID}>
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


export default UpdatePrescription;