import { getJSON } from './helper';
import { API_URL } from './config';

export const state = {
    recipe: {}
};

export const loadRecipe = async function (recipeId) {
    try {
        const { data } = await getJSON(`${API_URL}/${recipeId}`);
        const { recipe: rec } = data;
        state.recipe = {
            cookingTime: rec.cooking_time,
            id: rec.id,
            imageUrl: rec.image_url,
            ingredients: rec.ingredients,
            publisher: rec.publisher,
            servings: rec.servings,
            sourceUrl: rec.source_url,
            title: rec.title,
        };
    } catch (err) {
        throw err;
    }
};