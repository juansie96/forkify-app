// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements,renderLoader,clearLoader} from './views/base';


const state = {};
window.state = state;

/* 
------------- SEARCH CONTROLLER -------------
*/

const controlSearch = async () => {
    //1. Get the query on the search form
    const query = searchView.getInput(); 

    if(query) {
        //2. Build a search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            //4. Search for recipes
            await state.search.getResults();
    
            //5. Clear loader
            clearLoader();
    
            //5. Render recipes on the UI
            searchView.renderResults(state.search.result);    
        } catch (err) {
            console.log ('Something went wrong with the search :(')
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }
});

/* 
------------- RECIPE CONTROLLER -------------
*/

const controlRecipe = async () => {

    // Get ID from URL
    const id = window.location.hash.replace('#','');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
    
            // Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            clearLoader();
            console.log(err)
        }
    }
};

const controlList = () => {
    
    // If there is not a list create a new list
    if (!state.list) state.list = new List();

    // Clear list UI
    listView.clearList();

    //For each ingredient render it.
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

}

// Handle delete and update list item events
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const value = parseFloat(e.target.value, 10);
        state.list.updateCount(id, value);
    }
});

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks

 elements.recipe.addEventListener('click', e => {
     if (e.target.matches('.btn-decrease, .btn-decrease *')) {
         // Decrease button is clicked
         if (state.recipe.servings > 1) {
             state.recipe.updateServings('dec');
             recipeView.updateServingsIngredients(state.recipe);
         }
     } else if (e.target.matches('.btn-increase, .btn-increase *')) {
         // Increase button is clicked
         state.recipe.updateServings('inc');
         recipeView.updateServingsIngredients(state.recipe);
     } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
         // Increase button is clicked
         controlList();
     }
       
 });


