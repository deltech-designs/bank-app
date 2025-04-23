// document.querySelector('#menuToggle').addEventListener('click', function () {
//   document.querySelector('.toggleMenu').classList.toggle('hidden');
// });

// document.getElementById('requestBtn').addEventListener('click', () => {
//   window.location.href = 'login.html';
// });

const user = [];

// console.log(user.id);

const getUsers = () => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

function setUser(user) {
  localStorage.setItem('users', JSON.stringify(user));
}

function generateAccountNumber() {
  const users = getUsers() || [];
  let accountNumber;
  do {
    accountNumber = '3' + Math.floor(1000000000 + Math.random() * 9000000000); // 11-digit number starting with 3
  } while (users?.some((user) => user.accountNumber === accountNumber));
  return accountNumber;
}

document.querySelector('#signup_button').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission
  const fullName = document.querySelector('#full_name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const users = getUsers() || [];
  console.log(users.id);

  if (!fullName || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  if (users.find((u) => u.email === email)) {
    alert('User already exists');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long');
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
    accountNumber: generateAccountNumber(),
  };

  user.push(userData);
  setUser(user);

  console.log(user.id);

  alert('Account created successfully!');
  window.location.href = 'login.html';
});

document.querySelector('#login_button').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const users = getUsers();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert('Invalid email or password');
    return;
  }

  alert('Login successful!');
  window.location.href = 'dashboard.html';
});
