function banned(id, email) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Banned User';
  document.getElementById('modal-content').innerHTML =
    `<p>Do you want to ban user: <span id="getId">${email}</span></p>`;
  document.getElementById('modal-action').innerHTML = `<button
            onclick="confirmBanUser('${id}')"
            class="px-6 py-3 font-medium tracking-wide text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none"
          >
            Banned
          </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmBanUser(id) {
  console.log(id);

  const query = `
  mutation UpdateUserStatus {
        updateUserStatus(
        updateUserStatusInput: { id: "${id}", status: "BANNED" }
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
      showNotification('Cannot banned user, something went wrong!', 'fail');
    } else {
      alert('Success banned user!');
      closeModal();
      window.location.reload();
    }
  } catch (error) {
    showNotification('Cannot banned user, something went wrong!', 'fail');
    console.error('Error:', error);
  }
}
