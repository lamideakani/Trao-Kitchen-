// script.js
let quantity = 1;
const price = 100;
let discount = 0;
let currentDiv = 1;

function showPreviousDiv() {
    if (currentDiv > 1) {
        document.getElementById(`div${currentDiv}`).style.display = 'none';
        currentDiv--;
        document.getElementById(`div${currentDiv}`).style.display = 'block';
    }
}

function updateQuantity(change) {
    quantity += change;
    if (quantity < 1) quantity = 1;
    document.getElementById('quantity').innerText = quantity;
    updateSummary();
}

// function removeFromCart
function removeFromCart() {
    quantity = 0;
    document.getElementById('quantity').innerText = quantity;
    updateSummary();
}

function applyCoupon() {
    const coupon = document.getElementById('coupon').value;
    if (coupon === 'TRAOKIT10%', 'DISCO102', 'TRAOKIT10%OFF' )  {
        discount = quantity * price * 10/100;
    } else {
        discount = 0;
    }
    updateSummary();
}

function updateSummary() {
    const subtotal = quantity * price;
    const total = subtotal - discount;
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discount').innerText = discount.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
    document.getElementById('order-quantity').innerText = quantity;
    document.getElementById('order-subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('order-discount').innerText = discount.toFixed(2);
    document.getElementById('order-total').innerText = total.toFixed(2);
}

function proceedToBilling() {
    if (quantity > 0) {
        document.getElementById('div1').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
        currentDiv = 2;
        updateProgressBar();
    }
}


document.getElementById('billing-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'cod') {
        showOrderSummary();
    } else if (paymentMethod === 'online') {
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div4').style.display = 'block';
    }
});



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

    document.getElementById('div2').style.display = 'none';
    document.getElementById('div3').style.display = 'block';
    currentDiv = 3;
    updateProgressBar();
}

function orderMore() {
    currentDiv = 1;
    document.getElementById('div3').style.display = 'none';
    document.getElementById('div1').style.display = 'block';
    updateProgressBar();
}

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
        },
        onClose: function(){
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
});


// wallet
var walletBalance = 0;

function updateWalletBalance() {
    document.getElementById('wallet-balance').innerText = walletBalance;
}

document.getElementById('wallet-icon').addEventListener('click', function() {
    var paymentForm = document.getElementById('wallet-payment-form');
    paymentForm.style.display = paymentForm.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('wallet-pay-button').addEventListener('click', function(event) {
    event.stopPropagation(); 
    var amount = document.getElementById('amount').value * 100; 
    var email = document.getElementById('email').value;

    var handler = PaystackPop.setup({
        key: 'pk_test_07f16d730fc627dfd475c62727017562d9eb0c78',
        email: email,
        amount: amount,
        currency: "NGN",
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference number
        callback: function(response){
            alert('Payment successful. Transaction ref is ' + response.reference);

            walletBalance += amount / 100; 
            updateWalletBalance();

            document.getElementById('payment-form').style.display = 'none';
        },
        onClose: function(){
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
});

updateWalletBalance();
