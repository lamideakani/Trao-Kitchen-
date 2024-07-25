function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    const items = document.querySelectorAll('.list-group-item');
    items.forEach(item => item.classList.remove('active'));
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
}

function goBackToMain() {
    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const adminloggedInUsername = localStorage.getItem('adminloggedInUsername'); 

    if (adminloggedInUsername) {
        const userData = JSON.parse(localStorage.getItem(adminloggedInUsername));

        if (userData) {
            document.getElementById('username').value = userData.username || '';
            document.getElementById('email').value = userData.email || '';
            document.getElementById('current-password').value = userData.password || '';
        }
    }

    document.getElementById('saveProfile').addEventListener('click', function() {
        const updatedUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('current-password').value // Assuming you want to keep the current password
        };

        localStorage.setItem(adminloggedInUsername, JSON.stringify(updatedUser));

        // Also update the users array to reflect changes
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(user => user.username === adminloggedInUsername ? updatedUser : user);
        localStorage.setItem('users', JSON.stringify(users));
    });
});

  
  
// Function to save admin settings to localStorage
function adminsaveSettings() {
    const settings = {
        profilePic: document.getElementById('profile-pic').src,
        username: document.getElementById('username').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        bio: document.getElementById('bio').value,
        birthday: document.getElementById('birthday').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        twitter: document.getElementById('twitter').value,
        facebook: document.getElementById('facebook').value,
        googlePlus: document.getElementById('google-plus').value,
        linkedIn: document.getElementById('linkedin').value,
        instagram: document.getElementById('instagram').value,
        activityNotifications: document.getElementById('activity-notifications').checked,
        newFollowerNotifications: document.getElementById('new-follower-notifications').checked,
        newsUpdates: document.getElementById('news-updates').checked,
        appFeedback: document.getElementById('app-feedback').checked
    };

    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

// Function to load admin settings from localStorage
function adminloadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {};

    document.getElementById('profile-pic').src = settings.profilePic || '/assets/default-profile-picture.jpg';
    document.getElementById('username').value = settings.username || '';
    document.getElementById('name').value = settings.name || '';
    document.getElementById('email').value = settings.email || '';
    document.getElementById('role').value = settings.role || '';
    document.getElementById('bio').value = settings.bio || '';
    document.getElementById('birthday').value = settings.birthday || '';
    document.getElementById('country').value = settings.country || '';
    document.getElementById('phone').value = settings.phone || '';
    document.getElementById('website').value = settings.website || '';
    document.getElementById('twitter').value = settings.twitter || '';
    document.getElementById('facebook').value = settings.facebook || '';
    document.getElementById('google-plus').value = settings.googlePlus || '';
    document.getElementById('linkedin').value = settings.linkedIn || '';
    document.getElementById('instagram').value = settings.instagram || '';
    document.getElementById('activity-notifications').checked = settings.activityNotifications || false;
    document.getElementById('new-follower-notifications').checked = settings.newFollowerNotifications || false;
    document.getElementById('news-updates').checked = settings.newsUpdates || false;
    document.getElementById('app-feedback').checked = settings.appFeedback || false;
}

// Event listener for Save Changes button
document.getElementById('saveProfile').addEventListener('click', adminsaveSettings);

// Initial loading of settings on page load
document.addEventListener('DOMContentLoaded', adminloadSettings);


function uploadPhoto() {
    const fileInput = document.getElementById('upload-photo');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profile-pic').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function resetPhoto() {
    document.getElementById('profile-pic').src = '/assets/vecteezy_default-profile-picture-avatar-user-avatar-icon-person_21548095.jpg';
}

function resendConfirmation() {
    alert('Confirmation email resent!');
}

let newPassword = document.getElementById('new-password');
let confirmPassword = document.getElementById('repeat-password');
let openclose = document.getElementById('openclose');
let openclose1 = document.getElementById('openclose1');
let openclose2 = document.getElementById('openclose2');

openclose.addEventListener('click', function () {
  if (document.getElementById('current-password').type == 'password') {
    document.getElementById('current-password').type = 'text';
    openclose.src = 'eye-openn.svg';
  } else {
    document.getElementById('current-password').type = 'password';
    openclose.src = 'eye-close.png';
  }
});

openclose1.addEventListener('click', function () {
  if (newPassword.type == 'password') {
    newPassword.type = 'text';
    openclose1.src = 'eye-openn.svg';
  } else {
    newPassword.type = 'password';
    openclose1.src = 'eye-close.png';
  }
});

openclose2.addEventListener('click', function () {
  if (confirmPassword.type == 'password') {
    confirmPassword.type = 'text';
    openclose2.src = 'eye-openn.svg';
  } else {
    confirmPassword.type = 'password';
    openclose2.src = 'eye-close.png';
  }
});
