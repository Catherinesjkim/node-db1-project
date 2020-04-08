-- write SQL statements against a pre-populated database using an online tool. Once you have the correct SQL Statement for each query, write it inside the queries.sql file under the appropriate heading.

-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM [Customers] 
WHERE PostalCode LIKE '1010';

-- Find the phone number for the supplier with the id 11
SELECT Phone FROM [Suppliers]
WHERE SupplierID LIKE '11'; 
-- Phone (010) 9984510 - correct

-- List LAST 10 orders placed, sorted DESCENDING by the order date - The order with date 1997-02-12 should be at the top.
SELECT OrderDate FROM [Orders]
where OrderDate
order by OrderDate DESC limit 10

-- Find all customers that live in London, Madrid, or Brazil
SELECT * 
FROM [Customers]
WHERE City='London' OR City='Madrid' OR Country='Brazil';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth');

-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE [Customers] 
SET PostalCode = '11122'
WHERE ContactName = 'Bilbo Baggins';

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT City
FROM Customers
GROUP BY City
HAVING ( COUNT(City) = 1 );

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT * from Suppliers 
WHERE length(SupplierName) > 20;
