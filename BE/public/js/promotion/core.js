let items = [];
let banner;

function checkPromotionLevel() {
  var promotionLevel = document.getElementById('promotion-level').value;
  var addButton = document.getElementById('view-item-button');

  if (promotionLevel === 'ITEM') {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}

const goToViewItem = (id) => {
  window.location.href = `/update-promotion-item?id=${id}`;
};

// Call the function on page load to set the initial state of the button
document.addEventListener('DOMContentLoaded', function () {
  checkPromotionLevel();
});
