import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const recipes = await getCollection('recipes');
  return rss({
    title: 'Fryup.UK — The Proper Fry-Up, Made at Home',
    description: 'Latest traditional and modern English breakfast recipes, component masterclasses, and culinary guides.',
    site: context.site?.href || 'https://fryup.uk',
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      pubDate: new Date(recipe.data.datePublished),
      description: recipe.data.description,
      link: `/recipes/${recipe.data.slug}/`
    }))
  });
};
