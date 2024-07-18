function deletePromotionItem(id, name, avatar) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Confirm Deletion';
  document.getElementById('modal-content').innerHTML = `
    <p>Are you sure you want to remove the following promotion item?</p>
    <p>Product: <strong>${name}</strong></p>
    <img src="${avatar}" class="w-[200px] rounded-md my-4" />
  `;

  document.getElementById('modal-action').innerHTML = `
    <button
      onclick="confirmDeletePromotionItem('${id}')"
      class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
    >
      Delete
    </button>
  `;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmDeletePromotionItem(productId) {
  const promotionId = document.getElementById('promotionId').innerHTML;
  const query = `
    mutation DeletePromotionItem {
        deletePromotionItem(
            promotionId: "${promotionId}",
            productId: "${productId}"
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
      `Cannot delete promotion item: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully deleted promotion item!');
    window.location.reload();
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
}
