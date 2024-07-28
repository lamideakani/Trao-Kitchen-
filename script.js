/**
 * NAVBAR MINI Screen
 */
// Helper function to add event listeners to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach(element => {
    element.addEventListener(eventType, callback);
  });
};

const navbar = document.querySelector(".navbar");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector(".overlay");
const navToggleBtn = document.querySelector(".nav-toggle-btn");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
  navToggleBtn.classList.toggle("active");
}

// Use the helper function to add click event listeners to nav togglers
addEventOnElements(navTogglers, "click", toggleNavbar);

// Hide navbar when clicking outside
document.addEventListener("click", function (event) {
  if (!navbar.contains(event.target) && !navToggleBtn.contains(event.target) && !overlay.contains(event.target)) {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
    navToggleBtn.classList.remove("active");
  }
});

// Hide navbar on scroll
window.addEventListener("scroll", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
  navToggleBtn.classList.remove("active");
});





// header
const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});


// // searchbar
const products = [
    // Main Dishes
    {id:"m1", name: "Spaghetti, Plantain and Titus", img: "/Menu Pictures/main 2.jpg", description: "Spaghetti, plantain and boiled fish (Titus)", price: 2300, category:'main'},
    { id:"m2", name: "Jollof Rice", img: "/Menu Pictures/main 5.jpg", description: "Jollof rice with chicken and plantain or coleslaw", price: 2800, category:'main' },
      { id:"m3", name: "Beans", img: "/Menu Pictures/main 35.jpg", description: "Well cooked beans with plantain  ", price: 2400, category:'main' },
      { id:"m4", name: "Coconut Fried Rice", img: "/Menu Pictures/main 21.jpg", description: "fried rice with big turkey", price: 3300, category:'main' },
      {id:"m5", name: "Plantain & egg sauce", img: "/Menu Pictures/main 13.jpg", description: "Fried plantain with egg sauce", price: 2100, category:'main' },
      {id:"m6", name: "Chicken & Chips", img: "/Menu Pictures/main 14.jpg", description: "Fried peppered chips with chicken", price: 3500, category:'main' },
      { id:"m7",name: "Yam & Egg Sauce", img: "/Menu Pictures/main 6.jpg", description: "slices of cooked yam & Egg Sauce", price: 2700, category:'main' },
      { id:"m8",name: "White Rice", img: "/Menu Pictures/main 33.jpg", description: "White Rice plus Plantain & Meats", price: 3500, category:'main' },
      {id:"m9", name: "Plantain & egg sauce", img: "/Menu Pictures/main 37.jpg", description: "boiled plantain with egg sauce", price: 3200 , category:'main'},
      {id:"m10", name: "Ekuru", img: "/Menu Pictures/main 16.jpg", description: "delicious ekuru with sauce and fish", price: 1900, category:'main' },
      { id:"m11", name: "Spaghetti , plantain and Titus", img: "/Menu Pictures/main 4.jpg", description: "Spaghetti, plantain and boiled fish (Titus)", price: 2950 , category:'main'},
      { id:"m12", name: "Porridge", img: "/Menu Pictures/main 19.jpg", description: " plantain porridge with meat", price: 2350, category:'main' },
      {id:"m13", name: "Ofada (combo plate)", img: "/Menu Pictures/main 30.jpg", description: "Served with fried plantain and Ayamase sauce with boiled egg", price: 2700, category:'main' },
      {id:"m14", name: "Ewa agonyin and Yam)", img: "/Menu Pictures/main 18.jpg", description: " Served with boiled potatoes and fish", price: 2500, category:'main' },
      { id:"m15",name: "Moi Moi", img: "/Menu Pictures/main 34.jpg", description: "wrap of fluffy moi moi", price: 600 , category:'main'},
      { id:"m16",name: "Noodles and chicken", img: "/Menu Pictures/main 36.jpg", description: "Noodles Luscious tantalizing twist with chicken", price: 2800, category:'main' },
      { id:"m17",name: "Plantain frittata", img: "/Menu Pictures/main 26.jpg", description: "well garnished plantain frittata", price: 1800, category:'main' },
      { id:"m18",name: "Cooked Plantain", img: "/Menu Pictures/main 38.jpg", description: "Ripe plantain with efo riro & meats", price: 2400, category:'main' },
      { id:"m19",name: "party jollof", img: "/Menu Pictures/main 9.jpg", description: "smokey jollof rice with turkey & plantain", price: 3900, category:'main' },
      {id:"m20", name: "Yam Porridge", img: "/Menu Pictures/main 39.jpg", description: " yam porridge with veggies", price: 2150 , category:'main'},

  // Local Dishes
 
  { id:"l1",name: "Amala & Ewedu", img: "/Menu Pictures/local 5.jpg", description: "Amala & Ewedu & gbegiri with meats plus kponmo", price: 3500, category:'local' },
  { id:"l2", name: "Pounded Yam", img: "/Menu Pictures/local 4.jpg", description: "Pounded yam & egusi with fish/meats ", price: 3900 , category:'local'},
  {id:"l3", name: "Okra Soup", img: "/Menu Pictures/local 7.jpg", description: "Okra Soup & Eba With Meat", price: 3700 , category:'local'},
  {id:"l4", name: "Fufu and efo riro", img: "/Menu Pictures/l 2.jpg", description: "Fluffy fufu & efo riro with assorted meats", price: 2800, category:'local' },
  {id:"l5", name: "Semo with ogbono or afang soup", img: "/Menu Pictures/local 6.jpg", description: "with kponmo & meats", price: 3600, category:'local' },
  {id:"l6", name: "Eba & edikaikong", img: "/Menu Pictures/l 3.jpg", description: "edikaikong & fluffy eba with kponmo & meats", price: 3100, category:'local' },
  {id:"l7", name: "Efo Riro & Amala", img: "/amala and big turkey.jpg", description: "amala & riro with turkey & fish", price: 3900 , category:'local'},
  {id:"l8", name: "Abula Speciale", img: "/amala and abula.jpg", description: "amala & abula with assorted meat & kponmo", price: 3900, category:'local' },

  // Grills and Pepper Soups
      

      {id:"g1", name: "Duke Box", img: "/Menu Pictures/grill 1.jpg", description: "6 BBQ Chicken 25 Puff Puff 10 Banana mosa 6 Spring Roll 6 Samosa 6 Pep Gizzard 1 Burger 2 Corn Dog", price: 15600, category: 'grills' },
      {id:"g2", name: "Turkey, Boli,2Peppered Ponmon", img: "/Menu Pictures/grill 3.jpg", description: "3 bbq Turkey mid wings ,4 Boli, 2 big peppered Ponmo with sauce", price: 13500, category: 'grills' },
      {id:"g3", name: "Bbq Crocker fish and Chips", img: "/Menu Pictures/grills 5.jpg", description: "Barbecue Crocker fish + Chips & sauce", price: 5500 , category: 'grills'},
      { id:"g4",name: "Peppered Kpomo", img: "/Menu Pictures/pepper 4.jpg", description: "well garnished peppered kpomo", price: 3700, category: 'grills' },
      {id:"g5", name: "Chicken Peppersoup", img: "/Menu Pictures/pepper 7.jpg", description: "spicey chicken peppersoup", price: 3800, category: 'grills' },
      {id:"g6", name: "Bbq Chicken and fries", img: "/Menu Pictures/grills 6.jpg", description: "3 Chicken laps with fries", price: 13500, category: 'grills' },
      {id:"g7", name: "Turkey Peppersoup", img: "/Menu Pictures/pepper 1.jpg", description: "turkey peppersoup", price: 4500 , category: 'grills'},
      {id:"g8", name: "Goatmeat peppersoup", img: "/Menu Pictures/pepper 10.jpg", description: "spicey goatmeat peppersoup", price: 4500, category: 'grills' },
      {id:"g9", name: "CatFish peppersoup", img: "/Menu Pictures/pepper 8.jpg", description: "spicey catfish peppersoup", price: 4100 , category: 'grills', category: 'grills'},
      {id:"g10", name: "CowTail peppersoup", img: "/Menu Pictures/pepper 3.jpg", description: "peppered cowtail peppersoup", price: 4300, category: 'grills' },
      {id:"g11", name: "Chicken with plantain", img: "/Menu Pictures/pepper 5.jpg", description: "chicken with plantain peppersoup", price: 4500 , category: 'grills'},
      {id:"g12", name: "Combo peppersoup", img: "/Menu Pictures/pepper 9.jpg", description: "turkey and chicken peppersoup", price: 5500 , category: 'grills'},

  // Soups
  
  {id:"s1", name: "EDIKAIKONG", img: "/Menu Pictures/soup 1.jpg", description: "2 litres of Ugu and water leaf 5 pieces of beef OR chicken 5 pieces of ponmo Stock fish", price: 13500 , category: 'soups'},
  {id:"s2", name: "EGUSI", img: "/Menu Pictures/soup 9.jpg", description: "2 litres Prepared with bitterleaf and ugu 5 pieces of beef OR chicken 5 pieces of ponmo Stock fish", price: 13500 , category: 'soups'},
  {id:"s3", name: "OHA", img: "/Menu Pictures/soup 11.jpg", description: "2 litres,prepared with 5 chickens, 5 stock fish and kponmo", price: 12500, category: 'soups' },
  {id:"s4", name: "Peppered Stew", img: "/Menu Pictures/soup 7.jpg", description: "2 litres,prepared with 5 chickens, 5 Titus fish and kponmo", price: 14500, category: 'soups' },
  {id:"s12", name: "Ofada Sauce", img: "/Menu Pictures/soup 14.jpg", description: " 2 litres of ofada sauceprepared with 5 chickens, 5 stock fish and kponmo", price: 8500, category: 'soups' },
  {id:"s5", name: "Efo riro", img: "/Menu Pictures/soup 16.jpg", description: "2 litres,prepared with 5 chickens, 5 stock fish and kponmo", price: 11500, category: 'soups' },
  { id:"s6", name: "Ogbono", img: "/Menu Pictures/soup 12.jpg", description: "2 litres,prepared with 5 chickens, 5 stock fish and kponmo", price: 13500, category: 'soups' },
  { id:"s7",name: "Sea Food Okra ", img: "/Menu Pictures/soup 5.jpg", description: "5 litres,prepared with 5 chickens, 5 stock fish and kponmo", price: 14500 , category: 'soups'},
  {id:"s8", name: "Ewedu ", img: "/Menu Pictures/soups 12.jpg", description: "2 litres of well preapred ewedu", price: 3500 , category: 'soups'},
  {id:"s9", name: "Black soup", img: "/Menu Pictures/soup 10.jpg", description: "2 litres of  Tasty and sumptuous black soup", price: 10500, category: 'soups' },
  {id:"s10", name: "Ofada Sauce", img: "/Menu Pictures/soup 14.jpg", description: " 2 litres of ofada sauceprepared with 5 chickens, 5 stock fish and kponmo", price: 8500 , category: 'soups'},
  {id:"s11", name: "Peppered Stew", img: "/Menu Pictures/soup 11.jpg", description: " 2 litres of ofada sauceprepared with 5 chickens, 5 stock fish and kponmo", price: 12500, category: 'soups' },
  

  // Snacks
  
  {id:"ss1", name: "Vienna Sausage Roll", img: "/Menu Pictures/snacks 11.jpg", description: "crispy vienna sausage roll ", price: 800 , category: 'snacks'},
  { id:"ss2",name: "Chocolate Donut", img: "/Menu Pictures/snacks 5.jpg", description: "crispy chocolate donut", price: 800 , category: 'snacks'},
  { id:"ss3",name: "Scotch Egg", img: "/Menu Pictures/snacks 13.jpg", description: "2 scotch eggs ", price: 1000 , category: 'snacks'},
  { id:"ss4", name: "Jam Donut", img: "/Menu Pictures/snacks 9.jpg", description: "delicious donut", price: 600 , category: 'snacks'},
  {id:"ss5", name: "Smart small chops pack", img: "/Menu Pictures/snacks 4.jpg", description: "free drink, 2 spring rolls, 2 samosas, 10 puff-puff, 1 chicken", price: 2800 , category: 'snacks'},
  {id:"ss6", name: "Chicken Pie", img: "/Menu Pictures/snacks 10.jpg", description: "crispy chicken pie", price: 800 , category: 'snacks'},
  {id:"ss7", name: "Puffpuff", img: "/Menu Pictures/snacks 12.jpg", description: "Chocolate puffpuff in box with extra chocolate toppings", price: 3100 , category: 'snacks'},
  {id:"ss8", name: "Sausage Rolls", img: "/Menu Pictures/snacks 14.jpg", description: "4 sausage rolls", price: 2100 , category: 'snacks'},
  {id:"ss9", name: "Donut with chocolate", img: "/Menu Pictures/snacks 6.jpg", description: "Yummy chocolate donut", price: 1600 , category: 'snacks'},
  {id:"ss10", name: "Small chops pouch", img: "/Menu Pictures/snacks 1.jpg", description: "Puff puff, samosa, spring roll with chicken", price: 1800 , category: 'snacks'},
  {id:"ss11", name: "Meats Pie", img: "/Menu Pictures/snacks 8.jpg", description: "3 set of meats pie", price: 1700, category: 'snacks' },
  {id:"ss12", name: "Puff Puff speciale", img: "/Menu Pictures/snacks .jpg", description: "puffpuff plus samosa,spring rolls with chicken", price: 3500 , category: 'snacks'},

  // Drinks

       {id:"d1", name: "Water", img: "/Menu Pictures/drink 16.jpg", description: "eva/aquarite/ mr v/aquafina", price: 300 , category: 'drinks'},
      {id:"d2",  name: "Maltinal", img: "/Menu Pictures/drink 17.jpg", description: "Maltinal", price: 600 , category: 'drinks'},
      {id:"d3",  name: "Coke", img: "/Menu Pictures/drink 12.jpg", description: "Coka-cola 50cl", price: 500 , category: 'drinks'},
      {id:"d4",  name: "Climax", img: "/Menu Pictures/drinks 8.jpg", description: "Climax energy drink 33cl", price: 1500 , category: 'drinks'},
      {id:"d5",  name: "Predator", img: "/Menu Pictures/drink 10.jpg", description: "predator energy drink", price: 700 , category: 'drinks'},
      {id:"d6",  name: "Hollandia yogurt", img: "/Menu Pictures/drink 18.jpg", description: "Hollandia yogurt drink 1ltr", price: 2000 , category: 'drinks'},
      {id:"d7",  name: "Monster", img: "/Menu Pictures/drink 9.jpg", description: "monster energy 44cl", price: 1500 , category: 'drinks'},
      {id:"d8",  name: "Fanta orange", img: "/Menu Pictures/drink 6.jpg", description: "Fanta orange 50cl", price: 500 , category: 'drinks'},
      {id:"d9",  name: "Ice cream", img: "/Menu Pictures/drink 14.jpg", description: "Ice cream small size 400 Ice cream medium size 1000 Ice cream Big size 1500", price: 2000 , category: 'drinks' },
      {id:"d10",  name: "Black Bullet", img: "/Menu Pictures/drink 13.jpg", description: "Bullet - black", price: 1200 , category: 'drinks'},
      {id:"d11",  name: "Viju chocolate", img: "/Menu Pictures/drink 15.jpg", description: "Viju chocolate", price: 850 , category: 'drinks'},
      {id:"d12",  name: "Vita milk", img: "/Menu Pictures/drink 19.jpg", description: "Vita milk", price: 1700 , category: 'drinks'},
];
  
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

