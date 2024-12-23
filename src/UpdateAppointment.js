import React,{useState, useEffect} from 'react';
import { updateAppointment, getPatients, getDoctor} from './api';
function UpdateAppointment(){

    const statuses = ["Scheduled", "Completed", "Cancelled"];

     const [values, setValues] = useState({
      appointment_date: '',
      time: '',
      patient_id: '',
      doctor_id: '',
      status:'',
       });

      const [patients, setPatients] = useState([]);
      const [doctors, setDoctors] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
                const patientsData = await getPatients();
                setPatients(patientsData);
                const doctorsData = await getDoctor();
                setDoctors(doctorsData);
        };
        fetchData();
    }, []);

       const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          appointment_date: values.appointment_date,
          time: values.time,
          person_id: values.person_id,
          doctor_id: values.doctor_id,
          status: values.status,
        };

         try{
                const response = await updateAppointment(payload);
              }
              catch(error){
                console.log(error);
              }
    };

     const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    const resetInfo=() =>{
        setValues({date: '', time: '', patient_id:'', doctor_id:'',status:'',})
      }

    return (
        <div className="container">
            <h1> Appointment Registration</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="appointment_date" >Appointment Date</label>
                <input type="date" placeholder='Enter appointment date'name='appointment_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.appointment_date}/>
    
                <label htmlFor="time" >Time</label>
                <input type="time" placeholder='Enter time' name='time'
                onChange={(e)=> handleChanges(e)} 
                required value={values.time}/>

                <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                required
                value={values.patient_id}
                >
                <option value="" disabled>Select Patient</option>
                {patients.map((patient) => (
                <option key={patient.patient_id} value={patient.patient_id}>
                {patient.name+ ' '+ patient.surname} 
                </option>
                ))}
                </select>

                <label htmlFor="doctor_id">Select Doctor</label>
                <select
                name="doctor_id"
                id="doctor_id"
                onChange={handleChanges}
                required
                value={values.doctor_id}
                >
                <option value="" disabled>Select Doctor</option>
                {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.name+ ' '+ doctor.surname} 
                </option>
                ))}
                </select>

                <label htmlFor="status" >Status</label>
                <select 
                name="status" 
                id="status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.status}>

                <option value="" disabled>Select status</option>
                {statuses.map((status) => (
                <option key={status} value={status}>
                {status}
                 </option>
                ))}
                </select>

                <button class="button2" type="button" onClick={resetInfo}>Reset</button>
                <button class="button1"type="submit">Save Changes</button>
    
            </form>
          
        </div>
      );
    }
    export default UpdateAppointment;
    
