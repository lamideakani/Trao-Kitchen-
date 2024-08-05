document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  updateWalletBalance();

  document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  document.getElementById('checkout-btn').addEventListener('click', showBillingSection);
  document.getElementById('confirm-payment-btn').addEventListener('click', confirmPayment);
  document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
  document.getElementById('online-payment-pay-button').addEventListener('click', validateOnlinePaymentForm);
  updateProgressBar(); // Initialize progress bar
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
              <p>N ${item.price.toFixed(2)}</p>
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
  updateProgressBar(); // Update progress bar after cart update
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
  updateProgressBar(); // Update progress bar after clearing cart
}

function applyCoupon() {
  const couponInput = document.getElementById('coupon').value.trim().toUpperCase();
  const validCoupons = {
      'DISCOUNT10': 0.10,
      'DISCOUNT12': 0.12,
      'DISCOUNT8': 0.08,
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
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

  if (!isLoggedIn) {
      alert('Please log in to proceed to checkout.');
      window.location.href = 'clientlogin.html'; // Redirect to login page
      return;
  }

  const totalAmount = getTotalCartAmount();
  document.getElementById('online-payment-amount').value = totalAmount.toFixed(2); // Update the amount field

  document.getElementById('cart-page').style.display = 'none';
  document.getElementById('proceedToBilling').style.display = 'block';
  currentDiv = 2;
  updateProgressBar();
}

function confirmPayment() {
  if (!validateBillingForm()) {
      return; // Stop if the form is not valid
  }

  const paymentMethod = document.getElementById('payment-method').value;
  const finalAmount = parseFloat(document.getElementById('final-amount').textContent);

  if (paymentMethod === 'wallet') {
      // Ensure the wallet balance is updated from local storage before checking
      const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;

      if (walletBalance >= finalAmount) {
          payWithWallet(finalAmount);
      } else {
          alert('Insufficient wallet balance.');
      }

  } else if (paymentMethod === 'online') {
      const totalAmount = getTotalCartAmount();
      document.getElementById('online-payment-amount').value = totalAmount.toFixed(2);
      document.getElementById('proceedToBilling').style.display = 'none';
      document.getElementById('onlinePayment').style.display = 'block';

  } else if (paymentMethod === 'delivery') {
      // Save order details first
      saveOrderDetails();

      alert('Order placed successfully. Pay on delivery.');
      clearCart();
      showOrderSummary();
  }
}

function validateBillingForm() {
  const requiredFields = [
      'first-name', 'last-name', 'street-address1', 'town-city', 'state', 'phone', 'email'
  ];
  
  let isValid = true;
  requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
          field.classList.add('invalid');
          isValid = false;
      } else {
          field.classList.remove('invalid');
      }
  });

  if (!isValid) {
      alert('Please fill in all required fields.');
  }

  return isValid;
}

function payWithWallet(amount) {
  let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
  if (walletBalance >= amount) {
      walletBalance -= amount; // Deduct the amount from wallet
      const transaction = {
          type: 'Debit',
          amount: amount,
          date: new Date().toLocaleString()
      };
      let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      transactionHistory.push(transaction);

      // Update local storage
      localStorage.setItem('walletBalance', walletBalance);
      localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
      
      // Display payment success alert
      alert(`N ${amount} has been deducted from your wallet. Your wallet balance is now N ${walletBalance.toFixed(2)}`);

      // Save order details first
      saveOrderDetails();

      // Clear the cart and show order summary
      clearCart();
      showOrderSummary();

      // Update UI
      updateWalletBalance();
      updateTransactionHistory();

  } else {
      alert('Insufficient wallet balance, add to balance');
      window.location.href = 'wallet.html'; // Redirect to wallet page
      return;
  }
}

// Order summary
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

  document.getElementById('proceedToBilling').style.display = 'none';
  document.getElementById('orderSummary').style.display = 'block';
  currentDiv = 3;
  updateProgressBar();
  
  saveOrderDetails(); // Save order details to local storage
}

function saveOrderDetails() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
  const finalAmount = getTotalCartAmount();
  const orderId = generateOrderId();

  const orderDetails = {
    id: orderId,
    items: cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    customer: {
      firstName,
      lastName,
      companyName,
      country,
      streetAddress1,
      streetAddress2,
      townCity,
      state,
      phone,
      email
    },
    orderNotes,
    paymentMethod,
    finalAmount,
    date: new Date().toLocaleString()
  };

  let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  orderHistory.push(orderDetails);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

function generateOrderId() {
  return `ORD${Date.now()}`;
}


// Calculate total cart amount
function getTotalCartAmount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const discount = parseFloat(localStorage.getItem('discount')) || 0;
  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = totalAmount * discount;
  const finalAmount = totalAmount - discountAmount;

  const orderSummaryHTML = `
      <h2>Order Summary</h2>
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Address:</strong> ${streetAddress1}, ${streetAddress2}, ${townCity}, ${state}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Order Notes:</strong> ${orderNotes}</p>
      <h3>Order Items</h3>
      <ul>
          ${cart.map(item => `
              <li>${item.quantity} x ${item.name} - #${(item.price * item.quantity).toFixed(2)}</li>
          `).join('')}
      </ul>
      <h3>Order Summary</h3>
      <p><strong>Total Quantity:</strong> ${cart.reduce((total, item) => total + item.quantity, 0)}</p>
      <p><strong>Total Amount:</strong> #${totalAmount.toFixed(2)}</p>
      <p><strong>Discount:</strong> -#${discountAmount.toFixed(2)}</p>
      <p><strong>Final Amount:</strong> #${finalAmount.toFixed(2)}</p>
  `;

  const orderSummaryContainer = document.getElementById('order-summary');
  orderSummaryContainer.innerHTML = orderSummaryHTML;

  document.getElementById('proceedToBilling').style.display = 'none';
  document.getElementById('orderSummary').style.display = 'block';
}

function validateOnlinePaymentForm() {
  const email = document.getElementById('online-payment-email').value.trim();
  if (!email) {
      alert('Please provide your email address for online payment.');
      return;
  }
  payWithPaystack();
}

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
          // Save order details first
          saveOrderDetails();
          showOrderSummary();
          clearCart();
          showOrderSummary();
      },
      onClose: function() {
          alert('Transaction was not completed, window closed.');
      }
  });
  handler.openIframe();


// Progress bar logic
let currentDiv = 1;
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  let progress = 0;
  if (currentDiv === 1) {
      progress = 33;
  } else if (currentDiv === 2) {
      progress = 66;
  } else if (currentDiv === 3) {
      progress = 100;
  }
  progressBar.style.width = `${progress}%`;
}

function getTotalCartAmount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const discount = parseFloat(localStorage.getItem('discount')) || 0;

  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = totalAmount * discount;
  const finalAmount = totalAmount - discountAmount;

  return finalAmount;
}

