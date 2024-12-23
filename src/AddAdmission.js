import './App.css';
import React, { useState,useEffect } from 'react';
import { addAdmissions,getPatients, getRoom } from './api';
import { useNavigate } from 'react-router';

function AddAdmission() {
  const navigate= useNavigate();
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
      patient_id: '',
      room_id: '',
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
      patient_id: values.patient_id,
      room_id: values.room_id,
      admission_date: values.admission_date,
      discharge_date: values.discharge_date,
    };

  try{
          const response = await addAdmissions(payload);
          navigate('/Admissions')
        }
        catch(error){
          console.log(error);
        }
  };

  return (
    <div className="container">
      <h1>Admission Registration</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                required
                value={values.patient_id}
                >
                <option value="" >Select Patient</option>
                {patients.map((patient) => (
                <option key={patient.person_id} value={patient.person_id}>
                {`${patient.person_id} - ${patient.first_name} ${patient.last_name}`}
                </option>
                ))}
                </select>

                <label htmlFor="room_ID">Select Room</label>
                <select
                  name="room_ID"
                  id="room_ID"
                  onChange={handleChanges}
                  required
                  value={values.room_ID}
                >
                  <option value="" disabled>Select Room</option>
                  {rooms.map((room) => (
                    <option key={room.room_id} value={room.room_id}>
                    {room.room_id}
                    </option>
                  ))}
                </select>

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
          Save Admission
        </button>
      </form>
    </div>
  );
}

export default AddAdmission;
