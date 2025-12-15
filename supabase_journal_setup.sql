-- Create journal_entries table
create table if not exists journal_entries (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  mood text,
  tags text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null
);

-- Enable RLS
alter table journal_entries enable row level security;

-- Create Policy: Users can only see their own entries
create policy "Users can see own journal entries"
  on journal_entries for select
  using (auth.uid() = user_id);

-- Create Policy: Users can insert their own entries
create policy "Users can insert own journal entries"
  on journal_entries for insert
  with check (auth.uid() = user_id);

-- Create Policy: Users can update their own entries
create policy "Users can update own journal entries"
  on journal_entries for update
  using (auth.uid() = user_id);

-- Create Policy: Users can delete their own entries
create policy "Users can delete own journal entries"
  on journal_entries for delete
  using (auth.uid() = user_id);
