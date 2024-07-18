document.addEventListener('DOMContentLoaded', function () {
  const currentUrl = window.location.pathname;

  const navItem = document.querySelector(`a[href="/${currentUrl}"]`);
  if (navItem) {
    navItem.classList.add(
      'bg-gray-600',
      'bg-opacity-25',
      'text-gray-100',
      'border-gray-100',
    );
    navItem.classList.remove('text-gray-500');
  }
});
