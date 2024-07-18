function deleteChild(parentId, childrenId) {
  {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').innerHTML =
      'Delete Children Category';
    document.getElementById('modal-content').innerHTML =
      `<p>Do you want to delete category: <span id="getId">${childrenId}</span></p>`;
    document.getElementById('modal-action').innerHTML = `<button
            onclick="confirmDeleteChildren()"
            class="px-6 py-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
          >
            Delete
          </button>`;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
}

async function confirmDeleteChildren() {
  const childrenId = document.getElementById('getId').innerText.trim();

  const query = `
        mutation UpdateCategory {
              updateCategory(
                  updateCategoryInput: {
                      id: "${childrenId}",
                      status: false
                  }
              )
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

    if (result.errors) {
      showNotification(
        'Cannot delete parent category, something went wrong!',
        'fail',
      );
    } else {
      closeModal();
      window.location.reload();
    }
  } catch (error) {
    showNotification(
      'Cannot delete parent category, something went wrong!',
      'fail',
    );
    console.error('Error:', error);
  }
}
