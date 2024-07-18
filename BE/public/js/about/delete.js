function deleteAbout(id) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Confirm Deletion';
  document.getElementById('modal-content').innerHTML = `
      <p>Are you sure you want to delete this about?</p>
    `;
  document.getElementById('modal-action').innerHTML = `
      <button
        onclick="confirmDeleteAbout('${id}')"
        class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
      >
        Confirm Delete
      </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmDeleteAbout(id) {
  const query = `
    mutation DeleteAbout {
      updateAbout(updateAboutInput: {
        id: "${id}"
        status: false
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
    showNotification('Cannot delete About, something went wrong!', 'fail');
  } else {
    alert('Success to delete About');
    closeModal();
    window.location.reload();
  }
}
