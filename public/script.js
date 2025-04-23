// Optional: Menu toggle and request button
// document.querySelector("#menuToggle").addEventListener("click", function () {
//   document.querySelector(".toggleMenu").classList.toggle("hidden");
// });

// document.getElementById("requestBtn").addEventListener("click", () => {
//   window.location.href = "login.html";
// });

// Utility functions
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function setUser(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function generateAccountNumber() {
  const users = getUsers();
  let accountNumber;
  do {
    accountNumber = '3' + Math.floor(1000000000 + Math.random() * 9000000000);
  } while (users.some((u) => u.accountNumber === accountNumber));
  return accountNumber;
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const signupButton = document.querySelector('#signup_button');
  const loginButton = document.querySelector('#login_button');
  const logoutButton = document.querySelector('#logout_button');
  const userInfo = document.getElementById('user-info');

  // Signup
  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      const fullName = document.querySelector('#full_name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
      const users = getUsers();

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

      const newUser = {
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

      users.push(newUser);
      setUser(users);

      alert('Account created successfully!');
      window.location.href = 'login.html';
    });
  }

  // Login
  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.querySelector('#login_email').value.trim();
      const password = document.querySelector('#login_password').value.trim();
      const users = getUsers();

      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid email or password');
      }
    });
  }

  // Dashboard Info Display
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (userInfo) {
    if (!loggedInUser) {
      alert('You must be logged in to view this page.');
      window.location.href = 'login.html';
    } else {
      userInfo.innerHTML = `
        <p><strong>Full Name:</strong> ${loggedInUser.fullName}</p>
        <p><strong>Email:</strong> ${loggedInUser.email}</p>
        <p><strong>Account Number:</strong> ${loggedInUser.accountNumber}</p>
        <p><strong>Balance:</strong> $${loggedInUser.balance.toFixed(2)}</p>
        <p><strong>Account Created:</strong> ${loggedInUser.createdAt}</p>
      `;
    }
  }

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    });
  }

  const openModalButton = document.querySelector('#openModalButton');
  const modal = document.querySelector('#modal');
  const closeModalButton = document.querySelector('#closeModalButton');

  openModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
  });

  closeModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('hidden');
  });

  // function showModal() {
  //   // modalBody.classList.remove('hidden');
  //   alert('This feature is not available yet!');
  // }

  function hideModal() {
    modalBody.classList.add('hidden');
  }

  // Deposit and Withdraw
  const depositButton = document.querySelector('#deposit_button');
  const withdrawButton = document.querySelector('#withdraw_button');

  depositButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.querySelector('#deposit_amount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount to deposit');
      return;
    }

    loggedInUser.balance += amount;
    loggedInUser.transactions.push({
      date: new Date().toLocaleString(),
      amount,
      type: 'Deposit',
    });
    setUser(
      getUsers().map((user) =>
        user.id === loggedInUser.id ? loggedInUser : user
      )
    );
    alert('Deposit successful!');
    window.location.reload();
  });

  // Transaction History
  const transactionHistory = document.querySelector('#transaction-history');
  if (transactionHistory) {
    const transactions = loggedInUser.transactions
      .map((transaction) => {
        return `<li>${transaction.date} - $${transaction.amount} - ${transaction.type}</li>`;
      })
      .join('');
    transactionHistory.innerHTML =
      transactions || '<li>No transactions found.</li>';
  }

  // Savings
  const savingsButton = document.querySelector('#savings_button');
  const savingsAmount = document.querySelector('#savings_amount');
});
