CREATE DATABASE IF NOT EXISTS budget_app;
USE budget_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    es_eliminado BOOLEAN DEFAULT FALSE
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    transaction_type_id INT NOT NULL,
    category_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    es_eliminado BOOLEAN DEFAULT FALSE
);

CREATE TABLE transaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE savings_goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    goal_name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0,
    deadline DATE,
    status INT DEFAULT 0
);

CREATE TABLE diary_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    entry_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    es_eliminado BOOLEAN DEFAULT FALSE
);

# Create and insert data into the types table
INSERT INTO transaction_types (name, description) VALUES ('Income', 'Money received'), ('Expense', 'Money spent');

# Create and insert data into the categories table
INSERT INTO categories (name, description) VALUES ('Food', 'Money spent on food'), ('Transport', 'Money spent on transport'), ('Entertainment', 'Money spent on entertainment'), ('Salary', 'Money received as salary'), ('Gift', 'Money received as a gift'), ('Other', 'Other money received or spent');

# Views

# User transactions summary
CREATE VIEW user_transactions_summary AS
SELECT 
    u.username,
    tt.name AS transaction_type,
    c.name AS category,
    COUNT(t.id) AS number_of_transactions,
    SUM(t.amount) AS total_amount
FROM 
    transactions t
    JOIN users u ON t.user_id = u.id
    JOIN transaction_types tt ON t.transaction_type_id = tt.id
    JOIN categories c ON t.category_id = c.id
WHERE 
    t.es_eliminado = FALSE
GROUP BY 
    u.username, tt.name, c.name;

# Expenses summary monthly
CREATE VIEW monthly_expenses AS
SELECT 
    u.username,
    MONTH(t.transaction_date) AS month,
    YEAR(t.transaction_date) AS year,
    SUM(t.amount) AS total_expenses
FROM 
    transactions t
    JOIN users u ON t.user_id = u.id
    JOIN transaction_types tt ON t.transaction_type_id = tt.id
WHERE 
    tt.name = 'Expense' AND t.es_eliminado = FALSE
GROUP BY 
    u.username, MONTH(t.transaction_date), YEAR(t.transaction_date);

# Monthly balance
CREATE VIEW monthly_balance AS
SELECT 
    u.username,
    MONTH(t.transaction_date) AS month,
    YEAR(t.transaction_date) AS year,
    SUM(CASE WHEN tt.name = 'Income' THEN t.amount ELSE 0 END) - SUM(CASE WHEN tt.name = 'Expense' THEN t.amount ELSE 0 END) AS monthly_balance
FROM 
    transactions t
    JOIN users u ON t.user_id = u.id
    JOIN transaction_types tt ON t.transaction_type_id = tt.id
WHERE 
    t.es_eliminado = FALSE
GROUP BY 
    u.username, MONTH(t.transaction_date), YEAR(t.transaction_date);

# Categories trends
CREATE VIEW category_trends AS
SELECT 
    c.name AS category,
    tt.name AS transaction_type,
    SUM(t.amount) AS total,
    MONTH(t.transaction_date) AS month,
    YEAR(t.transaction_date) AS year
FROM 
    transactions t
    JOIN transaction_types tt ON t.transaction_type_id = tt.id
    JOIN categories c ON t.category_id = c.id
WHERE 
    t.es_eliminado = FALSE
GROUP BY 
    c.name, tt.name, MONTH(t.transaction_date), YEAR(t.transaction_date);

# Saving progress
CREATE VIEW savings_goals_progress AS
SELECT 
    u.username,
    s.goal_name,
    s.target_amount,
    s.current_amount,
    (s.current_amount / s.target_amount) * 100 AS progress_percentage,
    s.deadline
FROM 
    savings_goals s
    JOIN users u ON s.user_id = u.id;
