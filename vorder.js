document.addEventListener("DOMContentLoaded", () => {
    updateVendorOrderList();
    document.getElementById('undo-btn').addEventListener('click', undoDelete);
    document.getElementById('close-undo-btn').addEventListener('click', closeUndoMessage);
});

function updateVendorOrderList() {
    const orderList = document.getElementById('vendor-order-list').querySelector('tbody');
    orderList.innerHTML = '';
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach(order => {
        const customerDetails = order.customerDetails || {};

        const orderRow = document.createElement('tr');

        orderRow.innerHTML = `
            <td>${order.orderId || ''}</td>
            <td>${customerDetails.firstName || ''} ${customerDetails.lastName || ''}</td>
            <td>${order.cart ? order.cart.map(item => `${item.name} (x${item.quantity})`).join(', ') : ''}</td>
            <td>
                <select class="status-select" data-id="${order.orderId}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button class="delete-btn" data-id="${order.orderId}">Delete</button>
            </td>
        `;

        orderList.appendChild(orderRow);
    });

    // Add event listeners for status select elements
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', updateOrderStatus);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteOrder);
    });
}

function updateOrderStatus(event) {
    const orderId = event.target.getAttribute('data-id');
    const newStatus = event.target.value;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Find the order and update its status
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
        order.status = newStatus; // Update the status in the order object
        localStorage.setItem('orders', JSON.stringify(orders)); // Save the updated orders back to local storage
        console.log(`Updated order ${orderId} status to ${newStatus}`); // Log the update
    } else {
        console.error('Order not found for status update');
    }
}

function deleteOrder(event) {
    const orderId = event.target.getAttribute('data-id');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    console.log('Current orders before deletion:', orders);
    console.log('Attempting to delete order ID:', orderId);

    // Find the index of the order to delete
    const orderIndex = orders.findIndex(order => order.orderId === orderId);

    if (orderIndex !== -1) {
        // Remove the order from the array
        const deletedOrder = orders.splice(orderIndex, 1)[0];

        // Update the local storage
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log(`Deleted order: ${deletedOrder.orderId}`);

        // Refresh the order list
        updateVendorOrderList();

        // Show undo option
        showUndoOption(deletedOrder);
    } else {
        console.error('Order not found');
    }
}

function showUndoOption(deletedOrder) {
    const undoMessage = document.getElementById('undo-message');
    undoMessage.style.display = 'block';

    const undoBtn = document.getElementById('undo-btn');
    const closeUndoBtn = document.getElementById('close-undo-btn');

    undoBtn.onclick = function() {
        // Restore the deleted order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(deletedOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        updateVendorOrderList(); // Refresh order list

        // Hide undo option
        undoMessage.style.display = 'none';
    };

    closeUndoBtn.onclick = function() {
        undoMessage.style.display = 'none'; // Close undo message
    };

    // Hide the undo option after 10 seconds
    setTimeout(() => {
        undoMessage.style.display = 'none';
    }, 10000);
}
