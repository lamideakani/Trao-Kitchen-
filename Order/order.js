document.addEventListener('DOMContentLoaded', () => {
  const orders = [
      { orderId: 'O1', itemName: 'Spaghetti, Plantain and Titus', quantity: 2, price: `#2300`, total: `#4600`, date: '2024-07-20' },
      { orderId: 'O2', itemName: 'Jollof Rice', quantity: 1, price: `#2800`, total: `#2800`, date: '2024-07-21' },
      { orderId: 'O3', itemName: 'Beans', quantity: 2, price: `#2400`, total: `#4800`, date: '2024-07-20' },
      { orderId: 'O4', itemName: 'Plantain & egg sauce', quantity: 1, price: `#2100`, total: `#2100`, date: '2024-07-21' },
      { orderId: 'O5', itemName: 'Amala & Ewedu', quantity: 2, price: `#3500`, total: `#7000`, date: '2024-07-22' },
      { orderId: 'O6', itemName: 'Amala & Ewedu', quantity: 3, price: `#3500`, total: `#10500`, date: '2024-07-23' },
      { orderId: 'O7', itemName: 'Amala & Ewedu', quantity: 3, price: `#3500`, total: `#10500`, date: '2024-07-23' }
  ];

  const payments = [
      { paymentId: 'P1', orderId: 'O1', amount: `#4600`, paymentMethod: 'Credit Card', date: '2024-07-20' },
      { paymentId: 'P2', orderId: 'O2', amount: `#2800`, paymentMethod: 'Bank Transfer', date: '2024-07-21' },
      { paymentId: 'P3', orderId: 'O3', amount: `#4800`, paymentMethod: 'Credit Card', date: '2024-07-20' },
      { paymentId: 'P4', orderId: 'O4', amount: `#2100`, paymentMethod: 'Bank Transfer', date: '2024-07-21' },
      { paymentId: 'P5', orderId: 'O5', amount: `#7000`, paymentMethod: 'Cash Payment', date: '2024-07-22' },
      { paymentId: 'P6', orderId: 'O6', amount: `#10500`, paymentMethod: 'Cash Payment', date: '2024-07-23' },
      { paymentId: 'P7', orderId: 'O7', amount: `#10500`, paymentMethod: 'Cash Payment', date: '2024-07-23' }
  ];

  

  function renderOrderHistory() {
      const orderTableBody = document.getElementById('orderHistoryTable').querySelector('tbody');
      orderTableBody.innerHTML = '';
      let totalOrdersAmount = 0;

      orders.forEach(order => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${order.orderId}</td>
              <td>${order.itemName}</td>
              <td>${order.quantity}</td>
              <td>${order.price}</td>
              <td>${order.total}</td>
              <td>${order.date}</td>
          `;
          orderTableBody.appendChild(row);
          totalOrdersAmount += parseInt(order.total.replace('#', ''));
      });

      document.getElementById('totalOrdersAmount').textContent = `#${totalOrdersAmount}`;
  }

  function renderPaymentHistory() {
      const paymentTableBody = document.getElementById('paymentHistoryTable').querySelector('tbody');
      paymentTableBody.innerHTML = '';
      let totalPaymentsAmount = 0;

      payments.forEach(payment => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${payment.paymentId}</td>
              <td>${payment.orderId}</td>
              <td>${payment.amount}</td>
              <td>${payment.paymentMethod}</td>
              <td>${payment.date}</td>
          `;
          paymentTableBody.appendChild(row);
          totalPaymentsAmount += parseInt(payment.amount.replace('#', ''));
      });

      document.getElementById('totalPaymentsAmount').textContent = `#${totalPaymentsAmount}`;
  }

  renderOrderHistory();
  renderPaymentHistory();

  const container = document.querySelector('.cart-animation');
  const careers = ["Welcome to our culinary world", "We're thrilled to share our culinary creations with you", 'Browse our menu and discover your new favorite dish', 'Cheers!!!'];

  let careerIndex = 0;
  let characterIndex = 0;

  function updateText() {
      characterIndex++;
      container.innerHTML = `<h1>${careers[careerIndex].slice(0, characterIndex)}</h1>`;

      if (characterIndex === careers[careerIndex].length) {
          careerIndex++;
          characterIndex = 0;
      }
      if (careerIndex === careers.length) {
          careerIndex = 0;
      }
      setTimeout(updateText, 400);
  }

  updateText();
});

  
  