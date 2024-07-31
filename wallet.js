document.addEventListener('DOMContentLoaded', () => {
    const walletBalanceElement = document.getElementById('wallet-balance');
    const transactionListElement = document.getElementById('transaction-list');
    const addMoneyBtn = document.getElementById('add-money-btn');
    const addMoneyModal = document.getElementById('add-money-modal');
    const closeModalBtn = document.querySelector('.close');
    const paystackBtn = document.getElementById('paystack-btn');
    const amountInput = document.getElementById('amount');

    let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

    function updateWalletBalance() {
        walletBalanceElement.textContent = walletBalance.toFixed(2);
    }

    function updateTransactionHistory() {
        transactionListElement.innerHTML = '';
        transactionHistory.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.type}: ₦${transaction.amount.toFixed(2)} - ${transaction.date}`;
            transactionListElement.appendChild(listItem);
        });
    }

    addMoneyBtn.addEventListener('click', () => {
        addMoneyModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        addMoneyModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === addMoneyModal) {
            addMoneyModal.style.display = 'none';
        }
    });

    paystackBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        payWithPaystack(amount);
    });

    function payWithPaystack(amount) {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            document.getElementById('balance').style.display = 'none';
            document.getElementById('thistory').style.display = 'none';
            alert('Please log in to add money to your wallet.');
            window.location.href = 'clientlogin.html'; // Redirect to login page
            return;
        }

        // Fetch user email from local storage
        const loggedInUsername = localStorage.getItem('loggedInUsername');
        if (!loggedInUsername) {
            alert('Please sign up or log in to use Paystack.');
            return;
        }

        const userData = JSON.parse(localStorage.getItem(loggedInUsername));
        if (!userData || !userData.email) {
            alert('No email address found. Please update your profile.');
            return;
        }

        let handler = PaystackPop.setup({
            key: 'pk_test_07f16d730fc627dfd475c62727017562d9eb0c78', // Replace with your Paystack public key
            email: userData.email, // Fetch the email from user data
            amount: amount * 100, // Amount in kobo
            currency: 'NGN',
            callback: function(response) {
                alert('Payment successful. Transaction reference: ' + response.reference);
                walletBalance += amount;
                const transaction = {
                    type: 'Credit',
                    amount: amount,
                    date: new Date().toLocaleString()
                };
                transactionHistory.push(transaction);
                localStorage.setItem('walletBalance', walletBalance);
                localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
                updateWalletBalance();
                updateTransactionHistory();
                addMoneyModal.style.display = 'none';
                amountInput.value = '';
            },
            onClose: function() {
                alert('Transaction was not completed.');
            }
        });
        handler.openIframe();
    }

    function payWithWallet(amount) {
        if (walletBalance >= amount) {
            walletBalance -= amount;
            const transaction = {
                type: 'Debit',
                amount: amount,
                date: new Date().toLocaleString()
            };
            transactionHistory.push(transaction);
            localStorage.setItem('walletBalance', walletBalance);
            localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
            updateWalletBalance();
            updateTransactionHistory();
            alert('Payment successful.');
        } else {
            alert('Insufficient wallet balance.');
        }
    }

    updateWalletBalance();
    updateTransactionHistory();

    // Expose payWithWallet function to be used in other scripts
    window.payWithWallet = payWithWallet;
});
