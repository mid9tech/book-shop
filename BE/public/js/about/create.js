let newImage;

function createAbout() {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Create About';
  document.getElementById('modal-content').innerHTML = `
  <form id="modal-form" class="w-[600px]">
    <div class="flex flex-row justify-between">
      <div>
        <div class="mb-4 relative">
          <label for="about-image" class="block text-gray-700">Image</label>
          <input
            type="file"
            id="about-image"
            name="image"
            accept="image/*"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div class="w-full bg-white border border-gray-300 rounded-md flex items-center justify-center py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="text-gray-500">Select File</span>
          </div>
        </div>

        <div id="preview-container" class="hidden">
          <img id="image-preview" class="w-[180px] rounded-md mt-2" />
        </div>
      </div>

      <div class="ml-3 flex flex-col w-[350px]">
        <div class="mb-4">
          <label for="about-title" class="block text-gray-700">Title</label>
          <input
            type="text"
            id="about-title"
            name="title"
            class="w-full px-3 py-2 mt-1 border rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="about-description" class="block text-gray-700">Description</label>
          <textarea
            id="about-description"
            name="description"
            class="w-full px-3 py-2 mt-1 border rounded-md"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="about-type" class="block text-gray-700">Type</label>
          <select id="about-type" name="type" class="w-full px-3 py-2 mt-1 border rounded-md">
            <option value="Q_AND_A">Q_AND_A</option>
            <option value="MAIN">MAIN</option>
            <option value="CHILD">CHILD</option>
          </select>
        </div>
      </div>
    </div>
  </form>
  `;
  document.getElementById('modal-action').innerHTML = `
  <button
    onclick="createNewAbout()"
    class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
  >
    Create About
  </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');

  // Add event listener for file input
  document
    .getElementById('about-image')
    .addEventListener('change', function () {
      const file = this.files[0];
      const imagePreview = document.getElementById('image-preview');
      const previewContainer = document.getElementById('preview-container');

      if (file) {
        newImage = file;

        const reader = new FileReader();

        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          previewContainer.classList.remove('hidden');
        };

        reader.readAsDataURL(file);
      } else {
        imagePreview.src = '';
        previewContainer.classList.add('hidden');
      }
    });
}

async function createNewAbout() {
  const title = document.getElementById('about-title').value;
  const description = document.getElementById('about-description').value;
  const type = document.getElementById('about-type').value;

  const urlImage = await uploadFile(newImage);

  const query = `
  mutation CreateAbout {
    createAbout(
      createAboutInput: {
        title: "${title}"
        description: "${description}"
        image: "${urlImage}"
        type: "${type}"
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
    showNotification('Cannot create new About, something went wrong!', 'fail');
  } else {
    alert('Success! You have successfully created a new About!');
    closeModal();
    window.location.reload();
  }
}
