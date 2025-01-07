import { mount } from '@src/Root';

mount();
console.log('runtime script loaded');

const retrieveGroceryListFromElement = (element: Element) => {
  const miniCartItems = element.getElementsByTagName('mini-cart-item') || [];
  const groceryList = Array.from(miniCartItems).map(miniCartItem => {
    const itemTitle = miniCartItem.getElementsByClassName('cart-dst-product-name')?.[0].textContent || '';
    const itemQuantity = miniCartItem.getElementsByClassName('cart-dst-quantity-text')?.[0].textContent || 0;

    return {
      item: itemTitle,
      quantity: itemQuantity,
    };
  });

  console.log(groceryList);
};

const targetElements = document.getElementsByClassName('cart-dst-scroll-store');
const targetElement = targetElements?.[0];
retrieveGroceryListFromElement(targetElement);
