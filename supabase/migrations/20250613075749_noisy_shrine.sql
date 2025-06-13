/*
  # Add Groq API Key to Profiles Table

  1. Changes
     - Add groq_api_key column to profiles table for AI quiz functionality
     - This column will store the user's Groq API key securely
  
  2. Security
     - Enable RLS on profiles table
     - Add policy for users to read/update only their own profile
*/

-- Add groq_api_key column to profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'groq_api_key'
  ) THEN
    ALTER TABLE profiles ADD COLUMN groq_api_key TEXT;
  END IF;
END $$;

-- Ensure RLS is enabled on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile" 
    ON profiles FOR SELECT 
    TO authenticated 
    USING (auth.uid() = id);
  END IF;
END $$;

-- Create policy for users to update their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = id);
  END IF;
END $$;