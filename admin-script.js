// JavaScript for star rating and scorecard linkage

// Initial data for scorecard
let data = [
  { 'star': 5, 'count': 99980 },
  { 'star': 4, 'count': 39300 },
  { 'star': 3, 'count': 25050 },
  { 'star': 2, 'count': 10070 },
  { 'star': 1, 'count': 5020 }
];

// Function to update the scorecard based on current data
function updateScorecard() {
  let totalRating = 0;
  let ratingBasedOnStars = 0;

  // Calculate total ratings and weighted rating
  data.forEach(rating => {
    totalRating += rating.count;
    ratingBasedOnStars += rating.count * rating.star;
  });

  // Calculate average rating
  let ratingAverage = (ratingBasedOnStars / totalRating).toFixed(1);

  // Update HTML elements with calculated values
  document.querySelector('.ratingAverage h1').innerHTML = ratingAverage;
  document.querySelector('.ratingAverage p').innerHTML = totalRating.toLocaleString();
  document.querySelector('.star-inner').style.width = (ratingAverage / 5) * 100 + "%";

  // Update rating progress bars
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

  // Update the DOM with the new rating progress bars
  document.querySelector('.ratingProgress').innerHTML = ratingProgressHTML;
}

// Initial update of scorecard on page load
updateScorecard();

// Event listener for when the rating form is submitted
document.getElementById('ratingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the selected rating value
  let selectedRating = parseInt(document.querySelector('.star-widget input:checked').value);

  // Update the data array with the new rating
  let ratingToUpdate = data.find(rating => rating.star === selectedRating);
  if (ratingToUpdate) {
    ratingToUpdate.count++;
  }

  // Update the scorecard with the new data
  updateScorecard();

  // Show the post submission message and hide the rating form
  document.querySelector('.star-widget').style.display = 'none';
  document.querySelector('.post').style.display = 'block';
});

// Event listener for when the user wants to edit their rating
document.querySelector('.edit').addEventListener('click', function() {
  // Hide the post submission message and show the rating form again
  document.querySelector('.star-widget').style.display = 'block';
  document.querySelector('.post').style.display = 'none';
});
