document.addEventListener("DOMContentLoaded", () => {
    updateCustomerOrderHistory();
});

function updateCustomerOrderHistory() {
    const orderHistoryTableBody = document.getElementById('customer-order-history').querySelector('tbody');
    orderHistoryTableBody.innerHTML = '';

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach(order => {
        const customerDetails = order.customerDetails || {};
        const orderProducts = order.cart.map(item => `${item.name} (x${item.quantity})`).join(', '); // Combine product names and quantities

        const orderRow = document.createElement('tr');

        // Format the date using toLocaleDateString()
        const orderDate = new Date(order.orderDate).toLocaleDateString(); 

        orderRow.innerHTML = `
            <td>${order.orderId}</td>
            <td>${orderProducts}</td>
            <td>${order.totalAmount.toFixed(2)}</td>
            <td>${orderDate}</td> <!-- Displaying the formatted date -->
            <td>${order.status}</td>
        `;

        orderHistoryTableBody.appendChild(orderRow);
    });
}
