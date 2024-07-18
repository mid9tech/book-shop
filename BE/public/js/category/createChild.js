function addChild(parentId) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Add Children Category';
  document.getElementById('modal-content').innerHTML = ` 
  <p>Create new children for : <span id="getId">${parentId}</span></p>
  <form id="modal-form">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Name</label>
        <input
          type="text"
          id="category-name"
          name="name"
          class="w-full px-3 py-2 mt-1 border rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-700">Description</label>
        <textarea
          id="category-description"
          name="description"
          class="w-full px-3 py-2 mt-1 border rounded-md"
        ></textarea>
      </div>
    </form>`;
  document.getElementById('modal-action').innerHTML = `<button
      onclick="addNewChildrenFrom()"
      class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
    >
      Add New Category
    </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function addNewChildrenFrom() {
  const parentId = document.getElementById('getId').innerText.trim();
  const name = document.getElementById('category-name').value;
  const description = document.getElementById('category-description').value;

  const query = `
    mutation CreateCategory {
          createCategory(
              createCategoryInput: {
                  name: "${name}"
                  description: "${description}"
                  type: "CHILDREN",
                  parentId: "${parentId}"
              }
          ) {
              id
          }
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
    showNotification(
      'Can not create new parent category, Some thing when wrong!',
      'fail',
    );
  } else {
    closeModal();
    window.location.reload();
  }
}
