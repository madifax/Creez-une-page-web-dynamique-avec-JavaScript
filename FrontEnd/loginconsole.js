
import modeEdition from './mode-edition.js';

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
 console.log('Form submitted');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');
// console.log('Username:', username);
// console.log('Password:', password);
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: username,
      password: password,
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }
      return response.json();
    })
    .then(data => {
    console.log('Connexion réussie:', data);



      sessionStorage.setItem('token', data.token);
      window.location.href = './index.html';
      modeEdition();
    })
    .catch(error => {
      message.style.color = 'red';
      message.textContent = 'Nom d\'utilisateur ou mot de pass incorrect.';
      console.error(error);
    });
});


