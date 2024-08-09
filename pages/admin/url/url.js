const backBtn = document.getElementById("backBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");
const website = document.getElementById("website");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const role = document.getElementById("role");
const credentialListBtn = document.getElementById("credentialListbtn");
const list_credential = document.getElementById("list_credential");
const new_credential = document.getElementById("new_credential");

let showCredentialList = false;
var credential_data = [];

logoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove(["emailValue", "role"], () => {
    window.close();
  });
});

// Back to function
backBtn.addEventListener("click", () => {
  window.history.back();
});

// Add new credentials function
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const websiteValue = website.value;
  const userNameValue = userName.value;
  const passwordValue = password.value;
  const roleValue = role.value;

  if (websiteValue == "" || websiteValue == null) {
    alert("Please enter website url");
    return;
  }
  if (userNameValue == "" || userNameValue == null) {
    alert("Please enter user name");
    return;
  }
  if (passwordValue == "" || passwordValue == null) {
    alert("Please enter website  password");
    return;
  }

  var payload = {
    WebsiteURL: websiteValue,
    UserName: userNameValue,
    Password: passwordValue,
    Role: roleValue,
  };

  const rawResponse = await fetch("http://localhost:3000/credentials", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const content = await rawResponse.json();
  if (content.errorCoee === 4001) {
    errorMessageSection.style.display = "";
    errorMessage.innerHTML = content.message;
    return;
  }
  if (content.error) {
    errorMessageSection.style.display = "";
    errorMessage.innerHTML = content.error;
    return;
  }

  errorMessageSection.style.display = "";
  errorMessage.innerHTML = content.message;
  website.value = "";
  userName.value = "";
  password.value = "";
  return;
});

// get the list of credentials
credentialListBtn.addEventListener("click", async () => {
  showCredentialList = !showCredentialList;

  if (showCredentialList) {
    credential_data = [];
    list_credential.style.display = "";
    new_credential.style.display = "none";
    credentialListbtn.innerHTML = "Add New Credential";

    const loading = document.getElementById("loading");
    loading.style.display = "";

    // Fetch data from api server
    await fetch("http://localhost:3000/credentials", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        credential_data = data;
        // Call the function to populate the table
        createTableRows(credential_data);
        loading.style.display = "none";
        return
      });
  } else {
    tableBody.innerHTML = ''
    list_credential.style.display = "none";
    new_credential.style.display = "";
    credentialListbtn.innerHTML = "Credential List";
    return;
  }
});

const tableBody = document.querySelector("#dynamicTable tbody");

function createTableRows(data) {
  data.forEach((item, index) => {
    const row = document.createElement("tr");

    const websiteCell = document.createElement("td");
    websiteCell.textContent = item.WebsiteURL;
    row.appendChild(websiteCell);

    const userNameCell = document.createElement("td");
    userNameCell.textContent = item.UserName;
    row.appendChild(userNameCell);

    const passwordCell = document.createElement("td");
    passwordCell.textContent = item.Password;
    row.appendChild(passwordCell);

    const roleCell = document.createElement("td");
    roleCell.textContent = item.Role;
    row.appendChild(roleCell);

    tableBody.appendChild(row);

    // Create the Actions cell
    const actionsCell = document.createElement("td");

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.classList.add("action-button", "view-button");
    viewButton.onclick = () => handleView(index);
    actionsCell.appendChild(viewButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("action-button", "delete-button");
    deleteButton.onclick = () => handleDelete(index);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

function handleView(index) {}

function handleDelete(index) {}

// Function to refresh the table after delete
function refreshTable() {
  tableBody.innerHTML = ""; // Clear the current rows
  createTableRows(credential_data); // Rebuild the table with updated data
}
