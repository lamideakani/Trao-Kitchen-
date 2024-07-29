document.getElementById('adminForgotPasswordForm1').addEventListener('submit', function(e) {
    e.preventDefault();

    var adminUsername = document.getElementById('adminUsername').value;
    var adminEmail = document.getElementById('adminEmail').value;

    var storedAdminData = JSON.parse(localStorage.getItem(adminUsername));

    if (storedAdminData && storedAdminData.email === adminEmail) {
        alert("Username and email match. Please create a new password.");
        document.getElementById('div1').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
    } else {
        alert("Username and email do not match.");
    }
});

document.getElementById('adminForgotPasswordForm2').addEventListener('submit', function(e) {
    e.preventDefault();

    var adminUsername = document.getElementById('adminUsername').value;
    var adminNewPassword = document.getElementById('adminNewPassword').value;
    var adminRepeatPassword = document.getElementById('adminRepeatPassword').value;

    if (adminNewPassword === adminRepeatPassword) {
        var storedAdminData = JSON.parse(localStorage.getItem(adminUsername));
        storedAdminData.password = adminNewPassword;
        localStorage.setItem(adminUsername, JSON.stringify(storedAdminData));
        alert("Password has been successfully reset.");
        window.location.href = 'signup.html';
    } else {
        alert("Passwords do not match.");
    }
});
