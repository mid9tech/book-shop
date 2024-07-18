function updateQuantity(id, name, avatar) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Update Quantity';
  document.getElementById('modal-content').innerHTML = `
    <p>Product: <strong>${name}</strong></p>
    <img src="${avatar}" class="w-[200px] rounded-md my-4" />
    <label for="product-quantity">Quantity:</label>
    <input type="number" id="product-quantity" class="w-full h-[40px] border-2 mt-2 mb-2" min="1" />
    <span id="quantity-error" class="text-red-600"></span>
  `;

  document.getElementById('modal-action').innerHTML = `
    <button
      onclick="confirmUpdateQuantity('${id}')"
      class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
      disabled
    >
      Update
    </button>
  `;

  const quantityInput = document.getElementById('product-quantity');
  quantityInput.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');

    const quantity = parseInt(this.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
      document.getElementById('quantity-error').innerText =
        'Quantity must be a positive number.';
      document.querySelector('#modal-action button').disabled = true;
    } else {
      document.getElementById('quantity-error').innerText = '';
      document.querySelector('#modal-action button').disabled = false;
    }
  });

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmUpdateQuantity(productId) {
  const quantity = document.getElementById('product-quantity').value;
  const promotionId = document.getElementById('promotionId').innerHTML;

  const query = `
    mutation UpdateItemPromotionQuantity {
    updateQuantityPromotionItem(
        updateQuantityPromotionItem: {
          productId: "${productId}"
          promotionId: "${promotionId}"
          quantity: ${quantity}
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
      `Cannot update quantity: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully updated product quantity!');
    window.location.reload();
  }
}
