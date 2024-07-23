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
