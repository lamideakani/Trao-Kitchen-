// Function to save new customer data to localStorage
function saveCustomerData(newCustomer) {
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
  console.log("Customer data saved:", newCustomer); // Debugging line
}

// Function to load all customer data from localStorage and display it in the table
function loadCustomerData() {
  const tableBody = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the table

  const customers = JSON.parse(localStorage.getItem('customers')) || [];

  customers.forEach((user) => {
    if (user && user.username && user.email && user.signupDate) {
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = user.username;
      row.insertCell(1).innerText = user.email;
      row.insertCell(2).innerText = user.signupDate;
    } else {
      console.warn("Invalid customer data found:", user); // Debugging line
    }
  });

  console.log("Customer data loaded:", customers); // Debugging line
}

// Function to send bulk emails to all customers
function sendBulkEmail() {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  let emailAddresses = customers.map(user => user.email).filter(email => email !== undefined);
  const emailString = emailAddresses.join(';');
  const mailtoLink = `mailto:${emailString}?subject=Your Subject Here&body=Your Message Here`;
  window.location.href = mailtoLink;
}

// Function to migrate old customer data stored under individual keys to the new structure
function migrateCustomerData() {
  let customers = JSON.parse(localStorage.getItem('customers')) || [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== 'customers') { // Skip the 'customers' key to avoid duplication
      try {
        const user = JSON.parse(localStorage.getItem(key));
        if (user && user.username && user.email && user.signupDate) {
          customers.push(user);
          console.log(`Migrating data for key "${key}":`, user); // Debugging line
        }
      } catch (e) {
        console.warn(`Skipping invalid entry for key "${key}":`, e);
      }
    }
  }

  localStorage.setItem('customers', JSON.stringify(customers));
  console.log("Customer data after migration:", customers); // Debugging line

  // Optionally: Clear old individual keys after migration
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== 'customers') {
      localStorage.removeItem(key);
    }
  }
}

// Call migration function once to consolidate customer data
migrateCustomerData();

// Initialize the customer table when the page loads
document.addEventListener('DOMContentLoaded', loadCustomerData);

// Set up the event listener for sending bulk emails
document.getElementById('sendBulkEmail').addEventListener('click', sendBulkEmail);
