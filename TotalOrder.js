

document.addEventListener('DOMContentLoaded', () => {
    const orders = [
        { orderId: 'O1', itemName: 'Spaghetti, Plantain and Titus', quantity: 2, date: '2024-07-20' },
        { orderId: 'O2', itemName: 'Jollof Rice', quantity: 1, date: '2024-07-21' },
        { orderId: 'O3', itemName: 'Beans', quantity: 2, date: '2024-07-20' },
        { orderId: 'O4', itemName: 'Plantain & egg sauce', quantity: 1, date: '2024-07-21' },
        { orderId: 'O5', itemName: 'Amala & Ewedu', quantity: 2, date: '2024-07-22' },
        { orderId: 'O6', itemName: 'Amala & Ewedu', quantity: 3, date: '2024-07-23' },
        { orderId: 'O7', itemName: 'Amala & Ewedu', quantity: 3, date: '2024-07-23' },
        { orderId: 'O8', itemName: 'Amala & Ewedu', quantity: 10, date: '2024-07-23' }
    ];

    function renderOrderHistory() {
        const orderTableBody = document.getElementById('orderHistoryTable').querySelector('tbody');
        orderTableBody.innerHTML = '';
        let totalOrdersQuantity = 0;

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.itemName}</td>
                <td>${order.quantity}</td>
                <td>${order.date}</td>
            `;
            orderTableBody.appendChild(row);
            totalOrdersQuantity += order.quantity;
        });

        document.getElementById('totalOrdersQuantity', 'totalOrdersQuantityAdmin').textContent = totalOrdersQuantity;
    }

    renderOrderHistory();
});
