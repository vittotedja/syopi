CREATE DATABASE shop_db;

USE shop_db;

CREATE TABLE shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

INSERT INTO shops (name, address, phone_number) VALUES 
    ('Walmart', '123 Main St.', '555-1234'),
    ('Target', '234 Maple St.', '555-3456'),
    ('Walgreens', '789 Oak St.', '555-9012'),
    ('CVS Pharmacy', '567 Pine St.', '555-7890'),
    ('Walmart Neighborhood Market', '456 Elm St.', '555-5678'),
    ('Home Depot', '345 Cedar St.', '555-2345'),
    ('Lowe''s', '678 Oak St.', '555-6789'),
    ('Costco', '901 Maple St.', '555-0123'),
    ('Kohl''s', '123 Elm St.', '555-4567'),
    ('Macy''s', '456 Cedar St.', '555-8901'),
    ('J.C. Penney', '789 Pine St.', '555-2345'),
    ('Sears', '234 Oak St.', '555-6789'),
    ('Best Buy', '567 Maple St.', '555-0123'),
    ('GameStop', '901 Elm St.', '555-4567'),
    ('Michaels', '123 Cedar St.', '555-8901'),
    ('Bed Bath & Beyond', '456 Pine St.', '555-2345'),
    ('Dollar Tree', '789 Oak St.', '555-6789'),
    ('Dollar General', '234 Maple St.', '555-0123'),
    ('Family Dollar', '567 Elm St.', '555-4567'),
    ('Five Below', '901 Cedar St.', '555-8901');
