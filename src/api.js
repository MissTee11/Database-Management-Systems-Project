//api/appointments
export const getAppointments = async()=>{
    const response = await fetch('http://localhost:5000/appointments');
    const data = await response.json();
    return data;
};

export const addAppointment = async(appointment) =>{
    const response = await fetch('http://localhost:5000/appointments',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    });
    const data = await response.json();
    return data;
};


export const updateAppointment=async(appointment_id, payload)=>{
    const response = await fetch(`http://localhost:5000/appointments/${appointment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deleteAppointment=async (appointment_id) => {
    const response = await fetch(`http://localhost:5000/appointments/${appointment_id}`, {
        method: 'DELETE',
    });
};

//Admissions
export const getAdmissions = async()=>{
    const response = await fetch('http://localhost:5000/admissions');
    const data = await response.json();
    return data;
};

export const addAdmissions = async(admissions) =>{
    const response = await fetch('http://localhost:5000/admissions',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admissions),
    });
    const data = await response.json();
    return data;
};

export const updateAdmisiions=async(admission_id,payload)=>{
    const response = await fetch(`/admissions/${admission_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deleteAdmission=async (admission_id) => {
    const response = await fetch(`/api/admissions/${admission_id}`, {
        method: 'DELETE',
    });
};

//Bills
export const getBills = async()=>{
    const response = await fetch('http://localhost:5000/billing');
    const data = await response.json();
    return data;
};

export const addBill = async(billing) =>{
    const response = await fetch('http://localhost:5000/billing',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billing),
    });
    const data = await response.json();
    return data;
};
export const updateBill=async(billing_id, payload)=>{
    const response = await fetch(`/billing/${billing_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deleteBill=async (billing_id) => {
    const response = await fetch(`/billing/${billing_id}`, {
        method: 'DELETE',
    });
};
//Doctors
export const getDoctor = async()=>{
    const response = await fetch('http://localhost:5000/doctors');
    const data = await response.json();
    return data;
};
export const getDoctorById = async(person_id)=>{
    const response = await fetch(`http://localhost:5000/doctors/${person_id}`);
    const data = await response.json();
    return data;
};


export const addDoctor = async(doctors) =>{
    const response = await fetch('http://localhost:5000/doctors',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctors),
    });
    const data = await response.json();
    return data;
};

export const updateDoctors=async(person_id,payload)=>{
    const response = await fetch(`http://localhost:5000/doctors/${person_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error('Failed to update doctor:', await response.text());
        throw new Error('Failed to update doctor');
      }
    const result = await response.json();  
    return result;
}

export const deleteDoctor=async (person_id) => {
    const response = await fetch(`http://localhost:5000/doctors/${person_id}`, {
        method: 'DELETE',
    });
};
//Patients
export const getPatients = async()=>{
    const response = await fetch('http://localhost:5000/patients');
    const data = await response.json();
    return data;
};
export const getPatientsById = async(person_id)=>{
    const response = await fetch(`http://localhost:5000/patients/${person_id}`);
    const data = await response.json();
    return data;
};

export const addPatients = async(patients) =>{
    const response = await fetch('http://localhost:5000/patients',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patients),
    });
    const data = await response.json();
    return data;
};
export const updatePatient=async(person_id,payload)=>{
    const response = await fetch(`/patients/${person_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deletePatient=async (person_id) => {
    const response = await fetch(`http://localhost:5000/patients/${person_id}`, {
        method: 'DELETE',
    });
};

//Prescription
export const getPrescriptions = async(medication_id)=>{
    const response = await fetch(`http://localhost:5000/prescriptions?medication_id=${medication_id}`);
    const data = await response.json();
    return data;
};

export const addPrecsriptions = async(prescriptions) =>{
    const response = await fetch('http://localhost:5000/prescriptions',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptions),
    });
    const data = await response.json();
    return data;
};
export const updatePrescription=async(prescription_id,payload)=>{
    const response = await fetch(`/prescriptions/${prescription_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deletePrescription=async (prescription_id) => {
    const response = await fetch(`/prescriptions/${prescription_id}`, {
        method: 'DELETE',
    });
};


//Rooms
export const getRoomById = async(room_id)=>{
    const response = await fetch(`http://localhost:5000/rooms/${room_id}`);
    const data = await response.json();
    return data;
};

export const getRoom = async()=>{
    const response = await fetch('http://localhost:5000/rooms')
    const data = await response.json();
    return data;
};

export const addRoom = async(rooms) =>{
    const response = await fetch('http://localhost:5000/rooms',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rooms),
    });
    const data = await response.json();
    return data;
};
export const updateRoom=async(room_id,payload)=>{
    const response = await fetch(`http://localhost:5000/rooms/${room_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    const data = await response.json();
    return data; 
}

export const deleteRoom=async (room_id) => {
    const response = await fetch(`http://localhost:5000/rooms/${room_id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data; 
};
//Staff
export const getStaff = async()=>{
    const response = await fetch('http://localhost:5000/staff');
    const data = await response.json();
    return data;
};

export const addStaff = async(staff) =>{
    const response = await fetch('http://localhost:5000/staff',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
    });
    const data = await response.json();
    return data;
};
export const updateStaff=async(person_id,payload)=>{
    const response = await fetch(`http://localhost:5000/staff/${person_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deleteStaff=async (person_id) => {
    const response = await fetch(`http://localhost:5000/staff/${person_id}`, {
        method: 'DELETE',
    });
};

//Payments
export const getPayment = async()=>{
    const response = await fetch('http://localhost:5000/paymentdetails');
    const data = await response.json();
    return data;
};

export const addPayment = async(payment) =>{
    const response = await fetch('http://localhost:5000/paymentdetails',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
    });
    const data = await response.json();
    return data;
};

//medications
export const getMedications = async()=>{
    const response = await fetch('http://localhost:5000/medications');
    const data = await response.json();
    return data;
};
export const getMedicationsById = async (medication_id) => {
    const response = await fetch(`http://localhost:5000/medications/${medication_id}`);
    if (!response.ok) {
        throw new Error('Medication not found or server error');
    }
    const data = await response.json();
    return data;
};


//medicalRecords
export const getMedicalRecords = async()=>{
    const response = await fetch('http://localhost:5000/medicalrecords');
    const data = await response.json();
    return data;
};
export const updateRecord=async(record_id,payload)=>{
    const response = await fetch(`/medicalrecords/${record_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

export const deleteRecord=async (record_id) => {
    const response = await fetch(`/medicalrecords/${record_id}`, {
        method: 'DELETE',
    });
};

//specialty
export const getSpecialty = async()=>{
    const response = await fetch('http://localhost:5000/specialties');
    const data = await response.json();
    return data;
};
//Roles
export const getRole = async()=>{
    const response = await fetch('http://localhost:5000/roles');
    const data = await response.json();
    return data;
};
//departments
export const getDepartment = async()=>{
    const response = await fetch('http://localhost:5000/departments');
    const data = await response.json();
    return data;
};

//buildings
export const getBuilding = async()=>{
    const response = await fetch('http://localhost:5000/buildings');
    const data = await response.json();
    return data;
};
//

