const newUser = document.getElementById('newUser');
const newURL = document.getElementById('newURL');
const logoutBtn = document.getElementById('logoutBtn');


logoutBtn.addEventListener('click', () =>{
    chrome.storage.local.remove(['emailValue', 'role'], () =>{
        window.close();
    });
});

newUser.addEventListener('click', () => {
    window.location = './user/user.html';
});

newURL.addEventListener('click', () => {
    window.location = './url/url.html';
});