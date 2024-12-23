import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import { getSpecialty, getDoctorById, updateDoctors } from './api';

function UpdateDoctor({ }) {
const { person_id } = useParams();
const navigate=useNavigate();
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    specialty: '',
  });

  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const specialtyData = await getSpecialty();
      setSpecialties(specialtyData);

      const doctorData = await getDoctorById(person_id);
      setValues({
        first_name: doctorData.first_name,
        last_name: doctorData.last_name,
        gender: doctorData.gender,
        specialty: doctorData.specialty_id,
      });
    };
    fetchData();
  }, [person_id]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        specialty_id: values.specialty,
      };
      await updateDoctors(person_id, payload);
      navigate('/ViewDoctors');

     
    } catch (err) {
      console.log('Failed to update doctor');
    }
  };

  return (
    <div className="container">
      <h1>Update Doctor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          placeholder="Enter doctor name"
          name="first_name"
          onChange={handleChanges}
          required
          value={values.first_name}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          placeholder="Enter last name"
          name="last_name"
          onChange={handleChanges}
          required
          value={values.last_name}
        />

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          onChange={handleChanges}
          required
          value={values.gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="specialty">Specialty</label>
        <select
          name="specialty"
          id="specialty"
          onChange={handleChanges}
          required
          value={values.specialty}
        >
          <option value="" disabled>
            Select specialty
          </option>
          {specialties.map((specialty) => (
            <option key={specialty.specialty_id} value={specialty.specialty_id}>
              {specialty.specialty_name}
            </option>
          ))}
        </select>

        <button className="button1" type="submit">Save Doctor</button>
      </form>
    </div>
  );
}

export default UpdateDoctor;
