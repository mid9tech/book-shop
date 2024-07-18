function deleteSale(id, name, avatar) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Remove Sale';
  document.getElementById('modal-content').innerHTML =
    `<p>Are you sure you want to remove the sale for <strong>${name}</strong>?</p>
      <img src="${avatar}" class="w-[200px] rounded-md my-4" />`;

  document.getElementById('modal-action').innerHTML = `<button
                  onclick="confirmDeleteSale('${id}')"
                  class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
                >
                  Remove
                </button>`;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmDeleteSale(id) {
  const query = `
    mutation UpdateProduct {
        updateProduct(
            updateProductInput: {
                id: "${id}"
                isOnSale: false
                priceSale: 0
            }
        )
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
      `Can not delete sale Product: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully delete sale Product!');
    window.location.reload();
  }
}
