function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    const items = document.querySelectorAll('.list-group-item');
    items.forEach(item => item.classList.remove('active'));
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
}

function goBackToMain() {
    window.location.href = 'index.html';
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
    document.getElementById('profile-pic').src = settings.profilePic || '';
    document.getElementById('username').value = settings.username || '';
    document.getElementById('name').value = settings.name || '';
    document.getElementById('email').value = settings.email || '';
    document.getElementById('company').value = settings.company || '';
    document.getElementById('current-password').value = settings.currentPassword || '';
    document.getElementById('new-password').value = settings.newPassword || '';
    document.getElementById('repeat-password').value = settings.repeatPassword || '';
    document.getElementById('bio').value = settings.bio || '';
    document.getElementById('birthday').value = settings.birthday || '';
    document.getElementById('country').value = settings.country || '';
    document.getElementById('phone').value = settings.phone || '';
    document.getElementById('website').value = settings.website || '';
    document.getElementById('twitter').value = settings.twitter || '';
    document.getElementById('facebook').value = settings.facebook || '';
    document.getElementById('google-plus').value = settings.googlePlus || '';
    document.getElementById('linkedin').value = settings.linkedin || '';
    document.getElementById('instagram').value = settings.instagram || '';
    document.getElementById('google-email').textContent = settings.googleEmail || 'example@gmail.com';
    document.getElementById('activity-notifications').checked = settings.activityNotifications !== false;
    document.getElementById('new-follower-notifications').checked = settings.newFollowerNotifications === true;
    document.getElementById('news-updates').checked = settings.newsUpdates !== false;
    document.getElementById('weekly-digest').checked = settings.weeklyDigest === true;
    document.getElementById('feature-updates').checked = settings.featureUpdates !== false;
}

function saveSettings() {
    const settings = {
        profilePic: document.getElementById('profile-pic').src,
        username: document.getElementById('username').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        currentPassword: document.getElementById('current-password').value,
        newPassword: document.getElementById('new-password').value,
        repeatPassword: document.getElementById('repeat-password').value,
        bio: document.getElementById('bio').value,
        birthday: document.getElementById('birthday').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        twitter: document.getElementById('twitter').value,
        facebook: document.getElementById('facebook').value,
        googlePlus: document.getElementById('google-plus').value,
        linkedin: document.getElementById('linkedin').value,
        instagram: document.getElementById('instagram').value,
        googleEmail: document.getElementById('google-email').textContent,
        activityNotifications: document.getElementById('activity-notifications').checked,
        newFollowerNotifications: document.getElementById('new-follower-notifications').checked,
        newsUpdates: document.getElementById('news-updates').checked,
        weeklyDigest: document.getElementById('weekly-digest').checked,
        featureUpdates: document.getElementById('feature-updates').checked,
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

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
