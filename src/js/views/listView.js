import { elements } from './base'

export const renderItem = listItem => {
    
    const markup = `
        <li class="shopping__item" data-itemid="${listItem.id}">
            <div class="shopping__count">
                <input type="number" value="${listItem.count}" step="${listItem.count}" class="shopping__count-value">
                <p>${listItem.unit}</p>
            </div>
            <p class="shopping__description">${listItem.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

export function clearList() {
    elements.shoppingList.innerHTML = '';
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`)
    if (item) item.parentElement.removeChild(item);
}