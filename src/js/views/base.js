export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    loader: document.querySelector('.Loader')
}

export const elementsString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementsString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsString.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}