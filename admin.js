// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".sidebarBtn");
// sidebarBtn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(sidebar.classList.contains("active")){
//   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
// }else{
//   sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
// }
//
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
    sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
  }else{
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

// JavaScript to handle the star rating
// document.addEventListener('DOMContentLoaded', (event) => {
//   let stars = document.querySelectorAll('.star-rating .fa-star');
//   let rating = 4; // Replace with the actual rating value

//   for (let i = 0; i < rating; i++) {
//     stars[i].classList.add('checked');
//   }
// });

document.addEventListener('DOMContentLoaded', (event) => {
  let data = JSON.parse(localStorage.getItem('ratings')) || [];

  let totalRating = 0;
  let ratingBasedOnStars = 0;
  data.forEach(rating => {
    totalRating += rating.count;
    ratingBasedOnStars += rating.count * rating.star;
  });

  data.forEach(rating => {
    let ratingProgress = `
      <div class="ratingProgress-value">
        <p>${rating.star} <span class="star">&#9733;</span></p>
        <div class="progress">
          <div class="bar" style="width: ${(rating.count / totalRating) * 100}%;"></div>
        </div>
        <p>${rating.count.toLocaleString()}</p>
      </div>
    `;

    document.querySelector('.ratingProgress').innerHTML += ratingProgress;
  });

  let ratingAverage = (ratingBasedOnStars / totalRating).toFixed(1);
  document.querySelector('.ratingAverage p').innerHTML = totalRating.toLocaleString();
  document.querySelector('.ratingAverage h1').innerHTML = ratingAverage;
  document.querySelector('.star-inner').style.width = (ratingAverage / 5) * 100 + "%";
});



document.addEventListener("DOMContentLoaded", function() {
  const profileDetails = document.getElementById("profileDetails");
  const profileContainer = document.getElementById("logged-in");

  profileDetails.addEventListener("click", function(event) {
    profileContainer.style.display = profileContainer.style.display === "none" ? "block" : "none";
  });

  // Hide profile container when clicking outside
  document.addEventListener("click", function(event) {
    if (!profileDetails.contains(event.target) && !profileContainer.contains(event.target)) {
      profileContainer.style.display = "none";
    }
  });
});


window.onload = function() {
  const settings = JSON.parse(localStorage.getItem('adminSettings'));
  if (settings) {
      document.getElementById('profile-pic').src = settings.profilePic || '';
      document.getElementById('profile-pic2').src = settings.profilePic || '';
  }

  const loggedInUsername = localStorage.getItem('adminloggedInUsername');

  if (loggedInUsername) {
    const userData = JSON.parse(localStorage.getItem(loggedInUsername));
    
    if (userData) {
        let username = userData.username || '';
        username = username.length > 8 ? username.substring(0, 8) : username;
        document.getElementById('username').textContent = username;
        document.getElementById('username2').textContent = username;
    }
}
};


function logout() {
  // Save the state to local storage
  localStorage.setItem('adminIsLoggedIn', 'false');
  window.location.href = 'index.html';
}