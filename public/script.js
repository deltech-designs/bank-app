// document.querySelector('#menuToggle').addEventListener('click', function () {
//   document.querySelector('.toggleMenu').classList.toggle('hidden');
// });

// document.getElementById('requestBtn').addEventListener('click', () => {
//   window.location.href = 'login.html';
// });

// && || !

const user = [];

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('users')) || [];
  return user ? JSON.parse(user) : null;
};

function setUser(user) {
  localStorage.setItem('users', JSON.stringify(user));
}

document.querySelector('#signup_button').addEventListener('click', () => {
  const fullName = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (!fullName || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const userData = {
    fullName,
    email,
    password,
    balance: 0,
    transactions: [],
    saves: 0,
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
  };

  user.push(userData);
  setUser(user);

  alert('Account created successfully!');
  window.location.href = 'login.html';
});



