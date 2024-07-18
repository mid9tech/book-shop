function deleteProduct(id, name) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'delete Product';
  document.getElementById('modal-content').innerHTML =
    `<p>Do you want to delete Product: <span id="getId">${name}</span></p>`;
  document.getElementById('modal-action').innerHTML = `<button
                onclick="confirmDeleteProduct('${id}')"
                class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
              >
                delete
              </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmDeleteProduct(id) {
  const query = `
        mutation UpdateProduct {
            updateProduct(
                updateProductInput: {
                    id: "${id}"
                    status: "DELETED",
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
      `Can not delete Product: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully delete Product!');
    window.location.reload();
  }
}
