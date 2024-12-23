import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from './App'
import HomePage from './HomePage'
import AddAdmission from './AddAdmission'
import AddAppointment from './AddAppointment'
import AddBill from './AddBill'
import AddDoctor from './AddDoctor'
import UpdateDoctor from './UpdateDoctor'
import AddPatient from './AddPatient'
import AddPrescription from './AddPrescription'
import AddRoom from './AddRoom'
import UpdateRoom from './UpdateRoom'
import AddStaff from './AddStaff'
import Admissions from './Admissions'
import MakePayment from './MakePayment'
import Pharmacy from './Pharmacy'
import RoomAvailability from './RoomAvailability'
import StaffMmembers from './StaffMembers'
import ViewAppointment from './ViewAppointments'
import ViewBills from './ViewBills'
import ViewDepartments from './ViewDepartments'
import ViewDoctors from './ViewDoctors'
import ViewMedicalRecords from './ViewMedicalRecords'
import ViewPatients from './ViewPatients'
import ViewPrescription from './ViewPrescription'


function AppRouter(){
    return(
        <BrowserRouter>
        
        <Routes>
            <Route path = '/' element={<App/>}/>
            <Route path = '/AddAdmission' element={<AddAdmission/>} />
            <Route path = '/AddAppointment' element={<AddAppointment/>} />
            <Route path = '/AddBill' element={<AddBill/>} />
            <Route path = '/AddDoctor' element={<AddDoctor/>} />
            <Route path = '/UpdateDoctor/:person_id' element={<UpdateDoctor/>} />
            <Route path = '/AddPatient' element={<AddPatient/>} />
            <Route path = '/AddPrescription/' element={<AddPrescription/>} />
            <Route path = '/AddRoom' element={<AddRoom/>} />
            <Route path = 'UpdateRoom/:room_id' element={<UpdateRoom/>} />
            <Route path = '/AddStaff' element={<AddStaff/>} />
            <Route path = '/Admissions' element={<Admissions/>} />
            <Route path = '/HomePage' element={<HomePage/>} />
            <Route path = '/MakePayment' element={<MakePayment/>} />
            <Route path = '/Pharmacy' element={<Pharmacy/>} />
            <Route path = '/RoomAvailability' element={<RoomAvailability/>} />
            <Route path = '/StaffMembers' element={<StaffMmembers/>} />
            <Route path = '/ViewAppointment' element={<ViewAppointment/>} />
            <Route path = '/ViewBills' element={<ViewBills/>} />
            <Route path = '/ViewDepartments' element={<ViewDepartments/>} />
            <Route path = '/ViewDoctors' element={<ViewDoctors/>} />
            <Route path = '/ViewMedicalRecords' element={<ViewMedicalRecords/>} />
            <Route path = '/ViewPatients' element={<ViewPatients/>} />
            <Route path = '/ViewPrescription' element={<ViewPrescription/>} />
        </Routes>
        </BrowserRouter>
    )
}
export default AppRouter