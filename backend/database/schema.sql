CREATE Database HealthCare;

Use HealthCare;

Create Table Patient(
    id int not null auto_increment primary key,
    firstName varchar(255),
    lastName varchar(255),
    phone varchar(255),
    password varchar(255),
    isDeleted TINYINT DEFAULT 0
);

Create Table Clinc(
    id int not null auto_increment primary key,
    email varchar(255),
    password varchar(255),
    phone varchar(255),
    rating int,
    workingDays varchar(255),
    address varchar(255),
    careersLicense varchar(255),
    waitingTime varchar(255),
    consultationFeed varchar(255),
    departmentId int not null,
    doctorId int not null,
    cityId int not null,
    isDeleted TINYINT DEFAULT 0,
    FOREIGN Key(doctorId) REFERENCES Doctor(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN Key(cityId) REFERENCES City(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN Key(departmentId) REFERENCES MedicalDepartment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

Create Table Doctor(
    id int not null auto_increment primary key,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255),
    password varchar(255),
    profileImage varchar(255),
    gender varchar(255),
    Nationality varchar(255),
    specialization varchar(255),
    ScientificCertificate varchar(255),
    isDeleted TINYINT DEFAULT 0
);

Create Table MedicalDepartment(
    id int not null auto_increment primary key,
    Name varchar(255),
    isDeleted TINYINT DEFAULT 0
);

Create Table City(
    id int not null auto_increment primary key,
    Name varchar(255),
    isDeleted TINYINT DEFAULT 0
);