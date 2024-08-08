const email = document.getElementById("emailId");
const password = document.getElementById("password");
const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;
  if (emailValue == "" || emailValue == null) {
    alert("Please enter your email address");
    return;
  }
  if (passwordValue == "" || passwordValue == null) {
    alert("Please enter your password");
    return;
  }

  var payload = { email: emailValue, password: passwordValue };

  const rawResponse = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const content = await rawResponse.json();
  if (content.errorCode === 4001) {
    // alert(content.message);
    errorMessageSection.style.display = "";
    errorMessage.innerHTML = content.message;
    return;
  }

  if (content.role != "admin") {
    errorMessageSection.style.display = "";
    errorMessage.innerHTML = "Only administrators can access this section.";
    return;
  }

  errorMessageSection.style.display = "none";
  errorMessage.innerHTML = "";
  chrome.storage.local.set({ emailValue, role: content.role }, () => {
    window.location = "../pages/admin/admin.html";
  });
});
