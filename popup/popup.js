const email = document.getElementById("emailId");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");
// const emailFieldSection = document.getElementById("emailField");
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
});



