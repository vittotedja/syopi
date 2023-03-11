CREATE DATABASE shop_db;

USE shop_db;

CREATE TABLE shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    active VARCHAR(20) NOT NULL
);

INSERT INTO shops (name, address, phone_number, active) VALUES 
    ('Walmart', '123 Main St.', '555-1234', "Active"),
    ('Target', '234 Maple St.', '555-3456' , "Active"),
    ('Walgreens', '789 Oak St.', '555-9012', "Active"),
    ('CVS Pharmacy', '567 Pine St.', '555-7890', "Active"),
    ('Walmart Neighborhood Market', '456 Elm St.', '555-5678', "Active"),
    ('Home Depot', '345 Cedar St.', '555-2345', "Active"),
    ('Lowe''s', '678 Oak St.', '555-6789', "Active"),
    ('Costco', '901 Maple St.', '555-0123', "Active"),
    ('Kohl''s', '123 Elm St.', '555-4567', "Active"),
    ('Macy''s', '456 Cedar St.', '555-8901', "Active"),
    ('J.C. Penney', '789 Pine St.', '555-2345', "Active"),
    ('Sears', '234 Oak St.', '555-6789', "Active"),
    ('Best Buy', '567 Maple St.', '555-0123', "Active"),
    ('GameStop', '901 Elm St.', '555-4567', "Active"),
    ('Michaels', '123 Cedar St.', '555-8901', "Active"),
    ('Bed Bath & Beyond', '456 Pine St.', '555-2345', "Active"),
    ('Dollar Tree', '789 Oak St.', '555-6789', "Active"),
    ('Dollar General', '234 Maple St.', '555-0123', "Active"),
    ('Family Dollar', '567 Elm St.', '555-4567', "Active"),
    ('Five Below', '901 Cedar St.', '555-8901', "Active");
