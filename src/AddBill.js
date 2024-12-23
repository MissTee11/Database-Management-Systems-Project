import React,{useState, useEffect} from 'react';
import { addBill, getPatients } from './api';
function AddBill(){

    const resetInfo=() =>{
        setValues({patient_id: '', total_amount: '', billing_date: '',payment_status:'',})
      }

    const paymentStatus=["Paid","Unpaid","Pending"]

    const [values, setValues] = useState({
        patient_id: '',
        total_amount: '',
        billing_date: '',
        payment_status: '',
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
            total_amount: values.total_amount,
            billing_date: values.billing_date,
            payment_status: values.payment_status,
          };

          try{
                const response = await addBill(payload);
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

                <label htmlFor="total_amount" >Total Amount</label>
                <input type="number" placeholder='Enter total amount'name='total_amount' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.total_amount}/>

                <label htmlFor="billing_date" >Billing Date</label>
                <input type="date" placeholder='Enter date'name='billing_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.billing_date}/>

                <label htmlFor="payment_status" >Status</label>
                <select 
                name="payment_status" 
                id="payment_status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.payment_status}>

                <option value="" disabled>Select status</option>
                {paymentStatus.map((status) => (
                <option key={status} value={status}>
                {status}
                 </option>
                ))}
                </select>

                <button class="button2" type="button" onClick={resetInfo}>Reset</button>
                <button class="button1"type="submit">Save Bill</button>

            </form>

           

        </div>
    );
}
export default AddBill;