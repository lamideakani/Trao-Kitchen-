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

// order list
document.addEventListener('DOMContentLoaded', populateVendorOrderList);

function populateVendorOrderList() {
    const vendorOrderList = document.getElementById('vendor-order-list').getElementsByTagName('tbody')[0];
    vendorOrderList.innerHTML = ''; // Clear the existing rows

    // Retrieve order history from local storage
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    orderHistory.forEach(order => {
        // Create a new row
        const row = document.createElement('tr');

        // Order ID
        const orderIdCell = document.createElement('td');
        orderIdCell.textContent = order.id;
        row.appendChild(orderIdCell);

        // Customer
        const customerCell = document.createElement('td');
        customerCell.textContent = `${order.customer.firstName} ${order.customer.lastName}`;
        row.appendChild(customerCell);

        // Items
        const itemsCell = document.createElement('td');
        itemsCell.innerHTML = order.items.map(item => `
            <div>
                <strong>${item.name}</strong> - #${item.price.toFixed(2)} x ${item.quantity}
            </div>
        `).join('');
        row.appendChild(itemsCell);

        // Status
        const statusCell = document.createElement('td');
        const statusSelect = document.createElement('select');
        const statuses = ['Pending', 'Processing', 'Approved', 'Cancelled', 'Delivered'];
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === order.status) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });
        statusSelect.addEventListener('change', (event) => updateOrderStatus(order.id, event.target.value));
        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);

        // Actions
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.dataset.id = order.id;
        deleteButton.addEventListener('click', deleteOrder);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        // Append the row to the table body
        vendorOrderList.appendChild(row);
    });
}

function updateOrderStatus(orderId, newStatus) {
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory = orderHistory.map(order => {
        if (order.id === orderId) {
            return { ...order, status: newStatus };
        }
        return order;
    });
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    populateVendorOrderList(); // Refresh the list
    updateCustomerOrderHistory(); // Ensure the customer side is also updated
}

function deleteOrder(event) {
    const orderId = event.target.dataset.id;
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory = orderHistory.filter(order => order.id !== orderId);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    populateVendorOrderList(); // Refresh the list
    showUndoMessage(orderId); // Show undo message
}

function showUndoMessage(orderId) {
    const undoMessage = document.getElementById('undo-message');
    undoMessage.style.display = 'flex';

    document.getElementById('undo-btn').addEventListener('click', () => undoDelete(orderId));
    document.getElementById('close-undo-btn').addEventListener('click', () => {
        undoMessage.style.display = 'none';
    });

    setTimeout(() => {
        undoMessage.style.display = 'none';
    }, 10000); // Hide after 10 seconds
}

function undoDelete(orderId) {
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    // Restore the deleted order
    // This should be adjusted based on the actual way orders are managed
    // For now, this is a placeholder to demonstrate the undo functionality
    const lastDeletedOrder = { /* Restore logic should be here */ };
    orderHistory.push(lastDeletedOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    populateVendorOrderList(); // Refresh the list
}

function updateCustomerOrderHistory() {
    // Refresh the customer's order history
    // This approach involves dynamically reloading the customer side script
    const customerOrderScript = document.createElement('script');
    customerOrderScript.src = 'customer-order-history.js';
    document.body.appendChild(customerOrderScript);
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
