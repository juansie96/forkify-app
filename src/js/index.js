// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements,renderLoader,clearLoader} from './views/base';


const state = {};

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
        searchView.highlightSelected(id);
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            clearLoader();

            state.recipe.parseIngredients();
    
            // Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render the recipe
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            clearLoader();
            console.log(err)
        }
    }
};

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

