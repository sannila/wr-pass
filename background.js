var data = [
  {
    url: "https://production-wrt-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://staging-simcha-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://staging-nczoo-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "user",
  },
  {
    url: "https://development-dev-estore.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "admin",
  },
  {
    url: "https://development-dev.amazepos.com/",
    username: "superadmin",
    password: "123456",
    role: "user",
  },
];

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.set({
    showPassword: false,
  });
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    console.log("Active tab from background js" + tab.url);
    data.forEach((url) => {
      const dataURL = url.url.split("/");
      const tabURL = tab.url.split("/");
      if (dataURL[2] == tabURL[2]) {
        // this.registration.showNotification("WR-Pass", {
        //   body: "You are logged in as " + url.role,
        //   icon: "icon.png",
        // });
        chrome.storage.local.set({
          showPassword: true,
          url: url.url,
          username: url.username,
          password: url.password,
          role: url.role,
        });
      }
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.set({
    showPassword: false,
  });
  if (changeInfo.status === "complete") {
    data.forEach((url) => {
      const dataURL = url.url.split("/");
      const tabURL = tab.url.split("/");
      if (dataURL[2] == tabURL[2]) {
        // this.registration.showNotification("WR-Pass", {
        //   body: "URL is updated",
        //   icon: "icon.png",
        // });
        chrome.storage.local.set({
          showPassword: true,
          url: url.url,
          username: url.username,
          password: url.password,
          role: url.role,
        });
      }
    });
  }
});

// chrome.tabs.query(
//   {
//     currentWindow: true,
//   },
//   (tabs) => {
//     console.log(tabs);
//     tabs.forEach((tab) => {
//       if (tab.active == true) {
//         console.log("Active tab from background js" + tab.url);
//         data.forEach(url => {
//           const dataURL = url.url.split("/")
//           const tabURL = tab.url.split("/")
//           if(dataURL[2] == tabURL[2]) {
//             chrome.storage.local.set({ "url": url.url, "username": url.username, "password": url.password, "role": url.role });
//           }
//         })
//       }
//     });
//   }
// );
