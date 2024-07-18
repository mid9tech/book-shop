document.addEventListener('DOMContentLoaded', async () => {
  const accessToken = localStorage.getItem('accessToken');
  let expired_accessToken = parseInt(
    localStorage.getItem('expired_accessToken'),
  );
  const currentTimestamp = new Date().getTime();

  if (window.location.pathname === '/') {
    if (accessToken && expired_accessToken > currentTimestamp) {
      window.location.href = '/category-product';
    }
  } else {
    if (accessToken && expired_accessToken > currentTimestamp) {
      return;
    } else {
      window.location.href = '/';
    }
  }
});
