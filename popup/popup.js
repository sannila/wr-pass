const email = document.getElementById("emailId");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");
const emailFieldSection = document.getElementById("emailField");
const differentUserLink = document.getElementById("differentUserLink");
const registeredEmail = document.getElementById("registeredEmail");
const registeredEmailSection = document.getElementById(
  "registeredEmailSection"
);

const errorMessageSection = document.getElementById("errorMessageSection");
const errorMessage = document.getElementById("errorMessage");

// If the user already logged in navigate to the index page
chrome.storage.local.get(["emailValue"], (res) => {
  if (res.emailValue != undefined && res.emailValue != null && res.emailValue != "") {
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

chrome.tabs.query(
  {
    currentWindow: true,
  },
  (tabs) => {
    console.log(tabs);
    tabs.forEach((tab) => {
      if (tab.active == true) {
        console.log("Active tab from popup js : " + tab.url);
        chrome.storage.local.set({ tabUrl: tab.url });
      }
    });
  }
);

// Sign in Functionality
signInBtn.addEventListener("click", async (e) => {
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
  const dateTime = new Date().toLocaleString();

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
  } else {
    errorMessageSection.style.display = "none";
    errorMessage.innerHTML = "";
    chrome.storage.local.set({ emailValue, role: content.role }, () => {
      window.location = "../pages/index/index.html";
    });
  }

  // await fetch("http://localhost:3000/users/register", {
  //   mode: "no-cors",
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((res) => console.log("on successfull login " + res.body))
  //   .catch((err) => console.log("on errorfull login " + err));
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
