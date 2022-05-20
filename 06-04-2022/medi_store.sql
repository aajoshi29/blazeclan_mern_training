CREATE TABLE public.medicine
(
    id serial,
    name character varying(100) NOT NULL,
    quantity integer NOT NULL,
    price numeric NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.medicine
    OWNER to postgres;
	
============================================================

CREATE TABLE public.customer
(
    id serial,
    name character varying(100) NOT NULL,
    age integer NOT NULL,
    gender integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.customer
    OWNER to postgres;
	
ALTER TABLE public.customer DROP COLUMN gender;

ALTER TABLE public.customer
    ADD COLUMN gender character varying NOT NULL;

============================================================	

CREATE TABLE public.doctor
(
    id serial,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.doctor
    OWNER to postgres;
	
ALTER TABLE public.doctor
    ADD COLUMN is_registered boolean NOT NULL;

============================================================

CREATE TABLE public.prescription
(
    id serial,
    doctor_id integer NOT NULL,
    customer_id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_doctor FOREIGN KEY (doctor_id)
        REFERENCES public.doctor (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cutomer FOREIGN KEY (customer_id)
        REFERENCES public.customer (id)
        ON DELETE CASCADE
);

ALTER TABLE public.prescription
    OWNER to postgres;

============================================================

CREATE TABLE public.prescription_medicine_mapping
(
    id serial,
    prescription_id integer NOT NULL,
    medicine_id integer NOT NULL,
    quantity integer,
    PRIMARY KEY (id),
    CONSTRAINT fk_prescription FOREIGN KEY (prescription_id)
        REFERENCES public.prescription (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_medicine FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (id)
        ON DELETE CASCADE
);

ALTER TABLE public.prescription_medicine_mapping
    OWNER to postgres;
	
============================================================

CREATE TABLE public.bill
(
    id serial,
    prescription_id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    total numeric NOT NULL,
    amount_paid numeric,
    PRIMARY KEY (id),
    CONSTRAINT fk_prescription FOREIGN KEY (prescription_id)
        REFERENCES public.prescription (id)
);

ALTER TABLE public.bill
    OWNER to postgres;
	
============================================================

CREATE TABLE public.bill_medicine_mapping
(
    id serial,
    bill_id integer NOT NULL,
    medicine_id integer NOT NULL,
    quantity integer NOT NULL,
    amount numeric NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_bill FOREIGN KEY (bill_id)
        REFERENCES public.bill (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_medicine FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (id)
        ON DELETE CASCADE
);

ALTER TABLE public.bill_medicine_mapping
    OWNER to postgres;

============================================================

CREATE TABLE public."order"
(
    id serial,
    medicine_id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    status character varying(100) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_medicine FOREIGN KEY (medicine_id)
        REFERENCES public.medicine (id)
        ON DELETE CASCADE
);

ALTER TABLE public."order"
    OWNER to postgres;

============================================================

INSERT INTO DOCTOR(name, is_registered) VALUES('Adams', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Baker', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Clark', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Davis', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Evans', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Frank', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Ghosh', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Hills', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Irwin', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Jones', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Klein', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Lopez', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Mason', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Nalty', true);
INSERT INTO DOCTOR(name, is_registered) VALUES('Ochoa', true);

=============================================================

INSERT INTO CUSTOMER(name, age, gender) VALUES('Warren Gibson', 29, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Sean Scott', 26, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Leonard Short', 30, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Brian Hunter', 55, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Jake Burgess', 14, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Kevin Turner', 66, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Andrew Berry', 78, 'MALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Emma Vaughan', 20, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Katherine Smith', 39, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Grace Hart', 45, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Sally Brown', 17, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Amy Parsons', 20, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Penelope Cameron', 25, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Bella Carr', 50, 'FEMALE');
INSERT INTO CUSTOMER(name, age, gender) VALUES('Sophie Paterson', 30, 'FEMALE');

===============================================================

INSERT INTO MEDICINE(name, quantity, price) VALUES('Fosamax Alendronate Tablet', 500, 4);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Zovirax Acyclovir Capsule', 200, 10);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Benztropine Tablet', 50, 5);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Urecholine Bethanechol Tablet', 150, 2);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Cleocin Clindamycin Phosphate', 300, 4.5);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Anafranil Clomipramine HCL', 65, 5);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Cardura Doxazosin Mesylate', 78, 3);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Trusopt Dorzolamide HCL', 20, 20);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Paracetamol', 400, 2);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Tramadol', 45, 3.5);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Cetrizine', 17, 6);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Dimercaprol', 200, 3);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Gentamicin', 250, 1.5);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Sinarest', 500, 4);
INSERT INTO MEDICINE(name, quantity, price) VALUES('Cosome', 30, 30);

===========================================================

INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(1, '2020-06-22 19:10:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(2, '2021-02-02 09:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(3, '2022-02-10 05:05:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(4, '2021-06-10 10:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(5, '2022-04-01 05:23:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(6, '2020-02-23 15:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(7, '2018-01-11 06:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(2, '2022-02-24 17:05:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(4, '2021-12-10 15:10:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(7, '2020-10-12 20:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(1, '2022-07-10 14:05:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(15, '2022-02-10 05:05:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(8, '2020-02-22 15:05:25', 'RECEIVED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(9, '2021-08-11 16:05:25', 'ORDERED');
INSERT INTO PUBLIC.ORDER(medicine_id, date, status) VALUES(10, '2021-09-28 15:05:25', 'RECEIVED');

========================================================

INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(1, 1, '2022-07-10 14:05:11');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(1, 2, '2021-06-05 23:10:25');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(2, 3, '2020-04-06 10:11:03');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(3, 4, '2021-11-08 08:20:25');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(3, 10, '2020-12-10 11:23:21');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(3, 11, '2022-09-07 15:12:22');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(4, 2, '2022-05-20 17:04:24');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(5, 1, '2020-06-01 16:32:25');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(6, 7, '2020-10-11 02:50:13');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(7, 15, '2021-12-14 03:11:06');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(8, 5, '2022-09-21 10:16:03');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(9, 12, '2021-04-20 16:13:25');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(10, 15, '2020-12-26 21:42:29');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(11, 8, '2020-08-19 07:13:25');
INSERT INTO PRESCRIPTION(doctor_id, customer_id, date) VALUES(9, 9, '2021-10-01 09:05:28');

========================================================

INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(1, 1, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(1, 2, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(2, 3, 6);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(3, 4, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(3, 10, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(3, 11, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(4, 2, 3);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(4, 1, 1);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(5, 7, 2);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(5, 15, 4);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(6, 8, 4);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(6, 9, 4);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(7, 8, 10);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(8, 5, 3);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(9, 12, 3);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(10, 15, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(11, 8, 10);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(12, 1, 8);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(12, 2, 8);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(12, 3, 8);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(13, 6, 5);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(14, 10, 6);
INSERT INTO PRESCRIPTION_MEDICINE_MAPPING(prescription_id, medicine_id, quantity) VALUES(15, 9, 8);

===============================================================

INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(1, '2022-07-10 14:15:11', 70, 70);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(2, '2021-06-05 23:20:25', 30, 30);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(3, '2020-04-06 10:21:03', 57.5, 57.5);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(4, '2021-11-08 08:30:25', 34, 34);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(5, '2020-12-10 11:33:21', 34, 34);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(6, '2022-09-07 15:22:22', 88, 88);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(7, '2022-05-20 17:14:24', 200, 200);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(8, '2020-06-01 16:42:25', 13.5, 13.5);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(9, '2020-10-11 02:55:13', 9, 9);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(10, '2021-12-14 03:41:06', 150, 150);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(11, '2022-09-21 10:20:03', 200, 200);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(12, '2021-04-20 16:30:25', 152, 152);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(13, '2020-12-26 21:50:29', 25, 25);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(14, '2020-08-19 07:23:25', 21, 21);
INSERT INTO BILL(prescription_id, date, total, amount_paid) VALUES(15, '2021-10-01 09:15:28', 16, 16);

================================================================

INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(1, 1, 5, 20);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(1, 2, 5, 50);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(2, 3, 6, 30);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(3, 4, 5, 10);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(3, 10, 5, 17.5);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(3, 11, 5, 30);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(4, 2, 3, 30);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(4, 1, 1, 4);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(5, 7, 2, 6);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(5, 15, 4, 120);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(6, 8, 4, 80);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(6, 9, 4, 8);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(7, 8, 10, 200);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(8, 5, 3, 13.5);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(9, 12, 3, 9);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(10, 15, 5, 150);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(11, 8, 10, 200);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(12, 1, 8, 32);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(12, 2, 8, 80);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(12, 3, 8, 40);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(13, 6, 5, 25);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(14, 10, 6, 21);
INSERT INTO BILL_MEDICINE_MAPPING(bill_id, medicine_id, quantity, amount) VALUES(15, 9, 8, 16);

=================================================

UPDATE PUBLIC.ORDER SET QUANTITY = 30 where PUBLIC.ORDER.ID IN (1, 3, 5, 7, 9, 11);
UPDATE PUBLIC.ORDER SET QUANTITY = 100 where PUBLIC.ORDER.ID IN (2, 4, 6, 8, 10, 12);
UPDATE PUBLIC.ORDER SET QUANTITY = 50 where PUBLIC.ORDER.ID IN (13, 14, 15);