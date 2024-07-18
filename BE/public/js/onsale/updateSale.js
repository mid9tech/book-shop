function updateSale(id, name, avatar, price, salePrice) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Update Sale';
  document.getElementById('modal-content').innerHTML =
    `<p>Product: <strong>${name}</strong></p>
      <img src="${avatar}" class="w-[200px] rounded-md my-4" />
      <p>Original Price: <span id="product-price">${price}</span></p>
      <label for="sale-price">Sale Price:</label>
      <input type="number" id="sale-price" class="w-full h-[40px] border-2 mt-2 mb-2" value="${salePrice}" />
      <span id="sale-price-error" class="text-red-600"></span>`;

  document.getElementById('modal-action').innerHTML = `<button
                  onclick="confirmUpdateSale('${id}')"
                  class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Update
                </button>`;

  const salePriceInput = document.getElementById('sale-price');
  salePriceInput.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');

    const salePrice = parseFloat(this.value);
    const originalPrice = parseFloat(price);

    if (isNaN(salePrice) || salePrice <= 0) {
      document.getElementById('sale-price-error').innerText =
        'Sale price must be greater than 0.';
      document.querySelector('#modal-action button').disabled = true;
    } else if (salePrice >= originalPrice) {
      document.getElementById('sale-price-error').innerText =
        'Sale price must be less than the original price.';
      document.querySelector('#modal-action button').disabled = true;
    } else {
      document.getElementById('sale-price-error').innerText = '';
      document.querySelector('#modal-action button').disabled = false;
    }
  });

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmUpdateSale(id) {
  const salePrice = document.getElementById('sale-price').value;

  const query = `
        mutation UpdateProduct {
            updateProduct(
                updateProductInput: {
                    id: "${id}"
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
      `Can not update sale Product: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully update sale Product!');
    window.location.reload();
  }
}
