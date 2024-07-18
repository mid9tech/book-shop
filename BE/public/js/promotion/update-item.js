async function returnAllProduct() {
  const query = `
            query Products {
              products(searchConditionInput: {
                limit: 1000,
                page: 1
              }) {
                data {
                  id
                  name
                  avatar
                }
              }
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

    if (!result.errors) {
      return result.data.products.data;
    } else {
      console.error(result.errors);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function showModalAddPromotionItem() {
  const modal = document.getElementById('modal');
  const products = await returnAllProduct();
  document.getElementById('modal-title').innerHTML = 'Add Promotion Item';
  document.getElementById('modal-content').innerHTML = `
        <label for="product-select">Select Product:</label>
        <select id="product-select" class="w-full mt-2 mb-2"></select>
        <img id='product-add-image-preview' class='w-[200px] rounded-md my-4' />
    
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" class="w-full h-[40px] border-2 mt-2 mb-2" />
        <span id="quantity-error" class="text-red-600"></span>`;

  document.getElementById('modal-action').innerHTML = `
        <button
          id="add-item-button"
          onclick="confirmAddItem()"
          class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
          disabled
        >
          Add
        </button>`;

  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = products
    .map(
      (product) => `
            <option value="${product.id}" data-avatar="${product.avatar}" data-name="${product.name}">
              ${product.name}
            </option>`,
    )
    .join('');

  function validateSalePrice() {
    const salePrice = parseFloat(document.getElementById('quantity').value);
    const addButton = document.getElementById('add-item-button');

    if (isNaN(salePrice) || salePrice <= 0) {
      document.getElementById('quantity-error').innerText =
        'Quantity must be greater than 0.';
      addButton.disabled = true;
    } else {
      document.getElementById('quantity-error').innerText = '';
      addButton.disabled = false;
    }
  }

  document.getElementById('quantity').addEventListener('input', function (e) {
    // This will replace any non-numeric characters with an empty string
    this.value = this.value.replace(/[^0-9.]/g, '');
    validateSalePrice();
  });

  productSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const avatar = selectedOption.getAttribute('data-avatar');
    document.getElementById('product-add-image-preview').src = avatar;
    validateSalePrice(); // Re-validate when product changes
  });

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');

  // Trigger the change event to set the initial price
  const changeEvent = new Event('change');
  productSelect.dispatchEvent(changeEvent);
}

async function confirmAddItem() {
  const productSelect = document.getElementById('product-select');
  const selectedOption = productSelect.selectedOptions[0];
  const productId = selectedOption.value;
  const quantity = document.getElementById('quantity').value;
  const promotionId = document.getElementById('promotionId').innerHTML;

  if (!productId || !quantity || quantity <= 0) {
    alert('Please select a valid product and quantity.');
    return;
  }

  const query = `
  mutation CreateItemPromotion {
    createItemPromotion(createPromotionItemInput:{
      promotionId: "${promotionId}",
      quantity: ${quantity},
      productId: "${productId}",
    }) {
      productId
      promotionId
    }
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
      console.error(result.errors);
      alert(`Error: ${result.errors[0].message}`);
    } else {
      closeModal();
      alert('Successfully create or update Promotion item!');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error updating promotion item:', error);
    alert('An error occurred while updating the promotion.');
  }
}
