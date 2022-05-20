CREATE TABLE `medi_store`.`medicine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`));

==========================================

CREATE TABLE `medi_store`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `age` INT NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

==========================================

CREATE TABLE `medi_store`.`doctor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `is_registered` TINYINT NOT NULL,
  PRIMARY KEY (`id`));

==========================================

CREATE TABLE `medi_store`.`prescription` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `f_doctor_idx` (`doctor_id` ASC) VISIBLE,
  INDEX `f_customer_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `f_doctor`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `medi_store`.`doctor` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `f_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `medi_store`.`customer` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

===========================================

CREATE TABLE `medi_store`.`prescription_medicine_mapping` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prescription_id` INT NOT NULL,
  `medicine_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `f_prescription_idx` (`prescription_id` ASC) VISIBLE,
  INDEX `f_medicine_idx` (`medicine_id` ASC) VISIBLE,
  CONSTRAINT `f_prescription`
    FOREIGN KEY (`prescription_id`)
    REFERENCES `medi_store`.`prescription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_medicine`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `medi_store`.`medicine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

============================================

CREATE TABLE `medi_store`.`bill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prescription_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `amount_paid` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `f_prescription_idx` (`prescription_id` ASC) VISIBLE,
  CONSTRAINT `fk_prescription`
    FOREIGN KEY (`prescription_id`)
    REFERENCES `medi_store`.`prescription` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


============================================

CREATE TABLE `medi_store`.`bill_medicine_mapping` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bill_id` INT NOT NULL,
  `medicine_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bill_idx` (`bill_id` ASC) VISIBLE,
  INDEX `fk_medicine_idx` (`medicine_id` ASC) VISIBLE,
  CONSTRAINT `fk_bill`
    FOREIGN KEY (`bill_id`)
    REFERENCES `medi_store`.`bill` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medicine`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `medi_store`.`medicine` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

=======================================

CREATE TABLE `medi_store`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medicine_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `status` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medicine_idx` (`medicine_id` ASC) VISIBLE,
  CONSTRAINT `fk__medicine`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `medi_store`.`medicine` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

========================================================

INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Adams', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Baker', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Clark', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Davis', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Evans', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Frank', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Ghosh', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Hills', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Irwin', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Jones', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Klein', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Lopez', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Mason', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Nalty', true);
INSERT INTO `medi_store`.`DOCTOR`(name, is_registered) VALUES('Ochoa', true);

=========================================================

INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Warren Gibson', 29, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Sean Scott', 26, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Leonard Short', 30, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Brian Hunter', 55, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Jake Burgess', 14, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Kevin Turner', 66, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Andrew Berry', 78, 'MALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Emma Vaughan', 20, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Katherine Smith', 39, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Grace Hart', 45, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Sally Brown', 17, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Amy Parsons', 20, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Penelope Cameron', 25, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Bella Carr', 50, 'FEMALE');
INSERT INTO `medi_store`.`customer`(name, age, gender) VALUES('Sophie Paterson', 30, 'FEMALE');

==========================================================

INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Fosamax Alendronate Tablet', 500, 4);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Zovirax Acyclovir Capsule', 200, 10);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Benztropine Tablet', 50, 5);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Urecholine Bethanechol Tablet', 150, 2);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Cleocin Clindamycin Phosphate', 300, 4.5);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Anafranil Clomipramine HCL', 65, 5);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Cardura Doxazosin Mesylate', 78, 3);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Trusopt Dorzolamide HCL', 20, 20);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Paracetamol', 400, 2);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Tramadol', 45, 3.5);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Cetrizine', 17, 6);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Dimercaprol', 200, 3);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Gentamicin', 250, 1.5);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Sinarest', 500, 4);
INSERT INTO `medi_store`.`medicine`(name, quantity, price) VALUES('Cosome', 30, 30);

===========================================================

INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(1, '2020-06-22', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(2, '2021-02-02', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(3, '2022-02-10', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(4, '2021-06-10', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(5, '2022-04-01', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(6, '2020-02-23', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(7, '2018-01-11', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(2, '2022-02-24', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(4, '2021-12-10', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(7, '2020-10-12', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(1, '2022-07-10', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(15, '2022-02-10', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(8, '2020-02-22', 'RECEIVED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(9, '2021-08-11', 'ORDERED');
INSERT INTO `medi_store`.`order`(medicine_id, date, status) VALUES(10, '2021-09-28', 'RECEIVED');

=============================================================

INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(1, 1, '2022-07-10');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(1, 2, '2021-06-05');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(2, 3, '2020-04-06');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(3, 4, '2021-11-08');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(3, 10, '2020-12-10');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(3, 11, '2022-09-07');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(4, 2, '2022-05-20');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(5, 1, '2020-06-01');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(6, 7, '2020-10-11');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(7, 15, '2021-12-14');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(8, 5, '2022-09-21');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(9, 12, '2021-04-20');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(10, 15, '2020-12-26');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(11, 8, '2020-08-19');
INSERT INTO `medi_store`.`prescription`(doctor_id, customer_id, date) VALUES(9, 9, '2021-10-01');

=============================================================

INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(1, 1, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(1, 2, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(2, 3, 6);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(3, 4, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(3, 10, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(3, 11, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(4, 2, 3);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(4, 1, 1);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(5, 7, 2);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(5, 15, 4);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(6, 8, 4);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(6, 9, 4);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(7, 8, 10);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(8, 5, 3);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(9, 12, 3);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(10, 15, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(11, 8, 10);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(12, 1, 8);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(12, 2, 8);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(12, 3, 8);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(13, 6, 5);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(14, 10, 6);
INSERT INTO `medi_store`.`prescription_medicine_mapping`(prescription_id, medicine_id, quantity) VALUES(15, 9, 8);

================================================================

INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(1, '2022-07-10', 70, 70);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(2, '2021-06-05', 30, 30);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(3, '2020-04-06', 57.5, 57.5);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(4, '2021-11-08', 34, 34);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(5, '2020-12-10', 34, 34);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(6, '2022-09-07', 88, 88);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(7, '2022-05-20', 200, 200);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(8, '2020-06-01', 13.5, 13.5);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(9, '2020-10-11', 9, 9);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(10, '2021-12-14', 150, 150);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(11, '2022-09-21', 200, 200);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(12, '2021-04-20', 152, 152);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(13, '2020-12-26', 25, 25);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(14, '2020-08-19', 21, 21);
INSERT INTO `medi_store`.`bill`(prescription_id, date, total, amount_paid) VALUES(15, '2021-10-01', 16, 16);

============================================================

INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(1, 1, 5, 20);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(1, 2, 5, 50);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(2, 3, 6, 30);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(3, 4, 5, 10);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(3, 10, 5, 17.5);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(3, 11, 5, 30);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(4, 2, 3, 30);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(4, 1, 1, 4);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(5, 7, 2, 6);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(5, 15, 4, 120);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(6, 8, 4, 80);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(6, 9, 4, 8);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(7, 8, 10, 200);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(8, 5, 3, 13.5);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(9, 12, 3, 9);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(10, 15, 5, 150);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(11, 8, 10, 200);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(12, 1, 8, 32);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(12, 2, 8, 80);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(12, 3, 8, 40);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(13, 6, 5, 25);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(14, 10, 6, 21);
INSERT INTO `medi_store`.`bill_medicine_mapping`(bill_id, medicine_id, quantity, amount) VALUES(15, 9, 8, 16);