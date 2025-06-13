/*
  # Create Quiz History Table

  1. New Tables
     - `quiz_history` - Stores user quiz attempts and results
       - `id` (uuid, primary key)
       - `user_id` (uuid, foreign key to auth.users)
       - `subject` (text) - Subject or topic of the quiz
       - `score` (integer) - User's score
       - `total_questions` (integer) - Total number of questions
       - `created_at` (timestamptz) - When the quiz was taken
       - `is_custom` (boolean) - Whether it was a custom quiz or subject quiz
       - `difficulty` (text) - Easy, medium, or hard (for custom quizzes)
  
  2. Security
     - Enable RLS on quiz_history table
     - Add policy for users to read/insert only their own quiz history
*/

-- Create quiz_history table
CREATE TABLE IF NOT EXISTS quiz_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_custom BOOLEAN DEFAULT false,
  difficulty TEXT
);

-- Enable RLS
ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own quiz history
CREATE POLICY "Users can read own quiz history"
  ON quiz_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own quiz history
CREATE POLICY "Users can insert own quiz history"
  ON quiz_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id);