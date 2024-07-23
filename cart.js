document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  updateWalletBalance();

  document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  document.getElementById('checkout-btn').addEventListener('click', showBillingSection);
  document.getElementById('confirm-payment-btn').addEventListener('click', confirmPayment);
  document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
});

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  cartItemsContainer.innerHTML = '';

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(item => item.quantity > 0);

  cart.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
              <h3 class="products-name">${item.name}</h3>
              <p>${item.description}</p>
              <p># ${item.price.toFixed(2)}</p>
              <div class="quantity-controls">
                  <button class="quantity-btn" data-id="${item.id}" data-action="decrement">-</button>
                  <span>${item.quantity}</span>
                  <button class="quantity-btn" data-id="${item.id}" data-action="increment">+</button>
              </div>
              <button class="delete-btn" data-id="${item.id}">Remove</button>
          </div>
      `;

      cartItemsContainer.appendChild(cartItemDiv);
  });

  document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', updateCartQuantity);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteCartItem);
  });

  updateCartSummary();
}

function updateCartQuantity(event) {
  const itemId = event.target.dataset.id;
  const action = event.target.dataset.action;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.map(cartItem => {
      if (cartItem.id === itemId) {
          return {
              ...cartItem,
              quantity: action === 'increment' ? cartItem.quantity + 1 : Math.max(cartItem.quantity - 1, 1)
          };
      }
      return cartItem;
  });

  saveCartToLocalStorage(cart);
  updateCart();
}

function deleteCartItem(event) {
  const itemId = event.target.dataset.id;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(cartItem => cartItem.id !== itemId);

  saveCartToLocalStorage(cart);
  updateCart();
}

function clearCart() {
  saveCartToLocalStorage([]);
  updateCart();
  updateCartSummary(); // Ensure summary reflects cleared cart
}

function applyCoupon() {
  const couponInput = document.getElementById('coupon').value.trim().toUpperCase();
  const validCoupons = {
      'DISCOUNT10': 0.10,
      'DISCOUNT12': 0.12,
      'DISCOUNT8': 0.08
  };

  const discount = validCoupons[couponInput] || 0;
  localStorage.setItem('discount', discount);

  if (discount > 0) {
      alert('Coupon applied successfully');
  } else {
      alert('Invalid coupon code');
  }

  updateCartSummary();
}

function updateCartSummary() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const discount = parseFloat(localStorage.getItem('discount')) || 0;

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = totalAmount * discount;
  const finalAmount = totalAmount - discountAmount;

  document.getElementById('total-quantity').textContent = totalQuantity;
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  document.getElementById('discount-amount').textContent = discountAmount.toFixed(2);
  document.getElementById('final-amount').textContent = finalAmount.toFixed(2);
}

function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateWalletBalance() {
  const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
  document.getElementById('wallet-balance').textContent = walletBalance.toFixed(2);
}

function showBillingSection() {
  document.getElementById('cart-page').style.display = 'none';
  document.getElementById('proceedToBilling').style.display = 'block';
  currentDiv = 2;
  updateProgressBar();
}

function confirmPayment() {
  const paymentMethod = document.getElementById('payment-method').value;
  const finalAmount = parseFloat(document.getElementById('final-amount').textContent);

  if (paymentMethod === 'wallet') {
      payWithWallet(finalAmount);
  } else if (paymentMethod === 'online') {
    document.getElementById('proceedToBilling').style.display = 'none';
        document.getElementById('onlinePayment').style.display = 'block';
  } else if (paymentMethod === 'delivery') {
      alert('Order placed successfully. Pay on delivery.');
      clearCart();
      showOrderSummary();
  }
}

// order summary
function showOrderSummary() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const companyName = document.getElementById('company-name').value;
  const country = document.getElementById('country').value;
  const streetAddress1 = document.getElementById('street-address1').value;
  const streetAddress2 = document.getElementById('street-address2').value;
  const townCity = document.getElementById('town-city').value;
  const state = document.getElementById('state').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const orderNotes = document.getElementById('order-notes').value;
  const paymentMethod = document.getElementById('payment-method').selectedOptions[0].text;
  
  document.getElementById('summary-first-name').innerText = firstName;
  document.getElementById('summary-last-name').innerText = lastName;
  document.getElementById('summary-company-name').innerText = companyName;
  document.getElementById('summary-country').innerText = country;
  document.getElementById('summary-street-address1').innerText = streetAddress1;
  document.getElementById('summary-street-address2').innerText = streetAddress2;
  document.getElementById('summary-town-city').innerText = townCity;
  document.getElementById('summary-state').innerText = state;
  document.getElementById('summary-phone').innerText = phone;
  document.getElementById('summary-email').innerText = email;
  document.getElementById('summary-payment-method').innerText = paymentMethod;
  document.getElementById('summary-order-notes').innerText = orderNotes;

  document.getElementById('proceedToBilling').style.display = 'none';
  document.getElementById('orderSummary').style.display = 'block';
    currentDiv = 3;
    updateProgressBar();
}

// paystack integration
document.getElementById('online-payment-pay-button').addEventListener('click', function() {
  var amount = document.getElementById('online-payment-amount').value * 100;
  var email = document.getElementById('online-payment-email').value;

  var handler = PaystackPop.setup({
      key: 'pk_test_07f16d730fc627dfd475c62727017562d9eb0c78',
      email: email,
      amount: amount,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
      callback: function(response){
          alert('Payment successful. Transaction ref is ' + response.reference);
          document.getElementById('onlinePayment').style.display = 'none';
          document.getElementById('orderSummary').style.display = 'block';
          showOrderSummary();
          clearCart();
      },
      onClose: function(){
          alert('Transaction was not completed, window closed.');
      }
  });
  handler.openIframe();
});


// progress bar
function updateProgressBar() {
  document.getElementById('step1').classList.remove('active');
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step3').classList.remove('active');
  if (currentDiv === 1) {
      document.getElementById('step1').classList.add('active');
  } else if (currentDiv === 2) {
      document.getElementById('step2').classList.add('active');
  } else if (currentDiv === 3) {
      document.getElementById('step3').classList.add('active');
  }
}