import { supabase } from '@/lib/supabase';

export interface CodeSnippet {
  id: string;
  user_id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export async function saveCodeSnippet(
  userId: string,
  title: string,
  description: string,
  code: string,
  language: string,
  tags: string[],
  isPublic: boolean
): Promise<CodeSnippet> {
  const { data, error } = await supabase
    .from('code_snippets')
    .insert([
      {
        user_id: userId,
        title,
        description,
        code,
        language,
        tags,
        is_public: isPublic,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCodeSnippet(snippetId: string): Promise<CodeSnippet> {
  const { data, error } = await supabase
    .from('code_snippets')
    .select('*')
    .eq('id', snippetId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCodeSnippetByShareableLink(linkId: string): Promise<CodeSnippet> {
  const { data, error } = await supabase
    .from('code_snippets')
    .select('*')
    .eq('shareable_link', linkId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUserSnippets(userId: string): Promise<CodeSnippet[]> {
  const { data, error } = await supabase
    .from('code_snippets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPublicSnippets(): Promise<CodeSnippet[]> {
  const { data, error } = await supabase
    .from('code_snippets')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCodeSnippet(
  snippetId: string,
  updates: Partial<Omit<CodeSnippet, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<CodeSnippet> {
  const { data, error } = await supabase
    .from('code_snippets')
    .update(updates)
    .eq('id', snippetId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCodeSnippet(snippetId: string): Promise<void> {
  const { error } = await supabase
    .from('code_snippets')
    .delete()
    .eq('id', snippetId);

  if (error) {
    throw new Error(error.message);
  }
} 