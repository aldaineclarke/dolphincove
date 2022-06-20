DROP DATABASE IF EXISTS `DolphinCoveDB`;

CREATE DATABASE `DolphinCoveDB` CHARSET=latin1 COLLATE = latin1_general_cs;

USE `DolphinCoveDB`;

CREATE TABLE programs(
	program_id	INT NOT NULL AUTO_INCREMENT,
    program VARCHAR(100) NOT NULL,
    description TEXT,
    program_cost FLOAT NOT NULL, 
    PRIMARY KEY(program_id)
);
ALTER TABLE programs AUTO_INCREMENT = 2450;
INSERT INTO programs (program,description, program_cost)
VALUES ("Shark Encounter", "Feel the shrill",69 ),
	   ("Dolphin Swim Adventure","Swim with dolphins in the caribbean", 149 ), 
       ("Encounter"," Perfect for the entire family" , 109 ), 
       ("Admission Plus", "The best of Jamaica in one place!",69 ),
       ("Dolphin Royal Swim", "Maximum Action and Speed",189),
       ("Yaaman Adventure + Swim with Dolphins","The best adventure and culture park in Jamaica",199 );
       
 


CREATE TABLE companies(
	id INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(100) NOT NULL,
    contactInfo VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    defaultPassword VARCHAR(60) NOT NULL,
    PRIMARY KEY(id)
);
ALTER TABLE companies AUTO_INCREMENT = 1000;
INSERT INTO companies(companyName, contactInfo,email, defaultPassword) VALUES ("Dolphin Cove", "8764344433","admin@dolphincove.com","password"); 


CREATE TABLE guestPrograms(
	 id INT AUTO_INCREMENT NOT NULL, 
     program_id INT REFERENCES programs (program_id),
     num_of_guests INT NOT NULL, 
     excursion_date DATE NOT NULL DEFAULT NOW(),
     booking_id INT REFERENCES bookings(bookings_id),
     PRIMARY KEY(id)
);
ALTER TABLE guestPrograms AUTO_INCREMENT = 200;


CREATE TABLE bookings(
	booking_id	INT NOT NULL AUTO_INCREMENT,
    guestName VARCHAR(255) NOT NULL,
    booking_date DATE DEFAULT NOW(),
    origin VARCHAR(255) NOT NULL, 
    payment_id VARCHAR(255) NOT NULL,
    company_id INT NOT NULL REFERENCES companies(id), 
    PRIMARY KEY(booking_id)
);
ALTER TABLE bookings AUTO_INCREMENT = 2475990;


CREATE TABLE admins(
	id INT AUTO_INCREMENT NOT NULL, 
    company_id INT NOT NULL REFERENCES companies (id), 
	email VARCHAR(100) NOT NULL, 
    password VARCHAR(60) NOT NULL, 
    PRIMARY KEY(id)
);

INSERT INTO admins (company_id, email, password)
VALUES(1000, "vainedev@dolphincove.com", "password123");

CREATE TABLE payments(
	payment_id 	INT AUTO_INCREMENT NOT NULL, 
    payment_type VARCHAR(50) NOT NULL,
    date_paid DATE,
    PRIMARY KEY(payment_id)
);

ALTER TABLE payments AUTO_INCREMENT = 5000;


