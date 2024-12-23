import React,{useState, useEffect} from 'react';
import { updateBill, getPatients } from './api';
function UpdateBill(){

    const resetInfo=() =>{
        setValues({patient_id: '', amount: '', date: '',status:'',})
      }

    const paymentStatus=["Paid","Unpaid","Pending"]

    const [values, setValues] = useState({
        patient_id: '',
        amount: '',
        date: '',
        status: '',
    });
    const[patients, setPatients]= useState([]);

     useEffect(() => {
            const fetchData = async () => {
                    const patientsData = await getPatients();
                    setPatients(patientsData);
        };
        fetchData();
    }, []);
    
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

      const handleSubmit =  async (e) => {
        e.preventDefault();

        const payload = {
            patient_id: values.patient_id,
            amount: values.amount,
            date: values.date,
            status: values.status,
          };

          try{
                const response = await updateBill(payload);
            }
        catch(error){
                console.log(error);
            }
  
    };

    return(
        <div>
              <form onSubmit={handleSubmit}>
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
                {patient.first_name+ ' '+ patient.last_name} 
                </option>
                ))}
                </select>

                <label htmlFor="amount" >Total Amount</label>
                <input type="number" placeholder='Enter total amount'name='amount' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.amount}/>

                <label htmlFor="date" >Billing Date</label>
                <input type="date" placeholder='Enter date'name='date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.date}/>

                <label htmlFor="status" >Status</label>
                <select 
                name="status" 
                id="status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.status}>

                <option value="" disabled>Select status</option>
                {paymentStatus.map((status) => (
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
export default UpdateBill;