let signup = document.querySelector('#signup');
let signin = document.querySelector('#signin');
let body = document.querySelector('body');

signup.onclick = function () {
  body.classList.add('signup');
}

signin.onclick = function () {
  body.classList.remove('signup');
}

document.getElementById('signinform').addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;

  let loginUsername = document.getElementById('loginUsername');
  let loginPassword = document.getElementById('loginPassword');

  if (loginUsername.value.trim() === "") {
    setError(loginUsername, "Username is required");
    isValid = false;
  } else {
    clearError(loginUsername);
  }

  if (loginPassword.value.trim() === "") {
    setError(loginPassword, "Password is required");
    isValid = false;
  } else {
    clearError(loginPassword);
  }

  if (isValid) {
    const storedUser = JSON.parse(localStorage.getItem(loginUsername.value.trim()));
    if (storedUser && storedUser.password === loginPassword.value.trim()) {
      showToast("Login successful", "green");
      // flag to indicate the user is logged in
    localStorage.setItem('isLoggedIn', 'true');
      // Proceed with login
      setTimeout(() => {
        window.location.assign('index.html');
      }, 1500);
    } else {
      showToast("Invalid username or password");
    }
  }
});

document.getElementById('signupform').addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;

  let signupUsername = document.getElementById('signupUsername');
  let signupEmail = document.getElementById('signupEmail');
  let signupPassword = document.getElementById('signupPassword');
  let signupConfirmPassword = document.getElementById('signupConfirmPassword');
  

  if (signupUsername.value.trim() === "") {
    setError(signupUsername, "Username is required");
    isValid = false;
  } else {
    clearError(signupUsername);
  }

  if (signupEmail.value.trim() === "") {
    setError(signupEmail, "Email is required");
    isValid = false;
  } else if (!isValidEmail(signupEmail.value)) {
    setError(signupEmail, "Email is invalid");
    isValid = false;
  } else {
    clearError(signupEmail);
  }

  if (signupPassword.value.trim() === "") {
    setError(signupPassword, "Password is required");
    isValid = false;
  } else if (!isValidPassword(signupPassword.value.trim())) {
    setError(signupPassword, "Password must be at least 6 characters long and contain at least one number");
    isValid = false;
  } else {
    clearError(signupPassword);
  }

  if (signupConfirmPassword.value.trim() === "") {
    setError(signupConfirmPassword, "Confirm Password is required");
    isValid = false;
  } else if (signupPassword.value !== signupConfirmPassword.value) {
    setError(signupConfirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    clearError(signupConfirmPassword);
  }

  if (isValid) {
    const newUser = {
      username: signupUsername.value.trim(),
      email: signupEmail.value.trim(),
      password: signupPassword.value.trim(),
      signupDate: new Date().toLocaleDateString() // Add signup date
      
    };
    localStorage.setItem(signupUsername.value.trim(), JSON.stringify(newUser));
    showToast("Registration successful", "green");
    localStorage.setItem('loggedInUsername', signupUsername.value.trim());
    window.location.href = ''; // Redirect to profile settings page
  }
});


function setError(element, message) {
  let errorElement = element.nextElementSibling;
  errorElement.innerText = message;
  errorElement.style.display = 'block';
  errorElement.style.color = 'red';
}

function clearError(element) {
  let errorElement = element.nextElementSibling;
  errorElement.innerText = '';
  errorElement.style.display = 'none';
}

function isValidEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  let regex = /^(?=.*\d).{6,}$/; // Password must be at least 6 characters long and contain at least one number
  return regex.test(password);
}

function showToast(message, color = "red") {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: color,
  }).showToast();
}

let password = document.getElementById('loginPassword');
let signuppassword = document.getElementById('signupPassword');
let signupconfirmpassword = document.getElementById('signupConfirmPassword');
let openclose = document.getElementById('openclose');
let openclose1 = document.getElementById('openclose1');
let openclose2 = document.getElementById('openclose2');

openclose.addEventListener('click', function () {
  if (password.type == 'password') {
    password.type = 'text';
    openclose.src = 'eye-openn.svg';
  } else {
    password.type = 'password';
    openclose.src = 'eye-close.png';
  }
});

openclose1.addEventListener('click', function () {
  if (signuppassword.type == 'password') {
    signuppassword.type = 'text';
    openclose1.src = 'eye-openn.svg';
  } else {
    signuppassword.type = 'password';
    openclose1.src = 'eye-close.png';
  }
});

openclose2.addEventListener('click', function () {
  if (signupconfirmpassword.type == 'password') {
    signupconfirmpassword.type = 'text';
    openclose2.src = 'eye-openn.svg';
  } else {
    signupconfirmpassword.type = 'password';
    openclose2.src = 'eye-close.png';
  }
});
