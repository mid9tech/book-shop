function showUpdateOrderModal(id, action) {
  const modal = document.getElementById('modal');
  const actionText = {
    ON_SHIPPING: 'Make Shipping',
    CANCEL: 'Cancel Order',
    DONE: 'Done Order',
  };

  document.getElementById('modal-title').innerHTML = actionText[action];
  document.getElementById('modal-content').innerHTML =
    `<p>Are you sure you want to ${actionText[action]} for order ID <strong>${id}</strong>?</p>`;

  document.getElementById('modal-action').innerHTML = `<button
                  onclick="confirmUpdateOrder('${id}', '${action}')"
                  class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Confirm
                </button>`;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmUpdateOrder(id, action) {
  const query = `
    mutation UpdateOrder {
      updateStatusOrder(updateInput: {
        id: "${id}"
        status: "${action}"
      })
    }
      `;

  const response = await fetch(HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  if (result.errors) {
    console.log(result.errors);
    showNotification(
      `Cannot update order status: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeOrderModal();
    alert('Successfully updated order status!');
    window.location.reload();
  }
}

function closeOrderModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
}
