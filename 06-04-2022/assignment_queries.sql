--Print Customers by Doctor Name

SELECT
   DOCTOR.NAME DOCTOR,
   STRING_AGG (CUSTOMER.NAME, ', ') PATIENTS
FROM
   CUSTOMER 
   INNER JOIN
      PRESCRIPTION 
      ON PRESCRIPTION.CUSTOMER_ID = CUSTOMER.ID 
   INNER JOIN
      DOCTOR 
      ON PRESCRIPTION.DOCTOR_ID = DOCTOR.ID 
GROUP BY
   DOCTOR.NAME
ORDER BY
   DOCTOR.NAME;
   
===============================================================

--Print Count of Customer by Each Doctor Name

SELECT
   DOCTOR.NAME DOCTOR,
   COUNT(CUSTOMER.NAME) NUMBER_OF_PATIENTS 
FROM
   CUSTOMER 
   INNER JOIN
      PRESCRIPTION 
      ON PRESCRIPTION.CUSTOMER_ID = CUSTOMER.ID 
   INNER JOIN
      DOCTOR 
      ON PRESCRIPTION.DOCTOR_ID = DOCTOR.ID 
GROUP BY
   DOCTOR.NAME 
ORDER BY
   DOCTOR.NAME;
   
===========================================================

--Print Prescription Details by Each Doctor Name

SELECT
   DOCTOR.NAME DOCTOR,
   COUNT(PRESCRIPTION.ID) NUMBER_OF_PRESCRIPTIONS 
FROM
   PRESCRIPTION 
   INNER JOIN
      DOCTOR 
      ON PRESCRIPTION.DOCTOR_ID = DOCTOR.ID 
GROUP BY
   DOCTOR.NAME;
   
========================================================

--Print List of Medicines Per Customer Name

SELECT
   CUSTOMER.NAME PATIENT,
   STRING_AGG (MEDICINE.NAME, ', ') MEDICINES 
FROM
   PRESCRIPTION 
   INNER JOIN
      PRESCRIPTION_MEDICINE_MAPPING 
      ON PRESCRIPTION.ID = PRESCRIPTION_MEDICINE_MAPPING.PRESCRIPTION_ID 
   INNER JOIN
      CUSTOMER 
      ON CUSTOMER.ID = PRESCRIPTION.CUSTOMER_ID 
   INNER JOIN
      MEDICINE 
      ON PRESCRIPTION_MEDICINE_MAPPING.MEDICINE_ID = MEDICINE.ID 
GROUP BY
   CUSTOMER.NAME 
ORDER BY
   CUSTOMER.NAME;
   
======================================================

--Print Receivables between 2 Dates

SELECT
   AMOUNT_PAID AMOUNT_PAID_BY_CUSTOMER,
   DATE 
FROM
   BILL 
WHERE
   DATE BETWEEN '2022-01-01' AND '2022-12-31';
   
=======================================================

--Print List of Medicines Ordered between 2 Dates

SELECT
   DATE ORDER_DATE,
   MEDICINE.NAME MEDICINE_ORDERED,
   PUBLIC.ORDER.QUANTITY QUANTITY,
   PUBLIC.ORDER.STATUS STATUS
FROM
   PUBLIC.ORDER 
   INNER JOIN
      MEDICINE 
      ON MEDICINE.ID = PUBLIC.ORDER.MEDICINE_ID 
WHERE
   DATE BETWEEN '2020-01-01' AND '2022-12-31';
   
===================================================

--Print Count of Order placed for each medicine between 2 Dates

SELECT
   MEDICINE.NAME MEDICINE_ORDERED,
   COUNT(PUBLIC.ORDER.ID) 
FROM
   PUBLIC.ORDER 
   INNER JOIN
      MEDICINE 
      ON MEDICINE.ID = PUBLIC.ORDER.MEDICINE_ID 
WHERE
   DATE BETWEEN '2020-01-01' AND '2022-12-31' 
GROUP BY
   MEDICINE.NAME;
   
====================================================

CREATE PROCEDURE SP_GETBILLDETAILSBYCUSTOMERID(P_CUSTOMER_ID INTEGER) LANGUAGE PLPGSQL AS $$ 
BEGIN
   SELECT
      CUSTOMER.NAME,
      STRING_AGG(MEDICINE.NAME, ', ') PURCHASED_MEDICINES,
      BILL.TOTAL BILL_TOTAL,
      BILL.AMOUNT_PAID 
   FROM
      BILL 
      INNER JOIN
         PRESCRIPTION 
         ON BILL.PRESCRIPTION_ID = PRESCRIPTION.ID 
      INNER JOIN
         CUSTOMER 
         ON PRESCRIPTION.CUSTOMER_ID = CUSTOMER.ID 
      INNER JOIN
         BILL_MEDICINE_MAPPING 
         ON BILL.ID = BILL_MEDICINE_MAPPING.BILL_ID 
      INNER JOIN
         MEDICINE 
         ON BILL_MEDICINE_MAPPING.MEDICINE_ID = MEDICINE.ID 
   WHERE
      CUSTOMER.ID = P_CUSTOMER_ID 
   GROUP BY
      BILL_ID,
      CUSTOMER.NAME,
      BILL.TOTAL,
      BILL.AMOUNT_PAID;
END
;
$$