// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';


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

        //4. Search for recipes
        await state.search.getResults();

        //5. Render recipes on the UI
        searchView.renderResults(state.search.result);

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

const search = new Search('pizza');

search.getResults();
