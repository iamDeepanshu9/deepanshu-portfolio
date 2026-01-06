-- Add notion_page_id column to journal_entries table
ALTER TABLE journal_entries 
ADD COLUMN IF NOT EXISTS notion_page_id text;
