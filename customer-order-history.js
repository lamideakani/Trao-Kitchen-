document.addEventListener('DOMContentLoaded', populateCustomerOrderHistory);

function populateCustomerOrderHistory() {
    const customerOrderHistory = document.getElementById('customer-order-history').getElementsByTagName('tbody')[0];
    customerOrderHistory.innerHTML = ''; // Clear the existing rows

    // Retrieve order history from local storage
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    orderHistory.forEach(order => {
        // Create a new row
        const row = document.createElement('tr');

        // Order ID
        const orderIdCell = document.createElement('td');
        orderIdCell.textContent = order.id;
        row.appendChild(orderIdCell);

        // Product Name
        const itemNameCell = document.createElement('td');
        itemNameCell.innerHTML = order.items.map(item => `
            <div>
                <strong>${item.name}</strong>
            </div>
        `).join('');
        row.appendChild(itemNameCell);

        // Price
        const itemsPriceCell = document.createElement('td');
        itemsPriceCell.innerHTML = order.items.map(item => `
            <div>
                #${item.price.toFixed(2)}
            </div>
        `).join('');
        row.appendChild(itemsPriceCell);

        // Quantity
        const itemsQuantityCell = document.createElement('td');
        itemsQuantityCell.innerHTML = order.items.map(item => `
            <div>
                ${item.quantity}
            </div>
        `).join('');
        row.appendChild(itemsQuantityCell);

        // Status
        const statusCell = document.createElement('td');
        const statusSpan = document.createElement('span');
        // Default status to "Pending" if not specified
        statusSpan.textContent = order.status || 'Pending';
        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);

        // Append the row to the table body
        customerOrderHistory.appendChild(row);
    });
}
