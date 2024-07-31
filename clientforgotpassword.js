document.getElementById('forgotPasswordForm1').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;

    var storedUserData = JSON.parse(localStorage.getItem(username));

    if (storedUserData && storedUserData.email === email) {
        alert("Username and email match. Please create a new password.");
        document.getElementById('div1').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
    } else {
        alert("Username and email do not match.");
    }
});

document.getElementById('forgotPasswordForm2').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var newpassword = document.getElementById('newpassword').value;
    var repeatpassword = document.getElementById('repeatpassword').value;

    if (newpassword === repeatpassword) {
        var storedUserData = JSON.parse(localStorage.getItem(username));
        storedUserData.password = newpassword;
        localStorage.setItem(username, JSON.stringify(storedUserData));
        alert("Password has been successfully reset.");
        window.location.href = 'clientlogin.html';
    } else {
        alert("Passwords do not match.");
    }
});
