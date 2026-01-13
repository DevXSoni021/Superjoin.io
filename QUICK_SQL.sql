-- Quick SQL Queries for SuperSync Database
-- Copy and paste these into your database client

-- 1. View all data
SELECT * FROM sheet_data ORDER BY timestamp DESC;

-- 2. View data for Sheet1
SELECT * FROM sheet_data WHERE sheet_name = 'Sheet1' ORDER BY row_num;

-- 3. Count total records
SELECT COUNT(*) as total FROM sheet_data;

-- 4. Insert test data
INSERT INTO sheet_data (sheet_name, row_num, row_data, source)
VALUES ('Sheet1', 100, '["SQL Test", "123", "Database"]'::jsonb, 'Manual SQL')
ON CONFLICT (sheet_name, row_num)
DO UPDATE SET 
    row_data = EXCLUDED.row_data,
    timestamp = CURRENT_TIMESTAMP,
    source = 'Manual SQL';

-- 5. Update a row
UPDATE sheet_data
SET row_data = '["Updated", "Value", "Here"]'::jsonb,
    timestamp = CURRENT_TIMESTAMP
WHERE sheet_name = 'Sheet1' AND row_num = 1;

-- 6. Delete a row
DELETE FROM sheet_data
WHERE sheet_name = 'Sheet1' AND row_num = 5;

-- 7. View recent updates
SELECT id, sheet_name, row_num, row_data, source, timestamp 
FROM sheet_data 
ORDER BY timestamp DESC 
LIMIT 10;

-- 8. View statistics
SELECT 
    COUNT(*) as total_rows,
    COUNT(DISTINCT sheet_name) as unique_sheets,
    MIN(timestamp) as first_entry,
    MAX(timestamp) as last_entry
FROM sheet_data;
