CREATE TABLE person(
person_ID SERIAL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
gender VARCHAR(10) CHECK (gender IN ('Male','Female')),
CONSTRAINT personPK PRIMARY KEY (person_ID)
);

CREATE TABLE patients(
date_of_birth DATE NOT NULL,
contact_number BIGINT NOT NULL CHECK(contact_number>0 AND LENGTH(contact_number::TEXT) BETWEEN 10 AND 15),
city VARCHAR(100) NOT NULL,
person_ID INTEGER,
FOREIGN KEY (person_ID) REFERENCES person(person_ID) ON DELETE CASCADE,
CONSTRAINT patientPK PRIMARY KEY (person_ID)
);

CREATE TABLE doctors(
specialty_ID INTEGER NOT NULL,
person_ID INTEGER,
FOREIGN KEY(specialty_ID) REFERENCES specialties(specialty_ID)ON DELETE SET NULL,
FOREIGN KEY (person_ID) REFERENCES person(person_ID) ON DELETE CASCADE,
CONSTRAINT doctorPK PRIMARY KEY (person_ID)
);

CREATE TABLE staff(
role_ID INTEGER,
department_ID INTEGER NOT NULL,
person_ID INTEGER,
FOREIGN KEY (role_ID) REFERENCES roles(role_ID),
FOREIGN KEY (department_ID) REFERENCES departments(department_ID)ON DELETE SET NULL,
FOREIGN KEY (person_ID) REFERENCES person(person_ID) ON DELETE CASCADE,
CONSTRAINT staffPK PRIMARY KEY (person_ID)
);

CREATE TABLE specialties(
specialty_ID SERIAL PRIMARY KEY,
specialty_name VARCHAR(100) NOT NULL
);

INSERT INTO specialties (specialty_name) VALUES 
('Cardiology'),
('Neurology'),
('Radiology'),
('Psychiatry'),
('Pediatrics'),
('Dermatology'),
('Orthopedics'),
('General Surgery'),
('Obstetrics and Gynecology'),
('Emergency Medicine'),
('Family Medicine'),
('Gastroenterology');

CREATE TABLE roles(
role_ID SERIAL PRIMARY KEY,
role_name VARCHAR(100) NOT NULL
);

INSERT INTO roles (role_name) VALUES 
('Administrator'),
('Nurse'),
('Receptionist'),
('Pharmacist'),
('Medical Assistant'),
('Billing Specialist'),
('Janitor'),
('Surgeon'),
('Anesthesiologist');

CREATE TABLE departments(
department_ID SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL
);

INSERT INTO departments (name) VALUES 
('Cardiology'),
('Neurology'),
('Radiology'),
('Psychiatry'),
('Pediatrics'),
('Dermatology'),
('Orthopedics'),
('General Surgery'),
('Obstetrics and Gynecology'),
('Emergency Medicine'),
('Family Medicine'),
('Gastroenterology');

CREATE TABLE appointments(
appointment_ID SERIAL PRIMARY KEY,
patient_ID INTEGER,
doctor_ID INTEGER,
appointment_date DATE,
time TIME,
status VARCHAR(20) CHECK (status IN ('Scheduled','Completed','Cancelled')),
FOREIGN KEY (patient_ID) REFERENCES patients(person_ID) ON DELETE CASCADE,
FOREIGN KEY (doctor_ID) REFERENCES doctors(person_ID) ON DELETE CASCADE
);

CREATE TABLE PaymentDetails (
payment_ID SERIAL PRIMARY KEY,
billing_ID INTEGER NOT NULL,
amount_paid NUMERIC(12,2) NOT NULL,
payment_date DATE NOT NULL,
payment_method VARCHAR(50) CHECK (payment_method IN('Credit Card','Cash'))NOT NULL,
FOREIGN KEY (billing_ID) REFERENCES billing(billing_ID) ON DELETE CASCADE
);

