var website_data = [];

// get credentials on new tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.storage.local.set({
    showPassword: false,
  });

  /**
   *
   * Get credential data from API endpoint
   * and assign to [data]
   * */

  chrome.storage.local.get(["emailValue"], async (result) => {
    if (result.emailValue === undefined) {
      return;
    }
    await fetch("http://localhost:3000/credentials", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("credential list");
        console.log(data);
        website_data = data;
        return;
      });

    chrome.tabs.get(activeInfo.tabId, (tab) => {
      console.log("Active tab from background js" + tab.url);

      website_data.forEach((url) => {
        const dataURL = url.WebsiteURL.split("/");
        const tabURL = tab.url.split("/");
        if (dataURL[2] == tabURL[2]) {
          // this.registration.showNotification("WR-Pass", {
          //   body: "You are logged in as " + url.role,
          //   icon: "icon.png",
          // });
          chrome.storage.local.set({
            showPassword: true,
            data: url,
          });
        }
      });
    });
  });
});

// Get details when updating or re-loading the url
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  chrome.storage.local.set({
    showPassword: false,
  });

  /**
   *
   * Get credential data from API endpoint
   * and assign to [data]
   * */
  chrome.storage.local.get(["emailValue"], async (result) => {
    if (result.emailValue === undefined) {
      return;
    }
    await fetch("http://localhost:3000/credentials", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("credential list");
        console.log(data);
        website_data = data;
        return;
      });

    if (changeInfo.status === "complete") {
      website_data.forEach((url) => {
        const dataURL = url.WebsiteURL.split("/");
        const tabURL = tab.url.split("/");
        if (dataURL[2] == tabURL[2]) {
          // this.registration.showNotification("WR-Pass", {
          //   body: "URL is updated",
          //   icon: "icon.png",
          // });
          chrome.storage.local.set({
            showPassword: true,
            data: url,
          });
        }
      });
    }
  });
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
