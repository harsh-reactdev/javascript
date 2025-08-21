import { getJSON } from './helper';
import { API_URL, RESULTS_PER_PAGE } from './config';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE
    }
};

export const loadRecipe = async function (recipeId) {
    try {
        const { data } = await getJSON(`${API_URL}${recipeId}`);
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

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const { data: { recipes } } = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                imageUrl: rec.image_url,
                publisher: rec.publisher
            };
        });
    } catch (error) {
        throw error;
    }
};

export const getSearchResultByPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return (state.search.results.slice(start, end));
};