CREATE TABLE billing(
billing_ID SERIAL PRIMARY KEY,
patient_ID INTEGER,
total_amount NUMERIC(12,2),
billing_date DATE,
payment_status VARCHAR(20) DEFAULT 'Pending' CHECK(payment_status IN ('Paid','Unpaid','Pending')),
FOREIGN KEY (patient_ID) REFERENCES patients(person_ID) ON DELETE CASCADE
);

CREATE TABLE rooms(
room_ID SERIAL PRIMARY KEY,
price_per_day NUMERIC(10,2) NOT NULL,
building_ID INTEGER NOT NULL,
availability_status VARCHAR(20) CHECK(availability_status IN('Available','Occupied','Renovations'))NOT NULL,
FOREIGN KEY (building_ID) REFERENCES buildings(building_ID) ON DELETE CASCADE
);

CREATE TABLE buildings(
building_ID SERIAL PRIMARY KEY,
building_name VARCHAR(100) NOT NULL
);

INSERT INTO buildings (building_name)
VALUES
('Main Hospital Building'),
('Emergency Care Unit'),
('Surgical Wing'),
('Pediatrics Center'),
('Maternity Ward'),
('Outpatient Clinic'),
('Radiology Department'),
('Psychiatric Care Building');

CREATE TABLE medicalRecords(
record_ID SERIAL PRIMARY KEY,
appointment_ID INTEGER,
patient_ID INTEGER,
doctor_ID INTEGER,
diagnosis VARCHAR(255),
prescription_ID INTEGER DEFAULT NULL,
FOREIGN KEY (appointment_ID) REFERENCES appointments(appointment_ID) ON DELETE CASCADE,
FOREIGN KEY (patient_ID) REFERENCES patients(person_ID) ON DELETE CASCADE,
FOREIGN KEY (doctor_ID) REFERENCES doctors(person_ID) ON DELETE CASCADE,
FOREIGN KEY (prescription_ID) REFERENCES prescriptions(prescription_ID) ON DELETE CASCADE
);

CREATE TABLE prescriptions(
prescription_ID SERIAL PRIMARY KEY,
patient_ID INTEGER NOT NULL,
medication_ID INTEGER,
amount BIGINT CHECK (amount>0),
dosage_instructions VARCHAR(255),
FOREIGN KEY (patient_ID) REFERENCES patients(person_ID) ON DELETE CASCADE,
FOREIGN KEY (medication_ID) REFERENCES medications(medication_ID) ON DELETE CASCADE
);

CREATE TABLE medications(
medication_ID SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description VARCHAR(255),
price BIGINT CHECK(price>0),
stock_amount BIGINT CHECK(stock_amount>=0) DEFAULT 0
);

INSERT INTO medications (name, description, price, stock_amount) VALUES
('Aspirin', 'Reduce pain, fever, or inflammation.', 500, 200),
('Paracetamol', 'pain reliever and treatment for fever.', 300, 150),
('Ibuprofen', 'reducing fever, pain, and inflammation.', 600, 100),
('Amoxicillin', 'An antibiotic', 800, 120),
('Lisinopril', ' treat high blood pressure and heart failure.', 1200, 80),
('Metformin', ' manage type 2 diabetes', 1500, 100),
('Omeprazole', 'for gastroesophageal reflux disease (GERD) and ulcers.', 900, 140),
('Diphenhydramine', ' treat allergies, hay fever, and cold symptoms.', 400, 180),
('Prednisone', ' conditions like arthritis, blood disorders, and autoimmune diseases.', 2000, 60),
('Cetirizine', ' treat allergy symptoms ', 350, 220);

CREATE TABLE admissions(
admission_ID SERIAL PRIMARY KEY,
patient_ID INTEGER NOT NULL,
room_ID INTEGER NOT NULL,
admission_date DATE NOT NULL,
discharge_date DATE,
FOREIGN KEY (patient_ID) REFERENCES patients(person_ID) ON DELETE CASCADE,
FOREIGN KEY (room_ID) REFERENCES rooms(room_ID) ON DELETE SET NULL
);

