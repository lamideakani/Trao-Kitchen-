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
    const email = e.target.querySelector('#signup-email').value;
    const password = e.target.querySelector('#signup-password').value;
    const policy = e.target.querySelector('input[type="checkbox"]').checked;

    let isValid = true;

    if (!policy) {
        showErrorMessage(e.target.querySelector('input[type="checkbox"]'), "You must agree to the Terms & Conditions.");
        isValid = false;
    }

    if (!validateEmail(email)) {
        showErrorMessage(e.target.querySelector('#signup-email'), "Please enter a valid email address.");
        isValid = false;
    }

    if (!validatePassword(password)) {
        showErrorMessage(e.target.querySelector('#signup-password'), "Password must be at least 6 characters long and contain at least one number.");
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            showToast("User already exists. Please login.", "red");
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            showToast("Signup successful. Please login.", "green");
            formPopup.classList.remove("show-signup");
        }
    }
}

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
