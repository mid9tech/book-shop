async function returnAllProductNotSale() {
  const query = `
      query Products {
        products(searchConditionInput: {
          isOnSale: false,
          limit: 1000,
          page: 1
        }) {
          data {
            id
            name
            avatar
            price
          }
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
    return result.data.products.data;
  } else {
    console.error(result.errors);
    return [];
  }
}

async function addSale() {
  const modal = document.getElementById('modal');
  const products = await returnAllProductNotSale();
  document.getElementById('modal-title').innerHTML = 'Add Sale';
  document.getElementById('modal-content').innerHTML =
    ` <label for="product-select">Select Product:</label>
      <select id="product-select" class="w-full mt-2 mb-2"></select>
  
      <p>Original Price: <span id="product-price"></span></p>
      <img id='image-preview' class='w-[200px] rounded-md my-4' />
  
      <label for="sale-price">Sale Price:</label>
      <input type="number" id="sale-price" class="w-full h-[40px] border-2 mt-2 mb-2" />
      <span id="sale-price-error" class="text-red-600"></span>`;

  document.getElementById('modal-action').innerHTML = `<button
                  id="add-sale-button"
                  onclick="confirmAddSale()"
                  class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                  disabled
                >
                  add
                </button>`;

  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = products
    .map(
      (product) =>
        `<option value="${product.id}" data-price="${product.price}" data-avatar="${product.avatar}" data-name="${product.name}">
        ${product.name}
      </option>`,
    )
    .join('');

  function validateSalePrice() {
    const salePrice = parseFloat(document.getElementById('sale-price').value);
    const originalPrice = parseFloat(
      document.getElementById('product-price').innerText,
    );
    const addButton = document.getElementById('add-sale-button');

    if (isNaN(salePrice) || salePrice <= 0) {
      document.getElementById('sale-price-error').innerText =
        'Sale price must be greater than 0.';
      addButton.disabled = true;
    } else if (salePrice >= originalPrice) {
      document.getElementById('sale-price-error').innerText =
        'Sale price must be less than the original price.';
      addButton.disabled = true;
    } else {
      document.getElementById('sale-price-error').innerText = '';
      addButton.disabled = false;
    }
  }

  document.getElementById('sale-price').addEventListener('input', function (e) {
    // This will replace any non-numeric characters with an empty string
    this.value = this.value.replace(/[^0-9.]/g, '');
    validateSalePrice();
  });

  productSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const price = selectedOption.getAttribute('data-price');
    const avatar = selectedOption.getAttribute('data-avatar');
    document.getElementById('image-preview').src = avatar;
    document.getElementById('product-price').innerText = price;
    validateSalePrice(); // Re-validate when product changes
  });

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');

  // Trigger the change event to set the initial price
  const event = new Event('change');
  productSelect.dispatchEvent(event);
}

async function confirmAddSale() {
  const productSelect = document.getElementById('product-select');
  const selectedOption = productSelect.selectedOptions[0];
  const id = selectedOption.value;
  const salePrice = document.getElementById('sale-price').value;
  const query = `
        mutation UpdateProduct {
            updateProduct(
                updateProductInput: {
                    id: "${id}"
                    isOnSale: true,
                    priceSale: ${salePrice}
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
      `Can not sale Product: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully sale Product!');
    window.location.reload();
  }
}
