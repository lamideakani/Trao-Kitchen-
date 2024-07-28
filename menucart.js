document.addEventListener('DOMContentLoaded', () => {
  const menuItems = [
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

  const filterInput = document.getElementById('filterInput');
  const sortSelect = document.getElementById('sortSelect');

  function renderMenuItems() {
    const categories = ['main', 'local', 'grills', 'soups', 'snacks', 'drinks'];
    categories.forEach(category => {
      const itemsContainer = document.querySelector(`.menu-items[data-category="${category}"]`);
      itemsContainer.innerHTML = '';

      const filteredItems = menuItems.filter(item => item.category === category);
      const sortedItems = sortItems(filteredItems);

      sortedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.innerHTML = `
         <a href="" class="fas fa-heart"></a>
           <a href="" class="fas fa-eye"></a>
          <img src="${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
          <div class="star-outer">
              <div class="star-inner"></div>
              </div>
              <div>
          <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
          </div>
        `;
        itemsContainer.appendChild(itemDiv);
      });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  function sortItems(items) {
    const sortValue = sortSelect.value;
    return items.sort((a, b) => {
      if (sortValue === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }

  filterInput.addEventListener('input', () => {
    renderMenuItems();
  });

  sortSelect.addEventListener('change', () => {
    renderMenuItems();
  });

  function addToCart(event) {
    const id = event.target.dataset.id;
    const item = menuItems.find(item => item.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }

  renderMenuItems();
  updateCartCount();
});

const container = document.querySelector('.cart-animation');


const careers =["Welcome to our culinary world","We're thrilled to share our culinary creations with you",'browse our  menu and discover your favorite dish','Cheers!!!'];

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
setTimeout(updateText,150);
}
updateText();