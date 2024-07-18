document
  .getElementById('promotion-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());

    // Parse numeric values
    const bannerUrl = banner ? await uploadFile(banner) : undefined;
    const name = data.name;
    const description = data.description;
    const level = data.level;
    const type = data.type;
    const discountPercentage = parseFloat(data.discountPercentage);
    const discountValue = parseFloat(data.discountValue);
    const minValue = parseFloat(data.minValue);
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
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

    if (startDate <= now) {
      errors.push('Start Date must be greater than the current date.');
    }

    if (endDate <= startDate) {
      errors.push('End Date must be greater than Start Date.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    } else {
      const query = `
      mutation CreatePromotion {
        createPromotion(createPromotionInput: {
          name: "${name}",
          description: "${description}",
          level: "${level}",
          banner: "${bannerUrl}",
          type: "${type}",
          minValue: ${minValue},
          startDate: "${startDate.toISOString()}",
          endDate: "${endDate.toISOString()}",
          discountValue: ${discountValue},
          discountPercentage: ${discountPercentage}
        }) {
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
        console.error(result.errors);
        showNotification(
          `Cannot create new Promotion: ${result.errors[0].message}!`,
          'fail',
        );
      } else {
        closeModal();
        alert('Successfully created Promotion!');
        window.location.href = '/promotion';
      }
    }
  });

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
