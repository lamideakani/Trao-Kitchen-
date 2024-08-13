



document.addEventListener('DOMContentLoaded', () => {
 
const savedMenuItems = JSON.parse(localStorage.getItem('menuItems'));
const menuItems = savedMenuItems || defaultMenuItems;

  const filterInput = document.getElementById('filterInput');
  const sortSelect = document.getElementById('sortSelect');
  const cartCountElement = document.getElementById('cart-count');

  function renderMenuItems() {
    console.log('Menu Items:', menuItems); // Debug
    const categories = ['main', 'local', 'grills', 'soups', 'snacks', 'drinks'];

    categories.forEach(category => {
      const itemsContainer = document.querySelector(`.menu-items[data-category="${category}"]`);
      if (itemsContainer) {
        console.error(`Container not found for category: ${category}`);
        itemsContainer.innerHTML = '';

        const categoryItems = menuItems[category] || [];
        const filteredItems = filterItems(categoryItems, filterInput.value);
        const sortedItems = sortItems(filteredItems);
        console.log('Filtered items for category:', category, filteredItems);

        sortedItems.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('menu-item');
          itemDiv.innerHTML = `
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price"><i class="fa-solid fa-naira-sign" style="color: #ffffff;"></i> ${item.price.toFixed(2)}</p>
            <div class="star-outer">
              <div class="star-inner"></div>
            </div>
            <div>
              <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            </div>
          `;
          itemsContainer.appendChild(itemDiv);
        });

        console.log(`Rendered ${filteredItems.length} items in ${category} category`); // Debug
      } else {
        console.error(`No container found for category: ${category}`); // Debug
      }
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  function filterItems(items, query) {
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  function sortItems(items) {
    const sortValue = sortSelect.value;
    return items.sort((a, b) => {
      if (sortValue === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  function addToCart(event) {
    const id = event.target.dataset.id;
    const item = filterItems(Object.values(menuItems).flat(), '').find(item => item.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  }

  function searchItems(query) {
    filterInput.value = query;
    renderMenuItems();
  }

  // Perform search on page load
  const query = getSearchQuery();
  if (query) {
    searchItems(query);
  }

  filterInput.addEventListener('input', () => {
    renderMenuItems();
  });

  sortSelect.addEventListener('change', () => {
    renderMenuItems();
  });

  // Initialize UI
  renderMenuItems();
  updateCartCount();
});

const container = document.querySelector('.cart-animation');


const careers = ["Welcome to our culinary world", "We're thrilled to share our culinary creations with you", 'browse our  menu and discover your favorite dish', 'Cheers!!!'];

let careerIndex = 0;

let characterIndex = 0;


//write a function using the slice method to get the characters in the carrerIndex
function updateText() {
  characterIndex++

  container.innerHTML = ` 

  <h1>${careers[careerIndex].slice(0, characterIndex)}</h1>
`;


  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }
  //To enable the animation keep running after reaching the end of the array,set the careerIndex back to 0
  if (careerIndex === careers.length) {
    careerIndex = 0;
  }
  setTimeout(updateText, 150);
}
updateText();


window.onload = function() {
  const settings = JSON.parse(localStorage.getItem('userSettings'));
  if (settings) {
      document.getElementById('profile-pic').src = settings.profilePic || '';
  }

  const loggedInUsername = localStorage.getItem('loggedInUsername');

  if (loggedInUsername) {
    const userData = JSON.parse(localStorage.getItem(loggedInUsername));
    if (userData) {
        let username = userData.username || '';
        username = username.length > 8 ? username.substring(0, 8) : username;
        document.getElementById('username').textContent = username;
    }
}
};
