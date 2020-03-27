// Global app controller

import Search from './models/Search'

const state = {};

const controlSearch = async () => {
    //1. Get the query on the search form
    const query = 'pizza'; //TODO

    if(query) {
        //2. Build a search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results

        //4. Search for recipes
        await state.search.getResults();

        //5. Render recipes on the UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

const search = new Search('pizza');

search.getResults();
