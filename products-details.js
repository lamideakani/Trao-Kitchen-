document.addEventListener('DOMContentLoaded', () => {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || {};
  
    // Extracting product ID from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    const productContainer = document.getElementById('product-details');
    const cartCountElement = document.getElementById('cart-count');
  
    function renderProductDetails() {
      const item = Object.values(menuItems).flat().find(item => item.id === productId);
  
      if (item && productContainer) {
        productContainer.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="detail-img">
          <div>
          <h1 class="details-name">${item.name}</h1>
          <p class="details-desc">${item.description}</p>
          <p class="price details-price"><i class="fa-solid fa-naira-sign" style="color: #ffffff;"></i> ${item.price.toFixed(2)}</p>
          <div class="star-outer">
            <div class="star-inner"></div>
          </div>
          <button id="add-to-cart-btn" data-id="${item.id}" class="add-to-cart-btn">Add to Cart</button>
          </div>
        `;
  
        document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
      } else {
        console.error(`Item with ID ${productId} not found.`);
        productContainer.innerHTML = '<p>Product not found.</p>';
      }
    }
  
    function addToCart(event) {
      const id = event.target.dataset.id;
      const item = Object.values(menuItems).flat().find(item => item.id === id);
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
  
    // Initialize UI
    renderProductDetails();
    updateCartCount();
  });
  