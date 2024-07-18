async function submitUpdatePromotion() {
  // Parse numeric values
  const id = document.getElementById('promotion-id').innerHTML;
  let bannerUrl = document.getElementById('image-preview').src;
  const name = document.getElementById('promotion-name').value;
  const description = document.getElementById('promotion-description').value;
  const discountPercentage = parseFloat(
    document.getElementById('promotion-discountPercentage').value,
  );
  const discountValue = parseFloat(
    document.getElementById('promotion-discountValue').value,
  );
  const minValue = parseFloat(
    document.getElementById('promotion-minValue').value,
  );
  const startDate = new Date(
    document.getElementById('promotion-startDate').value,
  );
  const endDate = new Date(document.getElementById('promotion-endDate').value);
  const now = new Date();

  // Validation checks
  const errors = [];

  if (
    isNaN(discountPercentage) ||
    discountPercentage < 0 ||
    discountPercentage > 100
  ) {
    errors.push('Discount Percentage must be in 0 to 100.');
  }

  if (isNaN(discountValue) || discountValue < 0) {
    errors.push('Discount Value must be a positive number.');
  }

  if (isNaN(minValue) || minValue < 0) {
    errors.push('Min Value must be a positive number.');
  }

  if (endDate <= startDate) {
    errors.push('End Date must be greater than Start Date.');
  }

  if (errors.length > 0) {
    alert(errors.join('\n'));
  } else {
    // Assuming 'uploadFile' is an asynchronous function to upload the banner
    if (banner) {
      bannerUrl = await uploadFile(banner);
    }

    const query = `
        mutation UpdatePromotion {
          updatePromotion(updatePromotionInput: {
            id: "${id}"
            name: "${name}"
            description: "${description}"
            banner: "${bannerUrl}"
            discountPercentage: ${discountPercentage}
            discountValue: ${discountValue}
            minValue: ${minValue}
            startDate: "${startDate.toISOString()}"
            endDate: "${endDate.toISOString()}"
          }) 
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
        alert('Successfully updated Promotion!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating promotion:', error);
      alert('An error occurred while updating the promotion.');
    }
  }
}

document
  .getElementById('promotion-discountValue')
  .addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
  });

document
  .getElementById('promotion-minValue')
  .addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
  });

document
  .getElementById('promotion-discountPercentage')
  .addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
  });

function previewImage(event) {
  const input = event.target;
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('image-preview');

  const reader = new FileReader();
  reader.onload = function () {
    previewImage.src = reader.result;
    previewContainer.classList.remove('hidden');
  };

  if (input.files && input.files[0]) {
    banner = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
}
