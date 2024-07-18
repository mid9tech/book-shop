async function submitCreateProduct() {
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const categoryId = document.getElementById('product-category').value;
  const publisherId = document.getElementById('product-publisher').value;

  const urlAvatar = await uploadFile(avatar);
  let imageUrls = [];

  for (let i = 0; i < thumbnails.length; i++) {
    imageUrls.push(await uploadFile(thumbnails[i]));
  }

  const query = `
  mutation CreateProduct {
      createProduct(
          createProductInput: {
              name: "${name}"
              description: "${description}"
              categoryId: "${categoryId}"
              publisherId: "${publisherId}"
              price: ${price}
              avatar: "${urlAvatar}"
              author: ${JSON.stringify(authors)}
              images: ${JSON.stringify(imageUrls)}
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
    console.log(result.errors);

    showNotification(
      `Can not create new Publisher: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully created Product!');
    window.location.href = '/category-product';
  }
}
