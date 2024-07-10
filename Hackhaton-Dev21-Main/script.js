/**
 * NAVBAR MINI Screen
 */

const navbar = document.querySelector(".navbar");
const navTogglers = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

// addEventOnElements(navTogglers, "click", toggleNavbar);


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

// searchbar
// Close the dropdown if the user clicks outside of it
document.addEventListener("click", function(event) {
  var dropdown = document.querySelector(".dropdown-content");
  var searchContainer = document.querySelector(".search-container");
  if (event.target.closest(".search-container") !== searchContainer) {
      dropdown.style.display = "none";
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



function toggleCart() {
    const cartPanelElement = document.getElementById('cart-panel');
    if (cartPanelElement.style.display === 'block') {
        cartPanelElement.style.display = 'none';
    } else {
        cartPanelElement.style.display = 'block';
    }
}




// const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;
// var MinMenu = document.getElementById('Loc-Dishes');
var BrfSubMenu = document.getElementById('MenuLink1');
var BrfSubMenu2 = document.getElementById('MenuLink2');
var BrfSubMenu3 = document.getElementById('MenuLink3');
var SecList = document.getElementById('Menulist');
var Testimonial = document.getElementById('testimonial');
var LocDishes = document.getElementById('Loc-Dishes');
var IntDishes = document.getElementById('Int-Dishes');
var SnackSec = document.getElementById('Snacks');
var DrinksSec = document.getElementById('Drinks');
var DrinksSubMenu = document.getElementById('Drinks-SubMenu');
var LocFodSubMenu = document.getElementById('loc-SubMenu');
var IntFodSubMenu = document.getElementById('Int-SubMenu');
var SnacksSubMenu =document.getElementById('Snacks-SubMenu')



BrfSubMenu.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'Block';
    IntDishes.style.display = 'None';
    SnackSec.style.display = 'None';
    DrinksSec.style.display = 'None';
})

BrfSubMenu2.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'None';
    IntDishes.style.display = 'Block';
    SnackSec.style.display = 'None';
    DrinksSec.style.display = 'None';
})

BrfSubMenu3.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'None';
    IntDishes.style.display = 'None';
    SnackSec.style.display = 'Block';
    DrinksSec.style.display = 'None';
})

DrinksSubMenu.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'None';
    IntDishes.style.display = 'None';
    SnackSec.style.display = 'None';
    DrinksSec.style.display = 'Block';

})
IntFodSubMenu.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'None';
    IntDishes.style.display = 'Block';
    SnackSec.style.display = 'None';
    DrinksSec.style.display = 'None';

})
SnacksSubMenu.addEventListener('click', function(){
    SecList.style.display = 'None';
    Testimonial.style.display = 'None';
    LocDishes.style.display = 'None';
    IntDishes.style.display = 'None';
    SnackSec.style.display = 'Block';
    DrinksSec.style.display = 'None';
    
})
LocFodSubMenu.addEventListener('click', function(){
 SecList.style.display = 'None';
 Testimonial.style.display = 'None';
 LocDishes.style.display = 'Block';
 IntDishes.style.display = 'None';
 SnackSec.style.display = 'None';
 DrinksSec.style.display = 'None'
})

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
