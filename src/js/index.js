// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';


const state = {};

const controlSearch = async () => {
    //1. Get the query on the search form
    const query = searchView.getInput(); //TODO

    if(query) {
        //2. Build a search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. Search for recipes
        await state.search.getResults();

        //5. Clear loader
        clearLoader();

        //5. Render recipes on the UI
        searchView.renderResults(state.search.result);

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
