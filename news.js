const apiKey = '3c9d8e8abb274902b925c7015fad8d5a';

// API URLs for different categories
const apiUrls = {
    food: `https://newsapi.org/v2/everything?q=food&language=en&apiKey=${apiKey}`,
    health: `https://newsapi.org/v2/everything?q=health&language=en&apiKey=${apiKey}`,
    local: `https://newsapi.org/v2/everything?q=local&language=en&apiKey=${apiKey}`
};

// Function to fetch news based on category
async function fetchNews(category) {
    try {
        const response = await fetch(apiUrls[category]);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            displayNews(category, data.articles);
        } else {
            displayError(category, 'No articles found. Please try again later.');
        }
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
        displayError(category, 'Error fetching news. Please try again later.');
    }
}

// Function to display news articles
function displayNews(category, articles) {
    const newsSection = document.getElementById(`${category}-news-section`);
    newsSection.innerHTML = `<h1>${capitalizeFirstLetter(category)} News</h1>`;

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const articleImage = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : '';
        const articleContent = `
            ${articleImage}
            <h2>${article.title}</h2>
            <p>${article.description || 'Description not available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        articleDiv.innerHTML = articleContent;
        newsSection.appendChild(articleDiv);
    });
}

// Function to display error messages
function displayError(category, message) {
    const newsSection = document.getElementById(`${category}-news-section`);
    newsSection.innerHTML = `<p>${message}</p>`;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to fetch news for all categories
function fetchAllNews() {
    fetchNews('food');
    fetchNews('health');
    fetchNews('local');
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch news initially
    fetchAllNews();

    // Set intervals to fetch news periodically
    setInterval(fetchAllNews, 1800000); // 30 minutes

    // Add event listener for the refresh button
    document.getElementById('refresh-news').addEventListener('click', fetchAllNews);
});
