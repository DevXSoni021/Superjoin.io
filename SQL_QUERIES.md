# 📊 SQL Queries for SuperSync Database

## 🔗 Database Connection

**Connection String:**
```
postgresql://neondb_owner:npg_Lr9vwQd0nJxU@ep-broad-cherry-ahuqztb9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 📋 Useful SQL Queries

### 1. View All Data
```sql
SELECT * FROM sheet_data 
ORDER BY timestamp DESC;
```

### 2. View Data by Sheet Name
```sql
SELECT * FROM sheet_data 
WHERE sheet_name = 'Sheet1'
ORDER BY row_num;
```

### 3. View Specific Row
```sql
SELECT * FROM sheet_data 
WHERE sheet_name = 'Sheet1' AND row_num = 1;
```

### 4. Count Total Records
```sql
SELECT COUNT(*) as total_records FROM sheet_data;
```

### 5. View Data by Source
```sql
SELECT * FROM sheet_data 
WHERE source = 'API Request'
ORDER BY timestamp DESC;
```

### 6. View Recent Updates (Last 10)
```sql
SELECT id, sheet_name, row_num, row_data, source, timestamp 
FROM sheet_data 
ORDER BY timestamp DESC 
LIMIT 10;
```

### 7. View Data with Formatted JSON
```sql
SELECT 
    id,
    sheet_name,
    row_num,
    row_data::text as row_data_json,
    source,
    timestamp
FROM sheet_data
ORDER BY timestamp DESC;
```

### 8. Insert Test Data Manually
```sql
INSERT INTO sheet_data (sheet_name, row_num, row_data, source)
VALUES ('Sheet1', 10, '["Test", "123", "Manual"]'::jsonb, 'Manual SQL')
ON CONFLICT (sheet_name, row_num)
DO UPDATE SET 
    row_data = EXCLUDED.row_data,
    timestamp = CURRENT_TIMESTAMP,
    source = 'Manual SQL';
```

### 9. Update Existing Row
```sql
UPDATE sheet_data
SET 
    row_data = '["Updated", "Value", "Here"]'::jsonb,
    timestamp = CURRENT_TIMESTAMP,
    source = 'Manual SQL'
WHERE sheet_name = 'Sheet1' AND row_num = 1;
```

### 10. Delete a Row
```sql
DELETE FROM sheet_data
WHERE sheet_name = 'Sheet1' AND row_num = 5;
```

### 11. Delete All Data (Be Careful!)
```sql
DELETE FROM sheet_data;
```

### 12. View Table Structure
```sql
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'sheet_data';
```

### 13. Check if Trigger Exists
```sql
SELECT 
    tgname as trigger_name,
    tgrelid::regclass as table_name
FROM pg_trigger
WHERE tgname = 'notify_url_trigger';
```

### 14. View Trigger Function
```sql
SELECT 
    proname as function_name,
    prosrc as function_body
FROM pg_proc
WHERE proname = 'notify_url';
```

### 15. View Data Grouped by Sheet
```sql
SELECT 
    sheet_name,
    COUNT(*) as row_count,
    MAX(timestamp) as last_updated
FROM sheet_data
GROUP BY sheet_name
ORDER BY last_updated DESC;
```

### 16. Find Duplicate Rows
```sql
SELECT 
    sheet_name,
    row_num,
    COUNT(*) as count
FROM sheet_data
GROUP BY sheet_name, row_num
HAVING COUNT(*) > 1;
```

### 17. View Data with Pretty JSON
```sql
SELECT 
    id,
    sheet_name,
    row_num,
    jsonb_pretty(row_data) as formatted_data,
    source,
    timestamp
FROM sheet_data
ORDER BY timestamp DESC;
```

### 18. Search Data by Content
```sql
SELECT * FROM sheet_data
WHERE row_data::text LIKE '%dev%'
ORDER BY timestamp DESC;
```

### 19. Get Statistics
```sql
SELECT 
    COUNT(*) as total_rows,
    COUNT(DISTINCT sheet_name) as unique_sheets,
    COUNT(DISTINCT source) as unique_sources,
    MIN(timestamp) as first_entry,
    MAX(timestamp) as last_entry
FROM sheet_data;
```

### 20. Clear Old Data (Older than 7 days)
```sql
DELETE FROM sheet_data
WHERE timestamp < NOW() - INTERVAL '7 days';
```

## 🧪 Test Queries

### Test Insert (Will Trigger Sync)
```sql
INSERT INTO sheet_data (sheet_name, row_num, row_data, source)
VALUES ('Sheet1', 99, '["SQL Test", "123", "Database"]'::jsonb, 'Manual Test')
ON CONFLICT (sheet_name, row_num)
DO UPDATE SET 
    row_data = EXCLUDED.row_data,
    timestamp = CURRENT_TIMESTAMP,
    source = 'Manual Test';
```

### Test Update
```sql
UPDATE sheet_data
SET row_data = '["Updated via SQL", "456", "Test"]'::jsonb,
    timestamp = CURRENT_TIMESTAMP,
    source = 'SQL Update'
WHERE sheet_name = 'Sheet1' AND row_num = 1;
```

## 🔍 Debugging Queries

### Check Recent Activity
```sql
SELECT 
    id,
    sheet_name,
    row_num,
    source,
    timestamp,
    EXTRACT(EPOCH FROM (NOW() - timestamp)) as seconds_ago
FROM sheet_data
ORDER BY timestamp DESC
LIMIT 5;
```

### View All Sources
```sql
SELECT DISTINCT source FROM sheet_data;
```

### Check for NULL Data
```sql
SELECT * FROM sheet_data
WHERE row_data IS NULL OR row_data = 'null'::jsonb;
```

## 📝 Quick Reference

**Table Name:** `sheet_data`

**Columns:**
- `id` - Auto-increment primary key
- `sheet_name` - Name of the Google Sheet
- `row_num` - Row number (1-indexed)
- `row_data` - JSONB array of cell values
- `timestamp` - When the row was last updated
- `source` - Where the update came from ('API Request', 'Google Sheets', etc.)

**Unique Constraint:** `(sheet_name, row_num)`

---

**Use these queries to inspect and manage your database! 🚀**
