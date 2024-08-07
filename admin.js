// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".sidebarBtn");
// sidebarBtn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(sidebar.classList.contains("active")){
//   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
// }else{
//   sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
// }
//name switcher
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar .nav-links a');
  const pageNameSpan = document.getElementById('page-name');

  sidebarLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          // Prevent default action if it's a link
          event.preventDefault();

          // Remove active class from all links
          sidebarLinks.forEach(link => link.classList.remove('active'));
          // Add active class to the clicked link
          this.classList.add('active');

          // Update the dashboard name
          const pageName = this.querySelector('.links_name').textContent;
          pageNameSpan.textContent = pageName;
      });
  });
});

// tab switcher
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section .home-content, section > div');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-target');
      
      sections.forEach(section => {
        if (section.id === targetId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });

      links.forEach(link => link.classList.remove('active'));
      link.classList.add('active');
    });
  });
});



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


// Product list
document.addEventListener('DOMContentLoaded', () => {
  loadFoods();
});

function loadFoods() {
  const foodList = document.getElementById('food-list');
  foodList.innerHTML = '';

  const foods = JSON.parse(localStorage.getItem('foods')) || [];

  foods.forEach((food, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <img src="${food.image}" alt="${food.name}">
          <div>${food.name} - #${food.price}</div>
          <button onclick="deleteFood(${index})">Delete</button>
          <button class="edit-button" onclick="editFood(${index})">Edit</button>
      `;
      foodList.appendChild(li);
  });
}

function addFood() {
  const foodName = document.getElementById('food-name').value;
  const foodPrice = document.getElementById('food-price').value;
  const foodImage = document.getElementById('food-image').files[0];

  if (!foodName || !foodPrice || !foodImage) {
      alert('Please fill in all fields.');
      return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
      const foods = JSON.parse(localStorage.getItem('foods')) || [];
      foods.push({ name: foodName, price: foodPrice, image: e.target.result });

      localStorage.setItem('foods', JSON.stringify(foods));
      loadFoods();

      document.getElementById('food-name').value = '';
      document.getElementById('food-price').value = '';
      document.getElementById('food-image').value = '';
  };
  reader.readAsDataURL(foodImage);
}

function deleteFood(index) {
  const foods = JSON.parse(localStorage.getItem('foods')) || [];
  foods.splice(index, 1);

  localStorage.setItem('foods', JSON.stringify(foods));
  loadFoods();
}

function editFood(index) {
  const foods = JSON.parse(localStorage.getItem('foods')) || [];
  const food = foods[index];

  const foodName = prompt('Enter new food name', food.name);
  const foodPrice = prompt('Enter new food price', food.price);

  if (foodName && foodPrice) {
      foods[index].name = foodName;
      foods[index].price = foodPrice;
      
      // Trigger hidden file input to select new image
      const editImageInput = document.getElementById('edit-food-image');
      editImageInput.dataset.index = index;
      editImageInput.click();
  }
}

function handleEditImageChange(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  const index = fileInput.dataset.index;

  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const foods = JSON.parse(localStorage.getItem('foods')) || [];
          foods[index].image = e.target.result;

          localStorage.setItem('foods', JSON.stringify(foods));
          loadFoods();
      };
      reader.readAsDataURL(file);
  }
}

//order lists
document.addEventListener("DOMContentLoaded", () => {
  updateVendorOrderList();
  document.getElementById('undo-btn').addEventListener('click', undoDelete);
  document.getElementById('close-undo-btn').addEventListener('click', closeUndoMessage);
});

function updateVendorOrderList() {
  const orderList = document.getElementById('vendor-order-list').querySelector('tbody');
  orderList.innerHTML = '';
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  orders.forEach(order => {
      const customerDetails = order.customerDetails || {};

      const orderRow = document.createElement('tr');

      orderRow.innerHTML = `
          <td>${order.orderId || ''}</td>
          <td>${customerDetails.firstName || ''} ${customerDetails.lastName || ''}</td>
          <td>${order.cart ? order.cart.map(item => `${item.name} (x${item.quantity})`).join(', ') : ''}</td>
          <td>
              <select class="status-select" data-id="${order.orderId}">
                  <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                  <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                  <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
          </td>
          <td>
              <button class="delete-btn" data-id="${order.orderId}">Delete</button>
          </td>
      `;

      orderList.appendChild(orderRow);
  });

  // Add event listeners for status select elements
  document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', updateOrderStatus);
  });

  // Add event listeners for delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteOrder);
  });
}

function updateOrderStatus(event) {
  const orderId = event.target.getAttribute('data-id');
  const newStatus = event.target.value;
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  // Find the order and update its status
  const order = orders.find(order => order.orderId === orderId);
  if (order) {
      order.status = newStatus; // Update the status in the order object
      localStorage.setItem('orders', JSON.stringify(orders)); // Save the updated orders back to local storage
      console.log(`Updated order ${orderId} status to ${newStatus}`); // Log the update
  } else {
      console.error('Order not found for status update');
  }
}

function deleteOrder(event) {
  const orderId = event.target.getAttribute('data-id');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  console.log('Current orders before deletion:', orders);
  console.log('Attempting to delete order ID:', orderId);

  // Find the index of the order to delete
  const orderIndex = orders.findIndex(order => order.orderId === orderId);

  if (orderIndex !== -1) {
      // Remove the order from the array
      const deletedOrder = orders.splice(orderIndex, 1)[0];

      // Update the local storage
      localStorage.setItem('orders', JSON.stringify(orders));

      console.log(`Deleted order: ${deletedOrder.orderId}`);

      // Refresh the order list
      updateVendorOrderList();

      // Show undo option
      showUndoOption(deletedOrder);
  } else {
      console.error('Order not found');
  }
}

function showUndoOption(deletedOrder) {
  const undoMessage = document.getElementById('undo-message');
  undoMessage.style.display = 'block';

  const undoBtn = document.getElementById('undo-btn');
  const closeUndoBtn = document.getElementById('close-undo-btn');

  undoBtn.onclick = function() {
      // Restore the deleted order
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(deletedOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      updateVendorOrderList(); // Refresh order list

      // Hide undo option
      undoMessage.style.display = 'none';
  };

  closeUndoBtn.onclick = function() {
      undoMessage.style.display = 'none'; // Close undo message
  };

  // Hide the undo option after 10 seconds
  setTimeout(() => {
      undoMessage.style.display = 'none';
  }, 10000);
}




// analytics
const canvas = document.getElementById('bar-graph');
const bar_graph = new Chart(canvas,{
    type: 'bar',
    data: {
        labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
            {
                label: 'Sales',
                data: [150, 180, 120, 220, 166, 170, 180],
                backgroundColor: ['green'],
            },
            {
                label: 'Profit',
                data: [40, 58, 30, 60, 55, 57, 90],
                backgroundColor: ['orange'],
                
            },
        ]
    },
    // Options: {
    //     indexAxis: 'y',
    // }  


});

// Doughnut Chart

const canvasss = document.getElementById('doughnut-graph');
const doughnut_graph= new Chart(canvasss,{
    type: 'doughnut',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Sales',
                data: [150, 180, 120, 220, 166, 170, 180],
                backgroundColor: ['purple'],
                hoverOffset: 45,
            },
            {
                label: 'Profit',
                data: [40, 58, 30, 60, 55, 57, 90],
                backgroundColor: ['orange'],
                hoverOffset: 45,
                
                
            },
        ]
    }  


});

// Pie Graph
const canvass = document.getElementById('pie-graph');
const pie_graph= new Chart(canvass,{
    type: 'pie',
    data: {
        labels: ['Monday', ],
        datasets: [
            {
                label: 'Sales',
                data: [150,],
                backgroundColor: ['blue'],
                hoverOffset: 45,
            },
            {
                label: 'Profit',
                data: [40,],
                backgroundColor: ['orange'],
                hoverOffset: 45,
                
            },
        ]
    }, 

});



 // Stock


      // Team

       // Messages

      //Rating Scorecard
// Initialize data and comments
let data = JSON.parse(localStorage.getItem('ratingsData')) || [
  { 'star': 1, 'count': 1 },{ 'star': 2, 'count': 3 },{ 'star': 3, 'count': 4 },{ 'star': 4, 'count': 25 },{ 'star': 5, 'count': 57 }
];

const comments = JSON.parse(localStorage.getItem('comments')) || [];

// Function to update the scorecard based on current data
function updateScorecard() {
  let totalRating = 0;
  let ratingBasedOnStars = 0;

  data.forEach(rating => {
    totalRating += rating.count;
    ratingBasedOnStars += rating.count * rating.star;
  });

  let ratingAverage = (ratingBasedOnStars / totalRating).toFixed(1);

  document.querySelector('.ratingAverage h1').innerHTML = ratingAverage;
  document.querySelector('.ratingAverage p').innerHTML = totalRating.toLocaleString();
  document.querySelector('.star-inner').style.width = (ratingAverage / 5) * 100 + "%";

  let ratingProgressHTML = '';
  data.forEach(rating => {
    let progressBarWidth = (rating.count / totalRating) * 100;
    ratingProgressHTML += `
      <div class="ratingProgress-value">
        <p>${rating.star} <span class="star">&#9733;</span></p>
        <div class="progress">
          <div class="bar" style="width: ${progressBarWidth}%;"></div>
        </div>
        <p>${rating.count.toLocaleString()}</p>
      </div>
    `;
  });

  document.querySelector('.ratingProgress').innerHTML = ratingProgressHTML;
}

// Function to display comments
function displayComments() {
  const commentsList = document.querySelector('.comments-list');
  commentsList.innerHTML = '';

  comments.forEach(comment => {
    commentsList.innerHTML += `
      <div class="comment">
        <div class="rating">${'★'.repeat(comment.rating)}</div>
        <p class="comment-text">${comment.comment}</p>
      </div>
    `;
  });
}

// Event listener for rating form submission
function handleRatingFormSubmit(event) {
  event.preventDefault();

  let selectedRating = parseInt(document.querySelector('.star-widget input:checked').value);

  let ratingToUpdate = data.find(rating => rating.star === selectedRating);
  if (ratingToUpdate) {
    ratingToUpdate.count++;
  } else {
    data.push({ star: selectedRating, count: 1 });
  }

  localStorage.setItem('ratingsData', JSON.stringify(data));

  let comment = document.querySelector('.textarea textarea').value;
  comments.push({ rating: selectedRating, comment });
  localStorage.setItem('comments', JSON.stringify(comments));

  document.querySelector('.star-widget').style.display = 'none';
  document.querySelector('.post').style.display = 'block';
}

// Event listener for editing rating
function handleEditButtonClick() {
  document.querySelector('.star-widget').style.display = 'block';
  document.querySelector('.post').style.display = 'none';
}

// Initialize pages based on context
function initializePage() {
  if (document.querySelector('.star-widget')) {
    document.getElementById('ratingForm').addEventListener('submit', handleRatingFormSubmit);
    document.querySelector('.edit').addEventListener('click', handleEditButtonClick);
  }

  if (document.querySelector('.rating')) {
    updateScorecard();
  }

  if (document.querySelector('.comments-list')) {
    displayComments();
  }
}


// Initialize page on load
window.addEventListener('load', initializePage);



const container = document.querySelector('.rating-animation');


const careers =["Thanks for choosing Trao Kitchen!","We value your feedbacks, Your input helps us to improve and serve you better","And we're eager to hear your thoughts on our foods, services, and overall experiences",'we hope to see you soon again!', 'Enjoy your delicious meal'];

let careerIndex = 0;

let characterIndex = 0;


//write a function using the slice method to get the characters in the carrerIndex
function updateText(){
  characterIndex++

  container.innerHTML=` 

  <h1>${careers[careerIndex].slice(0,characterIndex)}</h1>
`;


if(characterIndex=== careers[careerIndex].length){
  careerIndex++;
  characterIndex = 0;
}
//To enable the animation keep running after reaching the end of the array,set the careerIndex back to 0
if(careerIndex=== careers.length){
  careerIndex = 0;
}
setTimeout(updateText,200);
}
updateText();
      // Settings 
