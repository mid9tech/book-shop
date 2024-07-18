let thumbnailUrls = [];

async function fetchData() {
  try {
    const id = document.getElementById('idProduct').innerHTML;

    const query = `
    query Product {
        product(id: "${id}") {
            categoryId
            publisherId
            author
            images
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

    if (!result.errors) {
      const { author, images, categoryId, publisherId } = result.data?.product;
      authors = author;
      thumbnailUrls = images;
      const categorySelect = document.getElementById('product-category');
      // Set the selected category
      categorySelect.value = categoryId;

      // Select the publisher dropdown element
      const publisherSelect = document.getElementById('product-publisher');
      // Set the selected publisher
      publisherSelect.value = publisherId;
    }

    renderAuthors();
    renderThumbnails();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

function renderAuthors() {
  const authorsContainer = document.getElementById('authors-container');
  authorsContainer.innerHTML = authors
    .map(
      (author, index) => `
    <div class="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2 mr-2" data-index="${index}">
      <span class="text-gray-700">${author}</span>
      <button class="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 ml-2" onclick="deleteAuthor(${index})">Delete</button>
    </div>
  `,
    )
    .join('');
}

function renderThumbnails() {
  const thumbnailsContainer = document.getElementById('thumbnails-container');
  thumbnailsContainer.innerHTML = thumbnailUrls
    .map(
      (thumbnail, index) => `
    <div class="relative" data-index="${index}">
      <img src="${thumbnail}" class="w-24 h-24 rounded-md object-cover" alt="avt" />
      <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center" onclick="deleteThumbnail(${index})">&times;</button>
    </div>
  `,
    )
    .join('');
}

function deleteAuthor(index) {
  authors.splice(index, 1);
  renderAuthors();
}

function deleteThumbnail(index) {
  thumbnailUrls.splice(index, 1);
  renderThumbnails();
}

async function submitUpdateProduct() {
  const id = document.getElementById('idProduct').innerHTML;

  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const categoryId = document.getElementById('product-category').value;
  const publisherId = document.getElementById('product-publisher').value;

  const urlAvatar = avatar
    ? await uploadFile(avatar)
    : document.getElementById('image-preview').src;

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnailUrls.push(await uploadFile(thumbnails[i]));
  }

  const query = `
    mutation UpdateProduct {
        updateProduct(
            updateProductInput: {
                id: "${id}"
                name: "${name}"
                description: "${description}"
                categoryId: "${categoryId}"
                publisherId: "${publisherId}"
                price: ${price}
                avatar: "${urlAvatar}"
                author: ${JSON.stringify(authors)}
                images: ${JSON.stringify(thumbnailUrls)}
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
      `Can not update Publisher: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully update Product!');
    window.location.reload();
  }
}
