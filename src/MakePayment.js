import React, { useState, useEffect } from 'react';
import { addPayment } from './api';
import { useParams } from 'react-router';

function Payment(){
    const { billing_id } = useParams();

    const [values, setValues] = useState({
        billing_id:billing_id,
        amount_paid:'',
        payment_method:'',
        payment_date:'',
    });

    
    const resetInfo=() =>{
        setValues({amount_paid: '', payment_date: '', payment_method:'', billing_id: billing_id })
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const payload={
            billing_id: values.billing_id,
            amount_paid: values.amount_paid,
            payment_method: values.payment_method,
            payment_date: values.payment_date,

        };

        try{
                const response = await addPayment(payload);
               }
            catch(error){
                console.log(error);
              }

    };

    const paymentMethod = ["Credit Card", "Cash"];

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    return(
        <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="billing_id">Billing ID:</label>
                <input type="text" value={values.billing_id} readOnly  />
                

                <label htmlFor="amount_paid" >Total Amount Paid</label>
                <input type="number" placeholder='Enter total amount paid'name='amount_paid' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.amount_paid}/>

                <label htmlFor="payment_date" >Payment Date</label>
                <input type="date" placeholder='Enter payment date'name='payment_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.payment_date}/>

                <label htmlFor="payment_method" >Payment Method</label>
                <select 
                name="payment_method" 
                id="payment_method" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.payment_method}>

                <option value="" disabled>Select method</option>
                {paymentMethod.map((payment_method) => (
                <option key={payment_method} value={payment_method}>
                {payment_method}
                 </option>
                ))}
                </select>

                <button class="button2" type="button" onClick={resetInfo}>Reset</button>
                <button class="button1"type="submit">Save Payment</button>

            </form>
           

        </div>
    );
}
export default Payment;