const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////


// getting single recipe
const showRecipe = async function () {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    const { recipe: rec } = data.data;
    let recipe = {
      cookingTime: rec.cooking_time,
      id: rec.id,
      imageUrl: rec.image_url,
      ingredients: rec.ingredients,
      publisher: rec.publisher,
      servings: rec.servings,
      sourceUrl: rec.source_url,
      title: rec.title,
    };
    console.log(recipe);

    // return data;
  } catch (err) {
    throw new Error(err);
  }
};

showRecipe();
