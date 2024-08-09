const backBtn = document.getElementById("backBtn");
const logoutBtn = document.getElementById("logoutBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");
const addBtn = document.getElementById("addBtn");

const userListbtn = document.getElementById("userListbtn");
const list_user = document.getElementById("list_user");
const new_user = document.getElementById("new_user");
var user_data = [];
let showCredentialList = false;

logoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove(["emailValue", "role"], () => {
    window.close();
  });
});

backBtn.addEventListener("click", () => {
  window.history.back();
});

// Add user function;
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const passwordValue = password.value;
  const roleValue = role.value;
  if (emailValue == "" || emailValue == null) {
    alert("Please enter user email address");
    return;
  }
  if (passwordValue == "" || passwordValue == null) {
    alert("Please enter user temporary  password");
    return;
  }

  var payload = { email: emailValue, password: passwordValue, role: roleValue };

  const rawResponse = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const content = await rawResponse.json();
  if (content.errorCode === 4001) {
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
  errorMessage.innerHTML = "User Registered Successfully";
  email.value = "";
  passwordValue.value = "";
  return;
});

// get the user list
userListbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  showCredentialList = !showCredentialList;

  if (showCredentialList) {
    list_user.style.display = "";
    new_user.style.display = "none";
    userListbtn.innerHTML = "Add New User";

    const loading = document.getElementById("loading");
    loading.style.display = "";

    // Fetch user data from api server
    await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        user_data = data;
        // Call the function to populate the table
        createTableRows(user_data);
        loading.style.display = "none";
        return;
      });
  } else {
    tableBody.innerHTML = "";
    list_user.style.display = "none";
    new_user.style.display = "";
    userListbtn.innerHTML = "Credential List";
    return;
  }
});

const tableBody = document.querySelector("#dynamicTable tbody");

function createTableRows(data) {
  data.forEach((item, index) => {
    const row = document.createElement("tr");

    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    row.appendChild(emailCell);

    const passwordCell = document.createElement("td");
    passwordCell.textContent = item.password;
    row.appendChild(passwordCell);

    const roleCell = document.createElement("td");
    roleCell.textContent = item.role;
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
  createTableRows(user_data); // Rebuild the table with updated data
}
