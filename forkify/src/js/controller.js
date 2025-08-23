import 'core-js/actual';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    // 2. rendering the recipe
    recipeView.render(recipe);

  } catch (err) {
    // console.error(err);
    recipeView.renderFallbackUI();
  }
};

const controlSearch = async function () {
  try {

    // getting query
    const query = searchView.getQuery();

    if (!query) return;

    // resultsView.renderSpinner();

    // loading search results
    await model.loadSearchResults(query);

    // rendering search results
    resultsView.render(model.getSearchResultByPage());

    // rendering pagination component
    paginationView.render(model.state.search);

  } catch (error) {
    console.error(error);
    // resultsView.renderFallbackUI();
  }
};

const controlPagination = function (goto) {
  resultsView.render(model.getSearchResultByPage(goto));
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // update recipe servings (in the state) 
  model.updateServings(3);

  //render updated values
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();