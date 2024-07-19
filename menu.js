// Everything is redering from javascript, i have listed the classes also, 
//...it's not in css yet, but the classnames are below for easy styling.

// i have not gotten how to add images locally in js yet, i can only use link, that's why i used
// ...an image for the icon



document.addEventListener("DOMContentLoaded", function() {
    const products = [
        {
            image: 'https://via.placeholder.com/200',
            name: 'Amala',
            price: '$10.00'
        },
        {
            image: 'https://via.placeholder.com/200',
            name: 'Fried Rice',
            price: '$20.00'
        },

        {
            image: "https://via.placeholder.com/200",
            name: "Jollof Rice",
            price: "$20"
        },
        {
            image: 'assets/amala.jpg',
            name: 'Suya',
            price: '$10.00'
        },
        {
            image: 'https://via.placeholder.com/200',
            name: 'Fried Chicken',
            price: '$20.00'
        },

        {
            image: "https://via.placeholder.com/200",
            name: "Coke",
            price: "$20"
        },
        {
            image: "https://via.placeholder.com/200",
            name: "Fanta",
            price: "$20"
        },
        {
            image: "https://via.placeholder.com/200",
            name: "Four Cousins",
            price: "$20"
        }
    ];

    const productContainer = document.getElementById('menu-container');

    function renderProducts() {
        productContainer.innerHTML = ''; 
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const productImage = document.createElement('img');
            productImage.className = 'product-image';
            productImage.src = product.image;
            productCard.appendChild(productImage);

            const productName = document.createElement('h3');
            productName.className = 'product-name';
            productName.textContent = product.name;
            productCard.appendChild(productName);

            const productPrice = document.createElement('div');
            productPrice.className = 'price';
            productPrice.textContent = product.price;
            productCard.appendChild(productPrice);

            // const favoriteButton = document.createElement('button');
            // favoriteButton.textContent = 'Add to Favorite';
            // favoriteButton.onclick = () => alert(`Added ${product.name} to favorite`);
            // productCard.appendChild(favoriteButton);

            const favoriteIcon = document.createElement('img');
            favoriteIcon.className = 'favorite-icon';
            favoriteIcon.src = 'https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/add-to-favorites-icon.png'; // Path to your icon image
            favoriteIcon.alt = 'Add to Favorite';
            favoriteIcon.style.cursor = 'pointer';
            favoriteIcon.onclick = () => alert(`Added ${product.name} to favorite`);
            

        productCard.appendChild(favoriteIcon);

            const quickViewButton = document.createElement('button');
            quickViewButton.className = 'quickview-button';
            quickViewButton.textContent = 'Quick View';
            quickViewButton.onclick = () => alert(`Viewing details of ${product.name}`);
            productCard.appendChild(quickViewButton);

            const addToCartButton = document.createElement('button');
            addToCartButton.className = 'add-to-cart-btn';
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.onclick = () => alert(`Added ${product.name} to cart`);
            productCard.appendChild(addToCartButton);

            productContainer.appendChild(productCard);
        });
    }

    renderProducts();
});
