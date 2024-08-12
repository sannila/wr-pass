const logoutBtn = document.getElementById("logoutBtn");
const loggedInUser = document.getElementById("loggedInUser");
const copy_action_btn = document.getElementById("copy_action_btn");

chrome.storage.local.get(["emailValue", "role"], (res) => {
  loggedInUser.innerHTML = res.emailValue + " - " + res.role;
});

var url_data = [];

async function getUersList() {
  await fetch("http://localhost:3000/credentials", {
    mode: "no-cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      url_data = data;
      return;
    })
    .catch((err) => console.log("index: on errorfull login " + err));
}

getUersList();

// When the current tab's url has password this will show here
const showpassword_section = document.getElementById("match_dataList");
const noPasswordToShow = document.getElementById("noPasswordToShow");
const url = document.getElementById("url");
const username = document.getElementById("username");
const password = document.getElementById("password");

chrome.storage.local.get(["showPassword", "role", "data"], (result) => {
  console.log("from index page data");
  console.log(result);
  if (result.showPassword) {
    showpassword_section.style.display = "";
    noPasswordToShow.style.display = "none";
    url.textContent = result.data.WebsiteURL;
    userName.textContent = result.data.UserName;
    // password.textContent = result.data.Password;
  } else {
    showpassword_section.style.display = "none";
    noPasswordToShow.style.display = "";
  }
});

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
  url_data.forEach((item, index) => {
    console.log("item list");
    console.log(item);
    const newRow = tableBody.insertRow();

    const urlCell = newRow.insertCell(0);
    const usernameCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    urlCell.textContent = item.WebsiteURL;
    usernameCell.textContent = item.UserName;
    // passwordCell.textContent = item.password;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
      url_data.splice(index, 1);
      populateTable();
    });

    actionCell.appendChild(deleteBtn);
  });
}

populateTable();

logoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove(["emailValue", "data", "role", "showPassword"], () => {
    console.log("dateTime removed from local storage");
    window.location = "../../popup/popup.html";
  });
});

// copy the passwords
copy_action_btn.addEventListener("click", () => {
  chrome.storage.local.get(["data"], (result) => {
    navigator.clipboard.writeText(result.data.Password);
  })
});
