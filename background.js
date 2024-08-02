// chrome.alarms.onAlarm.addListener((alarm) => {
//   chrome.storage.local.remove(["dateTime", "emailValue"], () => {
//     console.log("dateTime removed from local storage");

//     this.registration.showNotification("WR-Pass session removed");
//   });
// });

// chrome.storage.onChanged.addListener((changes, area) => {
//   if (area === "local" && changes.dateTime?.newValue) {
//     console.log("old value" + changes.dateTime?.oldValue);
    
//   }
// });

// chrome.storage.local.get(["dateTime"], (res) => {
//   if (res.dateTime) {
//     console.log(res.dateTime);
//     return;
//   }
//   return;
// });
