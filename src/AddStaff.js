import React,{useState,useEffect} from 'react';
import { addStaff, getDepartment,getRole } from './api';

function AddStaff(){
  const [departments, setDepartment] = useState([]);
  const [roles, setRoles] = useState([]);

   useEffect(() => {
        const fetchData = async () => {
        const departmentData = await getDepartment();
        setDepartment(departmentData);
        
        const roleData = await getRole();
        setRoles(roleData);
      };
      fetchData();
    }, []);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    department: '',
    role: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload ={
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      department_id: values.department,
      role_id: values.role,
    }

    try{
        const response = await addStaff(payload);
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
        setValues({first_name: '', last_name: '',gender:'', department:'', role:'',})
      }

    return (
        <div className="container">
            <h1> Staff Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name" >Name</label>
                <input type="text" placeholder='Enter staff first name'name='first_name' 
                 onChange={(e)=> handleChanges(e)} 
                 required
                  value={values.first_name}/>
    
                <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name'
                onChange={(e)=> handleChanges(e)}
                 required 
                 value={values.last_name}/>

                <label htmlFor="gender" >Gender</label>
                <select name='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>

                <label htmlFor="department">Select Department</label>
                <select
                name="department"
                id="department"
                onChange={handleChanges}
                required
                value={values.department}
                >
                <option value="" disabled>Select Department</option>
                {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                {department.name} 
                </option>
                ))}
                </select>

                <label htmlFor="role" >Role</label>
                <select 
                name="role" 
                id="role" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.role}>

                <option value="" disabled>Select role</option>
                {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                {role.role_name}
                </option>
                ))}
                </select>


    
                <button class="button2" type="button" onClick={resetInfo}>Reset</button>
                <button class="button1"type="submit">Save</button>
    
            </form>
          
        </div>
      );
    }
    export default AddStaff;
    
