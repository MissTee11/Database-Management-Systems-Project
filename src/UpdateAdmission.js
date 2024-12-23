import './App.css';
import React, { useState,useEffect } from 'react';
import { updateAdmisiions,getPatients, getRoom } from './api';

function UpdateAdmission() {
  const [values, setValues] = useState({
    patient_ID: '',
    room_ID: '',
    admission_date: '',
    discharge_date: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetInfo = () => {
    setValues({
      patient_ID: '',
      room_ID: '',
      admission_date: '',
      discharge_date: '',
    });
  };

        const [patients, setPatients] = useState([]);
        const [rooms, setRooms] = useState([]);
  
        useEffect(() => {
          const fetchData = async () => {
                  const patientsData = await getPatients();
                  setPatients(patientsData);
                  const roomData = await getRoom();
                  setRooms(roomData);
          };
          fetchData();
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patient_ID: values.patient_ID,
      room_ID: values.room_ID,
      admission_date: values.admission_date,
      discharge_date: values.discharge_date,
    };

  try{
          const response = await updateAdmisiions(payload);
        }
        catch(error){
          console.log(error);
        }
  };

  return (
    <div className="container">
      <h1>Admission Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patient_ID">Select Patient</label>
        <input type="text" placeholder="Enter Patient ID" name="patient_ID"
          onChange={(e) => handleChanges(e)}
          required
          value={values.patient_ID}
        />

        <label htmlFor="room_ID">Select Room</label>
        <input type="text" placeholder="Enter Room ID" name="room_ID"
          onChange={(e) => handleChanges(e)}
          required
          value={values.room_ID}
        />

        <label htmlFor="admission_date">Admission Date</label>
        <input type="date" placeholder="Enter Admission Date"name="admission_date"
          onChange={(e) => handleChanges(e)}
          required
          value={values.admission_date}
        />

        <label htmlFor="discharge_date">Discharge Date</label>
        <input type="date" placeholder="Enter Discharge Date" name="discharge_date"
          onChange={(e) => handleChanges(e)}
          value={values.discharge_date}
        />

        <button class="button2" type="button" onClick={resetInfo}>
          Reset
        </button>
        <button class="button1" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateAdmission;
