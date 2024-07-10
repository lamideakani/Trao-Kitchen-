// let signup = document.querySelector('#signup');
// let signin = document.querySelector('#signin');
// let body = document.querySelector('body');

// signup.onclick = function(){
//   body.classList.add('signup');
// }
// signin.onclick = function(){
//   body.classList.remove('signup');
// }

let signup = document.querySelector('#signup');
let signin = document.querySelector('#signin');
let body = document.querySelector('body');

signup.onclick = function() {
  body.classList.add('signup');
}

signin.onclick = function() {
  body.classList.remove('signup');
}

document.getElementById('signinform').addEventListener('submit', function(event) {
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
    // Perform login
    alert('Login successful');
  }
});

document.getElementById('signupform').addEventListener('submit', function(event) {
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
    // Perform registration
    alert('Registration successful');
  }
});

function setError(element, message) {
  let errorElement = element.nextElementSibling;
  errorElement.innerText = message;
  errorElement.style.display = 'block';
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
