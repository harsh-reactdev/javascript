import { AJAX } from './helper';
import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE
    },
    bookmarks: []
};

const createRecipeObject = function (rec) {
    return {
        cookingTime: rec.cooking_time,
        id: rec.id,
        imageUrl: rec.image_url,
        ingredients: rec.ingredients,
        publisher: rec.publisher,
        servings: rec.servings,
        sourceUrl: rec.source_url,
        title: rec.title,
        ...(rec.key && { key: rec.key })
    };

};

export const loadRecipe = async function (recipeId) {
    try {
        const { data } = await AJAX(`${API_URL}${recipeId}?key=${API_KEY}`);
        const { recipe: rec } = data;
        state.recipe = createRecipeObject(rec);

        if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
            state.recipe.isBookmarked = true;
        } else state.recipe.isBookmarked = false;

    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const { data: { recipes } } = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
        state.search.page = 1;
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

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity *= newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};

const updateLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    // add bookmark to the bookmarks list
    state.bookmarks.push(recipe);

    // marking a recipe as bookmarked recipe, if it is the current recipe
    if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;

    // updating local storage
    updateLocalStorage();
};

export const removeBookmark = function (id) {
    // deleting bookmark from bookmarks list
    const delIndex = state.bookmarks.findIndex(recipe => recipe.id === id);
    state.bookmarks.splice(delIndex, 1);

    // setting isBookmarked property to false
    if (id === state.recipe.id) state.recipe.isBookmarked = false;

    // updating local storage
    updateLocalStorage();
};

export const uploadRecipe = async function (newRecipe) {
    try {
        const data = Object.fromEntries(newRecipe);
        const ingredients = Object.entries(data)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].replaceAll(' ', '').split(',');
                if (ingArr.length !== 3) throw new Error('Wrong Ingredient Format.!');

                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });

        const recipe = {
            title: data.title,
            source_url: data.sourceUrl,
            image_url: data.imageUrl,
            publisher: data.publisher,
            cooking_time: +data.cookingTime,
            servings: +data.servings,
            ingredients,
        };

        const { data: { recipe: rec } } = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(rec);
        console.log(state.recipe);
        addBookmark(state.recipe);

    } catch (err) {
        throw err;
    }
};

const init = function () {
    const storage = JSON.parse(localStorage.getItem('bookmarks'));
    if (storage) state.bookmarks = storage;
};

init();