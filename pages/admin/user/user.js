const backBtn = document.getElementById("backBtn");
const logoutBtn = document.getElementById('logoutBtn');
const email = document.getElementById("email");
const password = document.getElementById("password");
const addBtn = document.getElementById("addBtn");

logoutBtn.addEventListener('click', () =>{
    chrome.storage.local.remove(['emailValue', 'role'], () =>{
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
