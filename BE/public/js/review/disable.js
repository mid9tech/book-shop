function disableReview(productId, ownerId) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Disable Review';
  document.getElementById('modal-content').innerHTML =
    `<p>Do you want to disable the review for Product ID: <span id="productId">${productId}</span> by Owner ID: <span id="ownerId">${ownerId}</span>?</p>`;
  document.getElementById('modal-action').innerHTML = `<button
              onclick="confirmDisableReview('${productId}', '${ownerId}')"
              class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
            >
              Disable
            </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmDisableReview(productId, ownerId) {
  const query = `
    mutation DisableReview {
      updateStatusReview(updateStatusReviewInput: {
          ownerId: "${ownerId}",
          productId: "${productId}",
          status: false
        }
      )
    }`;

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

    if (result.errors) {
      showNotification(
        'Cannot disable the review, something went wrong!',
        'fail',
      );
    } else {
      closeModal();
      window.location.reload();
    }
  } catch (error) {
    showNotification(
      'Cannot disable the review, something went wrong!',
      'fail',
    );
    console.error('Error:', error);
  }
}
