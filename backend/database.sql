DROP DATABASE IF EXISTS job_finder;
CREATE DATABASE job_finder;
USE job_finder;

-- USERS TABLE
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('seeker', 'employer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEEKERS TABLE
CREATE TABLE Seekers (
    seeker_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    education VARCHAR(255),
    skills TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- EMPLOYERS TABLE
CREATE TABLE Employers (
    employer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(100),
    industry VARCHAR(100),
    contact_person VARCHAR(100),
    contact_phone VARCHAR(20),
    branch_location VARCHAR(100),
    full_address TEXT,
    verified_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- JOB CATEGORIES TABLE
CREATE TABLE Job_Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE
);

-- JOBS TABLE
CREATE TABLE Jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  -- From Users table
    title VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    stipend FLOAT,
    employment_type ENUM('Part-time', 'Internship', 'Contract') DEFAULT 'Part-time',
    openings INT,
    start_date DATE,
    end_date DATE,
    contact_person VARCHAR(100),
    contact_phone VARCHAR(20),
    full_address TEXT,
    map_placeholder TEXT,  -- Just a text field for now
    category_id INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    status ENUM('open', 'closed') DEFAULT 'open',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Job_Categories(category_id)
);

-- APPLICATIONS TABLE
CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    user_id INT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('applied', 'accepted', 'rejected') DEFAULT 'applied',
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- SAVED JOBS TABLE
CREATE TABLE Saved_Jobs (
    user_id INT,
    job_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);
-- USERS
INSERT INTO Users (full_name, email, password, phone, role) VALUES
('Nitin Kumar', 'nitin@example.com', 'hashedpassword123', NULL, 'seeker'),
('Riya Sharma', 'riya@example.com', 'securepass456', NULL, 'seeker'),
('Ravi Corp', 'ravi@corp.com', 'hashed_pwd3', '8888888881', 'employer'),
('TechSoft Pvt Ltd', 'hr@techsoft.com', 'hashed_pwd4', '8888888882', 'employer'),
('Admin1', 'admin@example.com', 'admin_pass', NULL, 'admin');

-- SEEKERS
INSERT INTO Seekers (user_id, education, skills) VALUES
(1, 'B.Tech CSE, Final Year', 'HTML, CSS, JavaScript'),
(2, 'BCA, Third Year', 'Python, Excel, SQL');

-- EMPLOYERS
INSERT INTO Employers (user_id, company_name, industry, contact_person, contact_phone, branch_location, full_address, verified_status) VALUES
(3, 'Ravi Deliveries', 'Logistics', 'Ravi Verma', '8888888881', 'Delhi', 'A-44, Industrial Area, Delhi', TRUE),
(4, 'TechSoft', 'Education', 'Neha Tiwari', '8888888882', 'Online', 'Tech Park, Sector 21', FALSE);

-- CATEGORIES
INSERT INTO Job_Categories (category_name) VALUES
('Delivery'), ('Tutoring'), ('Data Entry');

-- JOBS
INSERT INTO Jobs (
    user_id, title, description, location, stipend, employment_type, openings,
    start_date, end_date, contact_person, contact_phone, full_address, map_placeholder,
    category_id, deadline, status
) VALUES
(3, 'Evening Delivery Job', 'Deliver groceries in local area.', 'Delhi', 3000, 'Part-time', 3,
 '2025-06-26', '2025-07-10', 'Ravi Verma', '8888888881', 'Delhi Center Warehouse', 'Map Placeholder', 1, '2025-07-10', 'open'),

(4, 'Math Tutor Needed', 'Help student with high school math.', 'Online', 5000, 'Contract', 1,
 '2025-06-25', '2025-07-05', 'Neha Tiwari', '8888888882', 'Online', 'Map Placeholder', 2, '2025-07-05', 'open');

-- APPLICATIONS
INSERT INTO Applications (job_id, user_id, status) VALUES
(1, 1, 'applied'),
(2, 1, 'accepted');

-- SAVED JOBS
INSERT INTO Saved_Jobs (user_id, job_id) VALUES
(1, 2);
