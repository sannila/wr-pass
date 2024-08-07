const logoutBtn = document.getElementById("logoutBtn");
const loggedInUser = document.getElementById("loggedInUser");

chrome.storage.local.get(['emailValue'], (res) => {
  loggedInUser.innerHTML = res.emailValue;
})

var data = [
  {
    url: "https://production-wrt-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://staging-simcha-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://staging-nczoo-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "user",
  },
  {
    url: "https://development-dev-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://development-dev.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "user",
  },
];

async function getUersList() {
  await fetch('http://localhost:3000/users', {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text()).then((data) => console.log(data))
    .catch((err) => console.log("index: on errorfull login " + err));
}

getUersList();

// When the current tab's url has password this will show here
const showpassword_section = document.getElementById("match_dataList");
const noPasswordToShow = document.getElementById("noPasswordToShow");
const url = document.getElementById("url");
const username = document.getElementById("username");
const password = document.getElementById("password");

chrome.storage.local.get(
  ["showPassword", "url", "username", "password"],
  (result) => {
    console.log(result);
    if (result.showPassword) {
      showpassword_section.style.display = "";
      noPasswordToShow.style.display = "none";
      url.textContent = result.url;
      userName.textContent = result.username;
      password.textContent = result.password;
    } else {
      showpassword_section.style.display = "none";
      noPasswordToShow.style.display = "";
    }
  }
);

// When clicking showAllPassword
const showAllPassword = document.getElementById("showAllPassword");
const hideAllPassword = document.getElementById("hideAllPassword");
const dataList = document.getElementById("dataList");

showAllPassword.addEventListener("click", () => {
  dataList.style.display = "";
  hideAllPassword.style.display = "";
  showAllPassword.style.display = "none";
});

hideAllPassword.addEventListener("click", () => {
  dataList.style.display = "none";

  hideAllPassword.style.display = "none";
  showAllPassword.style.display = "";
});

const tableBody = document
  .getElementById("dataList")
  .getElementsByTagName("tbody")[0];

function populateTable() {
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const newRow = tableBody.insertRow();

    const urlCell = newRow.insertCell(0);
    const usernameCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    urlCell.textContent = item.url;
    usernameCell.textContent = item.username;
    passwordCell.textContent = item.password;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
      data.splice(index, 1);
      populateTable();
    });

    actionCell.appendChild(deleteBtn);
  });
}

populateTable();

logoutBtn.addEventListener("click", () => {
  // fetch('/logout', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  // .then(response => {
  //     if (response.ok) {
  //         window.location.href = '/';
  //     } else {
  //         console.error('Failed to logout');
  //     }
  // })
  // .catch(error => {
  //     console.error('Error:', error);
  // });

  chrome.storage.local.remove(["dateTime", "emailValue"], () => {
    console.log("dateTime removed from local storage");
    window.location = "../../popup/popup.html";
  });
});
