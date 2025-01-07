import './style.css';
const waitForCart = (selector: string): Promise<Element | null> => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

type CartItem = {
  item: string;
  quantity: string;
};

const retrieveGroceryListFromElement = (element: Element): CartItem[] => {
  const sectionItems = element.getElementsByTagName('section') || [];
  console.log('LEL sectionItems:', sectionItems);
  return Array.from(sectionItems).map((sectionItems): CartItem => {
    const itemTitle = sectionItems.getElementsByClassName('product-name')?.[0]?.textContent || '';
    const itemQuantityElement = sectionItems.getElementsByClassName('stepper-qty-round')?.[0];
    const itemQuantity = itemQuantityElement?.getElementsByTagName('span')[0]?.textContent || '';

    return {
      item: itemTitle,
      quantity: itemQuantity,
    };
  });
};

const appendExtractionButton = (): void => {
  const cartHeaderElement = (document.getElementsByClassName('cart-details')?.[0] as HTMLElement) || undefined;

  if (!cartHeaderElement) return;
  cartHeaderElement.style.display = 'flex';

  const extractionButton = document.createElement('button');
  extractionButton.className = 'list-extraction-button';
  extractionButton.textContent = 'Send List to Email';
  extractionButton.style.width = '150px';
  extractionButton.style.height = '50px';
  extractionButton.style.backgroundColor = 'white';
  extractionButton.style.color = 'rgb(156 156 156)';
  extractionButton.style.borderColor = 'rgb(156 156 156)';
  extractionButton.style.borderStyle = 'solid';
  extractionButton.style.boxShadow = '';
  extractionButton.style.marginLeft = '5px';

  extractionButton.addEventListener('mouseover', () => {
    extractionButton.style.color = 'black';
    extractionButton.style.borderColor = 'black';
  });

  extractionButton.addEventListener('mouseleave', () => {
    extractionButton.style.color = 'rgb(156 156 156)';
    extractionButton.style.borderColor = 'rgb(156 156 156)';
  });

  extractionButton.addEventListener('mousedown', () => {
    extractionButton.style.color = '#535250';
    extractionButton.style.borderColor = '#535250';
  });

  extractionButton.addEventListener('mouseup', () => {
    extractionButton.style.color = 'black';
    extractionButton.style.borderColor = 'black';
  });

  extractionButton.addEventListener('click', () => {
    const cartBody = document.getElementsByClassName('mp-item-main')?.[0] || undefined;
    if (cartBody) {
      retrieveGroceryListFromElement(cartBody);
    }
  });

  cartHeaderElement.appendChild(extractionButton);
};

waitForCart('.cart-details').then((elm: Element | null) => {
  if (elm && elm !== null) {
    appendExtractionButton();
  }
});
