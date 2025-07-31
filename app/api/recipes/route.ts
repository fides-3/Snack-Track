 

import { NextResponse } from 'next/server';

const API_KEY = '9375a4cc0f2846c5925428ff81a2cda1';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    // 1. Fetch basic search
    const searchRes = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${API_KEY}`
    );

    // Handle bad response
    if (!searchRes.ok) {
      const text = await searchRes.text();
      console.error('Search failed:', text);
      return NextResponse.json({ error: 'Search API failed' }, { status: 500 });
    }

    const searchData = await searchRes.json();
    const basicResults = searchData.results;

    // 2. Fetch detailed info
    const detailedResults = await Promise.all(
      basicResults.map(async (recipe: any) => {
        const infoRes = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
        );

        if (!infoRes.ok) {
          const errText = await infoRes.text();
          console.warn(`Failed to fetch recipe info for ID ${recipe.id}:`);
          console.warn(`🔗 URL: https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
          console.warn('🔎 Response:', errText);
          return null; // Skip this recipe
        }

        const infoData = await infoRes.json();

        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          summary: infoData.summary,
          instructions: infoData.instructions,
          ingredients: infoData.extendedIngredients?.map((ing: any) => ing.original),
        };
      })
    );

    const cleanedResults = detailedResults.filter(Boolean); // remove nulls

    return NextResponse.json({ results: cleanedResults });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}
