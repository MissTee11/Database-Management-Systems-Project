import { Link } from 'react-router-dom';

function HomePage(){

        return(
            <div>
                <h3>HOSPITAL MANAGEMENT SYSTEM</h3>
                <div className="Homepage">
                <div className="Box">
                    <Link to ='/ViewPatients'>
                    <p>Patients</p>
                    </Link>
                   
                </div>
                <div className="Box">
                    <Link to='/Admissions'>
                    <p>Patient Admissions</p>
                    </Link>
                </div>

                <div className="Box">
                    <Link to='/ViewDoctors'>
                    <p>Doctors</p>
                    </Link>
                </div>

                <div className="Box">
                    <Link to='/ViewDepartments'>
                    <p>Appointments</p>
                    </Link >
                </div>

                <div className="Box">
                    <Link to='/ViewBills'>
                    <p>Bills and Payments</p>
                    </Link>
                </div>

                <div className="Box">
                    <Link to='/Pharmacy'>
                    <p>Pharmacy</p>
                    </Link>
                </div>

                <div className="Box">
                    <Link to='/StaffMembers'>
                    <p>Hospital Staff</p>
                    </Link>
                </div>

                <div className="Box">
                    <Link to='/MedicalRecords'>
                    <p>medical Records</p>
                    </Link>
                </div>

                

                <div className="Box">
                    <Link to='/RoomAvailability'>
                    <p>Rooms</p>
                    </Link>
                </div>
                </div>

                


            </div>

        );
}
export default HomePage;