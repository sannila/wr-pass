const backBtn = document.getElementById("backBtn");
const addBtn = document.getElementById("addBtn");
const website = document.getElementById("website");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const role = document.getElementById("role");

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
  if(userNameValue == "" || userNameValue == null){
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
