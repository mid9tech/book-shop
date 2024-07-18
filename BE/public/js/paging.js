const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;
let limit = parseInt(urlParams.get('limit')) || 5;

document.getElementById('limit').value = limit;

function updatePageInfo() {
  const totalPages = Math.ceil(totalItems / limit);
  document.getElementById('pageInfo').innerText =
    `Page ${currentPage} of ${totalPages}`;
}

function updateURLParams() {
  urlParams.set('page', currentPage);
  urlParams.set('limit', limit);
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${urlParams.toString()}`,
  );
  updatePageInfo();
  window.location.reload();
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateURLParams();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(totalItems / limit);
  if (currentPage < totalPages) {
    currentPage++;
    updateURLParams();
  }
});

document.getElementById('limit').addEventListener('change', (event) => {
  limit = parseInt(event.target.value);
  currentPage = 1;
  updateURLParams();
});

updatePageInfo();
