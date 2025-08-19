import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    // 2. rendering the recipe
    recipeView.renderSingleRecipe(recipe);

  } catch (err) {
    // console.error(err);
    recipeView.renderFallbackUI();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();