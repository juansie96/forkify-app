import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const arrResults = Array.from(document.querySelectorAll('.results__link'));

    arrResults.forEach(el => el.classList.remove('results__link--active'));

    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}

export const limitResultTitle = (title, limit=17) => {
    const newTitle = [];
    
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc+cur.length;
        }, 0);
        return newTitle.join(' ')+' ...';
    }
    return title;
}

export const renderRecipe = recipe => {
    const markup = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${limitResultTitle(recipe.title)}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitResultTitle(recipe.title)}</h4>
                            <p class = "results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;

    elements.searchResList.insertAdjacentHTML('beforeend',markup);
}

//type prev or next
const createButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page + 1}>
    <span>Page ${type === 'prev' ? page-1 : page + 1}</span>
        <svg class="search__icon">
            <use href = "img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"> </use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {

    //calculate the number of pages in base of the number of results and the results per page
    const numberOfPages =  Math.ceil(numResults/resPerPage);

    let button;

    if (page === 1 && numberOfPages > 1) {
        //only create next button
        button = createButtons(page, 'next');
    } else if (page < numberOfPages) {
        //create both buttons
        button = `${createButtons(page, 'prev')}
                  ${createButtons(page, 'next')}`
    } else if (page === numberOfPages && numberOfPages > 1) { 
        //create just prev button
        button = createButtons(page, 'prev');
    }

    //render the button/s
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}


export const renderResults = (recipes, page=1, resPerPage=10) => {

    //render results of current page
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);

    //render pagination button
    renderButtons(page, recipes.length, resPerPage);
}