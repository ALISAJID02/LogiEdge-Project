-- Create Database
CREATE DATABASE logiedge;
USE logiedge;

-- Customers Table
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(255),
  pan VARCHAR(20),
  gst_number VARCHAR(20),
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items Table
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bills Table
CREATE TABLE bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  subtotal DECIMAL(10,2),
  gst DECIMAL(10,2),
  total DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bill Items Table
CREATE TABLE bill_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT,
  item_id INT,
  qty INT,
  price DECIMAL(10,2)
);