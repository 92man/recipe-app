import { createClient } from './client';
import { Recipe } from '@/types';

const supabase = createClient();

export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    ingredients: row.ingredients || [],
    steps: row.steps || [],
    imageUrl: row.image_url,
    source: row.source,
    originalTranscript: row.original_transcript,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function addRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image_url: recipe.imageUrl,
      source: recipe.source,
      original_transcript: recipe.originalTranscript,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding recipe:', error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    ingredients: data.ingredients || [],
    steps: data.steps || [],
    imageUrl: data.image_url,
    source: data.source,
    originalTranscript: data.original_transcript,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function updateRecipe(id: string, updates: Partial<Recipe>): Promise<boolean> {
  const { error } = await supabase
    .from('recipes')
    .update({
      title: updates.title,
      description: updates.description,
      ingredients: updates.ingredients,
      steps: updates.steps,
      image_url: updates.imageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating recipe:', error);
    return false;
  }

  return true;
}

export async function deleteRecipe(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting recipe:', error);
    return false;
  }

  return true;
}
