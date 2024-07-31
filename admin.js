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

document.addEventListener('DOMContentLoaded', () => {
  const orders = [
      { orderId: 'O1', itemName: 'Spaghetti, Plantain and Titus', quantity: 2, date: '2024-07-20' },
      { orderId: 'O2', itemName: 'Jollof Rice', quantity: 1, date: '2024-07-21' },
      { orderId: 'O3', itemName: 'Beans', quantity: 2, date: '2024-07-20' },
      { orderId: 'O4', itemName: 'Plantain & egg sauce', quantity: 1, date: '2024-07-21' },
      { orderId: 'O5', itemName: 'Amala & Ewedu', quantity: 2, date: '2024-07-22' },
      { orderId: 'O6', itemName: 'Amala & Ewedu', quantity: 3, date: '2024-07-23' },
      { orderId: 'O7', itemName: 'Amala & Ewedu', quantity: 3, date: '2024-07-23' },
      { orderId: 'O8', itemName: 'Amala & Ewedu', quantity: 10, date: '2024-07-23' }

  ];

  function renderOrderHistory() {
      const orderTableBody = document.getElementById('orderHistoryTable').querySelector('tbody');
      orderTableBody.innerHTML = '';
      let totalOrdersQuantity = 0;

      orders.forEach(order => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${order.orderId}</td>
              <td>${order.itemName}</td>
              <td>${order.quantity}</td>
              <td>${order.date}</td>
          `;
          orderTableBody.appendChild(row);
          totalOrdersQuantity += order.quantity;
      });

      document.getElementById('totalOrdersQuantity').textContent = totalOrdersQuantity;
  }

  renderOrderHistory();
});
