-- 1. Create Database
CREATE DATABASE task_manager_db;
GO
USE task_manager_db;
GO

-- 2. Create Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20)
);
GO

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

-- 5. Insert Users
INSERT INTO Users (name, email, phone_number) VALUES
('Agnes Kitua', 'agneskitua@gmail.com', '0712345678'),
('Luke Kim', 'lukekim@gmail.com', '0723456789'),
('Defla Mwangi', 'deflamwangi@gmail.com', '0734567890'),
('McBride Otieno', 'mcbrideotieno@gmail.com', '0745678901'),
('Jane Doe', 'janedoe@gmail.com', '0756789012');
GO

-- 6. Insert Todos (using GETDATE() for created_at)
INSERT INTO Todos (todo_name, description, created_at, due_date, user_id) VALUES
('Finish AI Report', 'Complete the AI farming assistant report for submission', GETDATE(), '2025-10-25', 1),
('Prepare Hackathon Pitch', 'Create slides and talking points for hackathon presentation', GETDATE(), '2025-10-22', 2),
('Update Portfolio', 'Add new projects to personal website', GETDATE(), '2025-10-30', 3),
('Team Meeting', 'Discuss project milestones and next sprint goals', GETDATE(), '2025-10-23', 4),
('Research ML Models', 'Explore Naive Bayes and Decision Tree models for predictions', GETDATE(), '2025-10-28', 1);
GO

-- 7. Insert Comments
INSERT INTO Comments (comment_name, todo_id, user_id) VALUES
('Remember to include charts in the report', 1, 2),
('The pitch looks great! Just add one more slide.', 2, 3),
('Nice portfolio updates.', 3, 4),
('I’ll bring the meeting notes.', 4, 5),
('Check the accuracy metrics before finalizing.', 5, 1);
GO
