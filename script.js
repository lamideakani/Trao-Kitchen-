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
// Dummy product data
const products = [
    { id: 1, name: "Amala" },
    { id: 2, name: "Egusi" },
    { id: 3, name: "Iyan" },
    { id: 4, name: "Coke" },
    { id: 5, name: "Pizza" },
    { id: 6, name: "Gala" },
    { id: 7, name: "Eba" },
    { id: 8, name: "Jollof Rice"},
    { id: 9, name: "Fried Rice"},
    { id: 10, name: "Agbado Sunsun"}
  ];
  
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');
  
  function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filteredProducts);
  }
  
  function displayProducts(products) {
    resultsContainer.innerHTML = '';
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.name;
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


