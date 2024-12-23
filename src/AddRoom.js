import React,{useState,useEffect} from 'react';
import { addRoom, getBuilding } from './api';
import {  useNavigate } from 'react-router-dom';

function AddRoom(){

const navigate = useNavigate();
const statuses = ["Available", "Occupied", "Renovations"];

const resetInfo=() =>{
    setValues({price_per_day: '', building_id: '', availability_status:'',})
  }

const [buildings, setBuildings] = useState([]);
  
  useEffect(() => {
      const fetchData = async () => {
      const buildingData = await getBuilding();
      setBuildings(buildingData);
    };
    fetchData();
  }, []);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [values, setValues] = useState({
     
       price_per_day: '',
       building_id: '',
       availability_status: '',
     });

  const handleSubmit =  async (e) => {
          e.preventDefault();
  
          const payload = {
          price_per_day: values.price_per_day,
          building_id: values.building_id,
          availability_status: values.availability_status,
         
        };
          
      try{
          const response = await addRoom(payload);
          navigate('/RoomAvailability')
        }
      catch(error){
          console.log(error);
        }
      };

return (
    <div className="container">
        <h1> Room Registration</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="price_per_day" >Price:</label>
            <input type="number" placeholder='Enter price' name='price_per_day'
            onChange={(e)=> handleChanges(e)} 
            required value={values.price_per_day}/>

            <label htmlFor="building_id">Select Building</label>
            <select
            name="building_id"
            id="building_id"
            onChange={handleChanges}
            required
            value={values.building_id}
            >
            <option value="" disabled>Select Building</option>
            {buildings.map((building) => (
            <option key={building.building_id} value={building.building_id}>
            {building.building_name} 
            </option>
            ))}
            </select>

            <label htmlFor="availability_status" >Status</label>
            <select 
            name="availability_status" 
            id="availability_status" 
            onChange={(e) => handleChanges(e)} 
            required 
            value={values.availability_status}>

            <option value="" disabled>Select status</option>
            {statuses.map((status) => (
            <option key={status} value={status}>
            {status}
             </option>
            ))}
            </select>

            <button class="button2" type="button" onClick={resetInfo}>Reset</button>
            <button class="button1"type="submit">Save Room</button>

        </form>
      
    </div>
  );
}
export default AddRoom;
