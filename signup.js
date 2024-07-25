const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => {
    hamburgerBtn.click();
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});

// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

// Display the login popup by default
document.body.classList.add("show-popup");

// Handle form submissions
document.querySelector(".form-box.login form").addEventListener("submit", handleLogin);
document.querySelector(".form-box.signup form").addEventListener("submit", handleSignup);

function showToast(message, color) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: color,
        stopOnFocus: true,
    }).showToast();
}

function handleSignup(e) {
    e.preventDefault();
    clearErrorMessages();

    const form = e.target;
    const username = form.querySelector('#signup-username').value;
    const email = form.querySelector('#signup-email').value;
    const password = form.querySelector('#signup-password').value;
    const policy = form.querySelector('#policy').checked;

    let isValid = true;

    // Validate terms and conditions
    if (!policy) {
        showErrorMessage(form.querySelector('#policy'), "You must agree to the Terms & Conditions.");
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
        showErrorMessage(form.querySelector('#signup-email'), "Please enter a valid email address.");
        isValid = false;
    }

    // Validate password
    if (!validatePassword(password)) {
        showErrorMessage(form.querySelector('#signup-password'), "Password must be at least 6 characters long and contain at least one number.");
        isValid = false;
    }

    // Validate username
    if (!username.trim()) {
        showErrorMessage(form.querySelector('#signup-username'), "Username cannot be empty.");
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            showToast("User already exists. Please login.", "red");
        } else {
            // Save the user's details using their username as the key
            const newUser = { username: username.trim(), email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem(newUser.username, JSON.stringify(newUser)); // Save user details separately
            showToast("Signup successful. Please login.", "green");
            localStorage.setItem('adminloggedInUsername', newUser.username); // Save logged in username
            formPopup.classList.remove("show-signup");
        }
    }
}

// Attach the event listener to the form
document.getElementById('signup-form').addEventListener('submit', handleSignup);


function handleLogin(e) {
    e.preventDefault();
    clearErrorMessages();
    const email = e.target.querySelector('#login-email').value;
    const password = e.target.querySelector('#login-password').value;

    let isValid = true;

    if (!validateEmail(email)) {
        showErrorMessage(e.target.querySelector('#login-email'), "Please enter a valid email address.");
        isValid = false;
    }

    if (!validatePassword(password)) {
        showErrorMessage(e.target.querySelector('#login-password'), "Password must be at least 6 characters long and contain at least one number.");
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            showToast("Login successful.", "green");
            document.body.classList.remove("show-popup");
            //flag
            localStorage.setItem('adminIsLoggedIn', 'true');
            // proceed with login
            setTimeout(() =>{
                window.location.assign('admin.html');
            }, 1500);
        } else {
            showToast("Invalid email or password.", "red");
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*\d).{6,}$/;
    return re.test(password);
}

function showErrorMessage(input, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.innerText = message;
    error.style.color = "red";
    input.parentNode.appendChild(error);
}

function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach(error => error.remove());
}
