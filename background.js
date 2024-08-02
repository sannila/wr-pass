chrome.alarms.create({
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('Alarm triggered');
});

chrome.storage.onChanged.addListener((changes, area) => {
    if(area === 'sync' && changes.emailValue?.newValue){
        console.log('Email value changed in local storage' + changes);
    }
});