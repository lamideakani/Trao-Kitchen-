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

