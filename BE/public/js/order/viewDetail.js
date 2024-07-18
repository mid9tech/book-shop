async function viewDetail(orderId) {
  const query = `
      query FindDetailOrder {
        order(id: "${orderId}") {
          id
          contactId
          promotionId
          totalPrice
          reducePrice
          paymentMethod
          status
          items {
            productId
            orderId
            price
            quantity
            product {
              name
              avatar
              rate
              description
            }
          }
        }
      }
    `;

  try {
    const response = await fetch(HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    console.log(result.data);

    const order = result.data.order;

    document.getElementById('modal-title').innerText = 'Order Details';
    document.getElementById('modal-content').innerHTML =
      generateOrderDetailsHTML(order);

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
}

function generateOrderDetailsHTML(order) {
  return `
      <div class="space-y-4">
        <div>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Contact ID:</strong> ${order.contactId}</p>
          <p><strong>Promotion ID:</strong> ${order.promotionId}</p>
          <p><strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}</p>
          <p><strong>Reduce Price:</strong> $${order.reducePrice.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Status:</strong> ${order.status}</p>
        </div>
        <h3 class="text-xl font-bold mt-4">Items:</h3>
        <ul class="space-y-2">
          ${order.items
            .map(
              (item) => `
            <li class="flex items-center border-b py-2">
              <img src="${item.product.avatar}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded mr-4">
              <div class="flex-1">
                <strong>${item.product.name}</strong>
                <p class="text-gray-600">${item.quantity} x $${item.price.toFixed(2)}</p>
                <p class="text-gray-600 text-sm">${item.product.description}</p>
              </div>
            </li>
          `,
            )
            .join('')}
        </ul>
      </div>
    `;
}
