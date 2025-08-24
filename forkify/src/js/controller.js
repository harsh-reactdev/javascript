import 'core-js/actual';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
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

    // 0. updating the selected recipe
    resultsView.update(model.getSearchResultByPage());
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = function (newServings) {
  // update recipe servings (in the state) 
  model.updateServings(newServings);

  //render updated values
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or delete bookmarks
  if (!model.state.recipe.isBookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarkRender = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarkRender);

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearch);

  paginationView.addHandlerClick(controlPagination);
};

init();

const clearLocalStorage = function () {
  localStorage.clear();
};