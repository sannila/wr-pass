const email = document.getElementById("emailId");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");
const emailFieldSection = document.getElementById("emailField");
const differentUserLink = document.getElementById("differentUserLink");
const registeredEmail = document.getElementById("registeredEmail");
const registeredEmailSection = document.getElementById(
  "registeredEmailSection"
);

// Sign in Functionality
signInBtn.addEventListener("click", () => {
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
  const dateTime = new Date().toLocaleString();

  chrome.storage.local.set({ emailValue, passwordValue, dateTime }, () => {
    window.location = "../pages/index/index.html";
  });
});

chrome.storage.local.get(["emailValue", "passwordValue", "dateTime"], (res) => {
  if (res.dateTime != undefined && res.dateTime != null && res.dateTime != "") {
    //   document.getElementById('lastSignIn').innerHTML = 'Last sign in: '+res.dateTime;
    window.location = "../pages/index/index.html";
  }
  if (
    res.emailValue != undefined &&
    res.emailValue != null &&
    res.emailValue != ""
  ) {
    email.value = res.emailValue ?? "";
    emailFieldSection.style.display = "none";
    differentUserLink.style.display = "";
    registeredEmail.innerHTML = res.emailValue;
    registeredEmailSection.style.display = "";
    return;
  } else {
    registeredEmail.innerHTML = "";
    registeredEmailSection.style.display = "none";
    return;
  }
});

differentUserLink.addEventListener("click", () => {
  chrome.storage.local.remove(["emailValue"], () => {
    console.log("Credentials removed");
    email.value = "";
    emailFieldSection.style.display = "";
    differentUserLink.style.display = "none";
    registeredEmail.innerHTML = "";
    registeredEmailSection.style.display = "none";
  });
});

// Get the storage value of emailField, if it exists then hide the email field section
// chrome.storage.sync.get(["emailValue", "passwordValue"], (data) => {
//   if (data.emailValue != null || data.emailValue != "") {
//     registeredEmail.innerHTML = data.emailValue;
//     emailFieldSection.style.display = "none";
//     registeredEmailSection.style.display = "";
//     return;
//   }
//   email.value = data.emailValue ?? "Enter your email address";
//   password.value = data.passwordValue ?? "Enter your password";
// });

// When clicking differentUserLink remove the emailValue from localstorage
// differentUserLink.addEventListener("click", () => {
//   chrome.storage.sync.remove("emailValue", () => {
//     console.log("Email value removed from local storage");
//     emailFieldSection.style.display = "";
//     registeredEmailSection.style.display = "none";
//   });
// });
