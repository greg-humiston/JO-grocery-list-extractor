import { toggleTheme } from '@src/toggleTheme';

console.log('content script loaded');

void toggleTheme();

const addClass = (elements: HTMLCollectionOf<Element>, newContent: string) => {
  Array.from(elements).forEach(element => {
    const div = document.createElement('div');
    div.textContent = newContent;
    div.className = 'injected-content';
    element.appendChild(div);
  });
};

const targetElements = document.getElementsByClassName('cart-dst-scroll-store');
addClass(targetElements, 'Additional helpful information');
