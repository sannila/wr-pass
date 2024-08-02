const logoutBtn = document.getElementById("logoutBtn");
const loggedInUser = document.getElementById("loggedInUser");

const data = [
    {"url": "https://production-wrt-estore.amazepos.com/", "username": "superadmin", "password": "123456", "role": "admin"},
    {"url": "https://staging-simcha-estore.amazepos.com/", "username": "superadmin", "password": "123456", "role": "admin"},
    {"url": "https://staging-nczoo-estore.amazepos.com/", "username": "superadmin", "password": "123456", "role": "user"},
    {"url": "https://development-dev-estore.amazepos.com/", "username": "superadmin", "password": "123456", "role": "admin"},
    {"url": "https://development-dev.amazepos.com/", "username": "superadmin", "password": "123456", "role": "user"},
]

const tableBody = document.getElementById('dataList').getElementsByTagName('tbody')[0];

function populateTable(){
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
        deleteBtn.addEventListener('click', () =>{
            data.splice(index, 1);
            populateTable();
        });

        actionCell.appendChild(deleteBtn);
    });
}

populateTable();


chrome.storage.local.get(["emailValue"], (result) => {
  if (result.emailValue) {
    loggedInUser.innerHTML = result.emailValue;
  }
});

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
