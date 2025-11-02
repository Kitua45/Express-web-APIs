-- 1. Create Database
CREATE DATABASE taskdb;
GO

USE taskdb;
GO

-- 2. Create Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    password VARCHAR(MAX) NOT NULL
);
GO

ALTER TABLE Users
ADD role VARCHAR(50) NOT NULL DEFAULT 'user';


-- 3. Create Todos Table
CREATE TABLE Todos (
    todo_id INT IDENTITY(1,1) PRIMARY KEY,
    todo_name VARCHAR(150),
    description TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    due_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO

-- 4. Create Comments Table
CREATE TABLE Comments (
    comment_id INT IDENTITY(1,1) PRIMARY KEY,
    comment_name TEXT,
    todo_id INT,
    user_id INT,
    FOREIGN KEY (todo_id) REFERENCES Todos(todo_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO

-- 5. Insert Users first (important!)
INSERT INTO Users (first_name, last_name, email, phone_number, password)
VALUES
('Agnes', 'Kitua', 'agnes.kitua@gmail.com', '0712345678', 'password123'),
('Brian', 'Kemboi', 'brian.kemboi@gmail.com', '0721345678', 'securePass!'),
('Faith', 'Mutua', 'faith.mutua@gmail.com', '0734456789', 'mutuaPass!'),
('James', 'Muriithi', 'james.muriithi@gmail.com', '0798765432', 'jamesPass!'),
('Mercy', 'Wanjiku', 'mercy.wanjiku@gmail.com', '0789456123', 'mercyPass!');
GO

-- 6. Insert Todos (after Users exist)
INSERT INTO Todos (todo_name, description, created_at, due_date, user_id)
VALUES
('Finish AI Report', 'Complete the AI farming assistant report for submission', GETDATE(), '2025-10-25', 1),
('Prepare Hackathon Pitch', 'Create slides and talking points for hackathon presentation', GETDATE(), '2025-10-22', 2),
('Update Portfolio', 'Add new projects to personal website', GETDATE(), '2025-10-30', 3),
('Team Meeting', 'Discuss project milestones and next sprint goals', GETDATE(), '2025-10-23', 4),
('Research ML Models', 'Explore Naive Bayes and Decision Tree models for predictions', GETDATE(), '2025-10-28', 5);
GO

-- 7. Insert Comments (after Todos and Users exist)
INSERT INTO Comments (comment_name, todo_id, user_id)
VALUES
('The AI report draft looks solid; consider refining the introduction.', 1, 1),
('Lets rehearse the hackathon pitch once more before submission.', 2, 2),
('Added new projects to the portfolio, awaiting feedback.', 3, 3),
('Meeting agenda finalized  please review before tomorrow.', 4, 4),
('Tested both ML models; Naive Bayes performed slightly better.', 5, 5);
GO

-- 8. Verify Inserts
SELECT * FROM Users;
SELECT * FROM Todos;
SELECT * FROM Comments;



-- Delete all todo
DELETE FROM Todos;

-- Delete all users
DELETE FROM Users;

DELETE FROM Comments;

DBCC CHECKIDENT ('Users', RESEED, 0);
DBCC CHECKIDENT ('Todos', RESEED, 0);
DBCC CHECKIDENT ('Comments', RESEED, 0);

-- Add verification columns to existing Users table
ALTER TABLE Users
ADD verification_code VARCHAR(10),
    is_verified BIT DEFAULT 0;


