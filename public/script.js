// document.querySelector("#menuToggle").addEventListener("click", function () {
//   document.querySelector(".toggleMenu").classList.toggle("hidden");
// });

// document.getElementById("requestBtn").addEventListener("click", () => {
//   window.location.href = "login.html";
// });

// && || !

//

document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.querySelector("#signup_button");
  const loginButton = document.querySelector("#login_button");
  const logoutButton = document.querySelector("#logout_button");
  const userInfo = document.getElementById("user-info");
  // const amount = parseFloat(document.getElementById("amount").value);
  // const action = document.getElementById("action").value;

  // Signup
  if (signupButton) {
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();
      const fullName = document.querySelector("#full_name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const users = getUsers() || [];

      if (!fullName || !email || !password) {
        alert("Please fill in all fields");
        return;
      }

      if (users.find((u) => u.email === email)) {
        alert("User already exists");
        return;
      }

      const accountNumber = generateAccountNumber();
      const newUser = {
        fullName,
        email,
        password,
        balance: 0,
        transactions: [],
        saves: 0,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
        accountNumber,
      };

      users.push(newUser);
      setUser(users);

      alert("Account created successfully!");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.querySelector("#login_email").value;
      const password = document.querySelector("#login_password").value;
      const users = getUsers();

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Enter the users details.");
      }
    });
  }

  // Dashboard Page
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (userInfo) {
    if (!loggedInUser) {
      alert("You must be logged in to view this page.");
      window.location.href = "login.html";
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
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }

  //deposit
  // if (!amount || amount <= 0) {
  //   alert("Enter a valid amount");
  //   return;
  // }

  // const users = JSON.parse(localStorage.getItem("users")) || [];
  // const userIndex = users.findIndex(
  //   (user) => user.email === loggedInUser.email
  // );

  // if (userIndex === -1) {
  //   alert("User not found");
  //   return;
  // }

  // if (action === "deposit") {
  //   users[userIndex].balance += amount;
  // } else if (action === "withdraw") {
  //   if (users[userIndex].balance >= amount) {
  //     users[userIndex].balance -= amount;
  //   } else {
  //     alert("Insufficient balance");
  //     return;
  //   }
  // }
});

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function setUser(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function generateAccountNumber() {
  const users = getUsers();
  let accountNumber;
  do {
    accountNumber = "3" + Math.floor(1000000000 + Math.random() * 9000000000);
  } while (users.some((u) => u.accountNumber === accountNumber));
  return accountNumber;
}
