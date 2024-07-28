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