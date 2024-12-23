import React,{useState,useEffect} from 'react';
import { addDoctor, getSpecialty } from './api';
import {  useNavigate } from 'react-router-dom';


function AddDoctor(){

  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);

   useEffect(() => {
        const fetchData = async () => {
        const specialtyData = await getSpecialty();
        setSpecialties(specialtyData);
     };
     fetchData();
     }, []);


   const [values, setValues] = useState({
     first_name: '',
     last_name: '',
     gender: '',
     specialty: '',
   });
   

   const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

    const resetInfo=() =>{
        setValues({first_name: '', last_name: '', gender:'', specialty: '',})
      }

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        specialty_id: values.specialty,
      };
        
    try{
        const response = await addDoctor(payload);
        navigate('/ViewDoctors')

      }
    catch(error){
        console.log(error);
      }
    };

    return (
        <div className="container">
            <h1> Doctor Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name" > First Name</label>
                <input type="text" placeholder='Enter doctor name'name='first_name' 
                 onChange={(e)=> handleChanges(e)} required value={values.first_name}/>
    
                <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name'
                onChange={(e)=> handleChanges(e)} required value={values.last_name}/>

                <label htmlFor="gender" >Gender</label>
                <select name='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
    

                <label htmlFor="specialty" >Specialty</label>
                <select 
                name="specialty" 
                id="specialty" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.specialty}
            >
                <option value="" disabled>Select specialty</option>
                {specialties.map((specialty) => (
                <option key={specialty.specialty_id} value={specialty.specialty_id}>
                {specialty.specialty_name}
                 </option>
    ))}
                </select>

                <button class="button2" type="button" onClick={resetInfo}>Reset</button>
                <button class="button1"type="submit">Save Doctor</button>
    
            </form>
          
        </div>
      );
    }
    export default AddDoctor;
    
