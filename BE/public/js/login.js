document
  .getElementById('loginForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const query = `
    mutation AdminLogin {
        adminLogin(loginInput: { email: "${email}", password: "${password}" }) {
            accessToken
            expired_accessToken
        }
    }
    `;

    const response = await fetch(HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      document.getElementById('loginNotification').innerHTML =
        result.errors[0].message;
    } else {
      const { accessToken, expired_accessToken } = result.data.adminLogin;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expired_accessToken', expired_accessToken);

      window.location.href = '/user';
    }
  });