function filterProducts(searchTerm) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  displayProducts(filteredProducts);
}

function displayProducts(products) {
  resultsContainer.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div>
        <strong>${product.name}</strong>
        <p class="description">${product.description}</p>
      </div>
    `;
    li.addEventListener('click', () => {
      // Redirect to a specific location
      window.location.href = `your-redirect-url?id=${product.id}`;
    });
    resultsContainer.appendChild(li);
  });
}

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim();
  if (searchTerm.length > 0) {
    filterProducts(searchTerm);
  } else {
    resultsContainer.innerHTML = '';
  }
});

// Close search results when clicking outside the search box
document.addEventListener('click', function(event) {
  const isClickInside = searchInput.contains(event.target) || resultsContainer.contains(event.target);
  if (!isClickInside) {
    resultsContainer.innerHTML = '';
  }
});


// slider
const dSlider = document.querySelector(".dslide-slider");
const dSliderItems = document.querySelectorAll(".slider-item");
const dSliderPrevBtn = document.querySelector(".prev");
const dSliderNextBtn = document.querySelector(".next");

let currentSlidePos = 0;
let lastActiveSliderItem = dSliderItems[0];

const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    dSliderItems[currentSlidePos].classList.add("active")
    lastActiveSliderItem = dSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= dSliderItems.length -1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

dSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = dSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

dSliderPrevBtn.addEventListener("click", slidePrev);

// autoslider

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
      slideNext();  
    }, 7000);
}

window.addEventListener("load", autoSlide);


// cart

let cart = [];

function addToCart() {
    const product = {
        id: 1,
        name: "Amala", //will later be fetched from array
        price: 19.99 //will later be fetched from array
    };

    cart.push(product);

    updateCartUI();
}

function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartPanelElement = document.getElementById('cart-panel');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartCountElement.textContent = cart.length;

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">N${item.price.toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(li);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    cartTotalElement.textContent = `Total: N${totalPrice.toFixed(2)}`;

    if (cart.length > 0) {
        cartPanelElement.style.display = 'block';
    } else {
        cartPanelElement.style.display = 'none';
    }
}



// function toggleCart() {
//     const cartPanelElement = document.getElementById('cart-panel');
//     if (cartPanelElement.style.display === 'block') {
//         cartPanelElement.style.display = 'none';
//     } else {
//         cartPanelElement.style.display = 'block';
//     }
// }





// let currentTestimonial = 0;
// var MinMenu = document.getElementById('Loc-Dishes');
// var BrfSubMenu = document.getElementById('MenuLink1');
// var BrfSubMenu2 = document.getElementById('MenuLink2');
// var BrfSubMenu3 = document.getElementById('MenuLink3');
// var SecList = document.getElementById('Menulist');
// var Testimonial = document.getElementById('testimonial');
// var LocDishes = document.getElementById('Loc-Dishes');
// var IntDishes = document.getElementById('Int-Dishes');
// var SnackSec = document.getElementById('Snacks');
// var DrinksSec = document.getElementById('Drinks');
// var DrinksSubMenu = document.getElementById('Drinks-SubMenu');
// var LocFodSubMenu = document.getElementById('loc-SubMenu');
// var IntFodSubMenu = document.getElementById('Int-SubMenu');
// var SnacksSubMenu =document.getElementById('Snacks-SubMenu')


// LocFodSubMenu.addEventListener('click', function(){
//     LocDishes.style.display = 'Block';
//     IntDishes.style.display = 'None';
//     SnackSec.style.display = 'None';
//     DrinksSec.style.display = 'None';
//     SecList.style.display = 'None'
// })
// IntFodSubMenu.addEventListener('click', function(){
//     LocDishes.style.display = 'None';
//     IntDishes.style.display = 'Block';
//     SnackSec.style.display = 'None';
//     DrinksSec.style.display = 'None';
//     SecList.style.display = 'None'
// })

// SnacksSubMenu.addEventListener('click', function(){
//     LocDishes.style.display = 'None';
//     IntDishes.style.display = 'None';
//     SnackSec.style.display = 'Block';
//     DrinksSec.style.display = 'None';
//     SecList.style.display = 'None'
// })
// DrinksSubMenu.addEventListener('click', function(){
//     LocDishes.style.display = 'None';
//     IntDishes.style.display = 'None';
//     SnackSec.style.display = 'None';
//     DrinksSec.style.display = 'Block';
//     SecList.style.display = 'None'
// })


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  const slides = document.querySelectorAll('.slides');
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');
  let currentIndex = 0;
  const slideInterval = 5000; // Time in milliseconds (5000ms = 5 seconds)
  
  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.remove('active');
          if (i === index) {
              slide.classList.add('active');
          }
      });
      const slider = document.querySelector('.Aslider');
      slider.style.transform = `translateX(-${index * 100}%)`;
  }
  
  function nextSlide() {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      showSlide(currentIndex);
  }
  
  prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      showSlide(currentIndex);
  });
  
  nextButton.addEventListener('click', () => {
      nextSlide();
  });
  
  // Automatically advance the slide every slideInterval milliseconds
  const autoSlides = setInterval(nextSlide, slideInterval);
  
  showSlide(currentIndex);



  document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('.headings');
    const trainingContainers = document.querySelectorAll('.trainingContainer');
  
    headings.forEach((heading, index) => {
      heading.addEventListener('click', function() {
        trainingContainers.forEach(container => container.style.display = 'none');
        trainingContainers[index].style.display = 'block';
  
        headings.forEach(h => h.style.color = '#232d39');
        heading.style.color = '#ff7200';
      });
    });
  });
  
  // Sub-Menu List ()
  const Header1 = document.getElementById('head1');
  const Header2 = document.getElementById('head2');
  const Header3 = document.getElementById('head3');
  const Header4 = document.getElementById('head4');
  const Header5 = document.getElementById('head5');
  const Header6 = document.getElementById('head6')
  
  const LocDish = document.getElementById('Loc-Dishes');
  const IntDIsh = document.getElementById('Int-Dishes');
  const Snacks = document.getElementById('Snacks');
  const Drinks = document.getElementById('Drinks');
  const Proteins = document.getElementById('Protein');
  const Soup =document.getElementById('Soup')
  
  
  Header1.addEventListener('click', function(){
    LocDish.style.display = 'block';
    IntDIsh.style.display = 'none';
    Snacks.style.display = 'none';
    Drinks.style.display = 'none';
    Proteins.style.display = 'none';
    Soup.style.display = 'none';
  });
  
  Header2.addEventListener('click', function(){
    LocDish.style.display = 'none';
    IntDIsh.style.display = 'block';
    Snacks.style.display = 'none';
    Drinks.style.display = 'none';
    Proteins.style.display = 'none';
    Soup.style.display = 'none';
  });
  Header3.addEventListener('click', function(){
    LocDish.style.display = 'none';
    IntDIsh.style.display = 'none';
    Snacks.style.display = 'block';
    Drinks.style.display = 'none';
    Proteins.style.display = 'none';
    Soup.style.display = 'none';
  });
  Header4.addEventListener('click', function(){
    LocDish.style.display = 'none';
    IntDIsh.style.display = 'none';
    Snacks.style.display = 'none';
    Drinks.style.display = 'block';
    Proteins.style.display = 'none';
    Soup.style.display = 'none';

  });
  Header5.addEventListener('click', function(){
    LocDish.style.display = 'none';
    IntDIsh.style.display = 'none';
    Snacks.style.display = 'none';
    Drinks.style.display = 'none';
    Soup.style.display = 'none';
    Proteins.style.display = 'block'
  });
  Header6.addEventListener('click', function(){
    LocDish.style.display = 'none';
    IntDIsh.style.display = 'none';
    Snacks.style.display = 'none';
    Drinks.style.display = 'none';
    Soup.style.display = 'block';
    Proteins.style.display = 'none'
  })
  
// let slideIndex = 0;

// function showSlides() {
//     const slides = document.querySelectorAll('.slide');
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none';
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }
//     slides[slideIndex - 1].style.display = 'block';
//     setTimeout(showSlides, 3000); // Change testimonial every 3 seconds
// }

// function moveSlide(n) {
//     slideIndex += n;
//     const slides = document.querySelectorAll('.slide');
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }
//     if (slideIndex < 1) {
//         slideIndex = slides.length;
//     }
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none';
//     }
//     slides[slideIndex - 1].style.display = 'block';
// }

// document.addEventListener('DOMContentLoaded', function() {
//     showSlides();
// });

// function FodSubMenu (){
//     LocDishes.style.display = 'Block';
//     IntDishes.style.display = 'None';
//     SnackSec.style.display = 'None';
//     DrinksSec.style.display = 'None';
    


// }
// FodSubMenu()
// LocFodSubMenu.addEventListener('click', FodSubMenu)




// function showNextTestimonial() {
//     testimonials[currentTestimonial].classList.remove('active');
//     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//     testimonials[currentTestimonial].classList.add('active');
// }

// setInterval(showNextTestimonial, 3000);

// function SubMenuDisplay (){
//     SubMenu.style.display = 'block';
//     Sectionlist.style.display = 'none'
// }
// SubMenuDisplay()
// MenuLink1.addEventListener('click', SubMenuDisplay)

// document.querySelectorAll('.MenuLink').forEach(link => {
//     link.addEventListener('click', function() {
//         const submenu = this.nextElementSibling;
//         submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
//     });
// });


// special offer image carousel
var nextBtn = document.querySelector('.specialOfferNextBtn'),
    prevBtn = document.querySelector('.specialOfferPrevBtn'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function() {
    showSlider('next');
}

prevBtn.onclick = function() {
    showSlider('prev');
}

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; /* trigger reflow */
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.item');
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Start the initial animation
resetTimeAnimation();



window.onload = function() {
  const settings = JSON.parse(localStorage.getItem('userSettings'));
  if (settings) {
      document.getElementById('profile-pic').src = settings.profilePic || '';
  }

  const loggedInUsername = localStorage.getItem('loggedInUsername');

  if (loggedInUsername) {
    const userData = JSON.parse(localStorage.getItem(loggedInUsername));
    if (userData) {
        let username = userData.username || '';
        username = username.length > 8 ? username.substring(0, 8) : username;
        document.getElementById('username').textContent = username;
    }
}
};


function logout() {
  // Remove the profile-related class from the body
  document.body.classList.remove('show-profile');
  
  // Save the state to local storage
  localStorage.setItem('isLoggedIn', 'false');

  window.location.reload();
}


// JavaScript for initial animation chatbot
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.querySelector('.whatsapp-chatbot img');
  chatbot.style.transform = 'scale(0)';
  setTimeout(() => {
    chatbot.style.transform = 'scale(1)';
    chatbot.style.transition = 'transform 0.5s ease';
  }, 100);
});


