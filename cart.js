document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  updateWalletBalance();

  document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  document.getElementById('checkout-btn').addEventListener('click', showBillingSection);
  document.getElementById('confirm-payment-btn').addEventListener('click', confirmPayment);
  document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
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
  localStorage.removeItem('discount'); // Clear discount when clearing the cart
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

document.getElementById('billing-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the default way
  confirmPayment();
});

function confirmPayment() {
  const form = document.getElementById('billing-form');
  if (!form.checkValidity()) {
      // Some required fields are missing
      form.reportValidity();
      return;
  }

  const paymentMethod = document.getElementById('payment-method').value;
  const finalAmount = parseFloat(document.getElementById('final-amount').textContent);


  if (paymentMethod === 'wallet') {
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
        alert('Order placed successfully. Pay on delivery.');
        saveOrderDetails();
        clearCart();
        showOrderSummary();
  }
}

function saveOrderDetails() {
  const orderId = generateOrderId();
  const orderDetails = {
      orderId: orderId,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      discount: parseFloat(localStorage.getItem('discount')) || 0,
      totalQuantity: parseInt(document.getElementById('total-quantity').textContent),
      totalAmount: parseFloat(document.getElementById('total-amount').textContent),
      discountAmount: parseFloat(document.getElementById('discount-amount').textContent),
      finalAmount: parseFloat(document.getElementById('final-amount').textContent),
      customerDetails: {
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          companyName: document.getElementById('company-name').value,
          country: document.getElementById('country').value,
          streetAddress1: document.getElementById('street-address1').value,
          streetAddress2: document.getElementById('street-address2').value,
          townCity: document.getElementById('town-city').value,
          state: document.getElementById('state').value,
          phone: document.getElementById('phone').value,
          email: document.getElementById('email').value,
          orderNotes: document.getElementById('order-notes').value,
          paymentMethod: document.getElementById('payment-method').selectedOptions[0].text
      },
      status: 'pending',
      orderDate: new Date().toISOString() // Store the current date and time

  };

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(orderDetails);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart'); // Clear cart after saving order
  localStorage.removeItem('discount'); // Clear discount when clearing the cart
}

// Generate unique order ID
function generateOrderId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${randomNum}`;
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
  saveOrderDetails();
  currentDiv = 3;
  updateProgressBar();
}

// Calculate total cart amount
function getTotalCartAmount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const discount = parseFloat(localStorage.getItem('discount')) || 0;
  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountAmount = totalAmount * discount;
  const finalAmount = totalAmount - discountAmount;
  return finalAmount;
}
// paystack integration
document.getElementById('online-payment-pay-button').addEventListener('click', function() {
  var email = document.getElementById('online-payment-email').value;
  var amount = getTotalCartAmount() * 100; // Convert to kobo

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
          saveOrderDetails();
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