/*TRIGGERS*/
CREATE OR REPLACE FUNCTION checkPersonRepeatition()
RETURNS TRIGGER 
AS 
$$
BEGIN
	IF EXISTS (SELECT 1 FROM staff WHERE person_ID = NEW.person_ID) THEN
	RAISE EXCEPTION 'This person cannot be both staff and doctor';
	END IF;

	IF EXISTS(SELECT 1 FROM doctors WHERE person_ID=NEW.person_ID)THEN
	RAISE EXCEPTION 'This person cannot be both staff and doctor';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER checkStaffInDoctor
BEFORE INSERT OR UPDATE ON doctors
FOR EACH ROW EXECUTE FUNCTION checkPersonRepeatition();

CREATE TRIGGER checkDoctorInStaff
BEFORE INSERT OR UPDATE ON staff
FOR EACH ROW EXECUTE FUNCTION checkPersonRepeatition();

CREATE OR REPLACE FUNCTION changePaymentStatus()
RETURNS TRIGGER
AS
$$
	BEGIN
		UPDATE billing
		SET payment_status = 'Paid'
		WHERE billing_ID = NEW.billing_ID;
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER paymentStatusTrigger
AFTER INSERT ON PaymentDetails
FOR EACH ROW
EXECUTE FUNCTION changePaymentStatus();

CREATE OR REPLACE FUNCTION adjust_stock()
RETURNS TRIGGER
AS
$$
BEGIN
	UPDATE medications
	SET stock_amount = stock_amount - NEW.amount
	WHERE medication_ID = NEW.medication_ID;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER change_stock
AFTER INSERT ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION adjust_stock();

CREATE OR REPLACE FUNCTION roomAvailabilityy()
RETURNS TRIGGER 
AS
$$
BEGIN

	IF NEW.discharge_date IS NOT NULL THEN
	UPDATE rooms
	SET availability_status = 'Available'
	WHERE room_ID = NEW.room_ID;
	END IF;

	RETURN NEW;

END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER change_room_availability
AFTER UPDATE OF discharge_date ON admissions
FOR EACH ROW
WHEN(NEW.discharge_date IS NOT NULL)
EXECUTE FUNCTION roomAvailabilityy();

/*FUNCTIONS*/

CREATE OR REPLACE FUNCTION PatienInCityCount(city_name VARCHAR)
RETURNS INTEGER AS
$$
DECLARE
patient_count INTEGER;
BEGIN
	SELECT COUNT(*)
	INTO patient_count
	FROM patients
	WHERE city= city_name;

	RETURN patient_count;
END;
$$ LANGUAGE plpgsql;

SELECT PatienInCityCount('Ankara');

CREATE OR REPLACE PROCEDURE billingSummary(patientID INTEGER)
LANGUAGE plpgsql
AS
$$
DECLARE
	total_billed NUMERIC(12,2);
	total_paid NUMERIC(12,2);
	outstanding_balance NUMERIC(12,2);
BEGIN
SELECT COALESCE(SUM(total_amount),0)INTO total_paid
FROM PaymentDetails
WHERE billing_ID IN(SELECT billing_ID FROM billing WHERE patient_ID = patientID);
outstanding_balance:=total_billed - total_paid;

RAISE NOTICE 'Patient ID %, Total Billed: %, Total Paid: %, Outstanding Balance: %',
patientID, total_billed, total_paid, outstanding_balance;

END;
$$;

CALL billingSummary(1);

CREATE OR REPLACE FUNCTION occupiedRoom(p_room_ID INTEGER)
RETURNS VOID
AS 
$$
BEGIN

UPDATE rooms
SET availability_status='Occupied'
WHERE room_ID = p_room_ID;

END;
$$ LANGUAGE plpgsql;

SELECT occupiedRoom(2);

CREATE OR REPLACE FUNCTION calculate_patient_age(patient_id INTEGER)
RETURNS INTEGER AS
$$
DECLARE
    patient_age INTEGER;
BEGIN
    SELECT EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) INTO patient_age
    FROM patients
    WHERE person_id = patient_id;

    RETURN patient_age;
END;
$$ LANGUAGE plpgsql;


SELECT calculate_patient_age(8);

