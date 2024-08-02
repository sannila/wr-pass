const email = document.getElementById('emailId');
const password = document.getElementById('password');
const signinBtn = document.getElementById('signinBtn');

signinBtn.addEventListener('click', () => {
    if(email.value === null && password.value === null){
        return;
    }
    if (email.value === '' || password.value === '') {
        alert('Please fill in all fields');
    } else {
        const emailValue = email.value;
        const passwordValue = password.value;
        const data = {
            email: emailValue,
            password: passwordValue
        };

        console.log('Signing in data: ' + data);
        // const url = 'http://localhost:3001/users/';
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.status === 'success') {
        //             // localStorage.setItem('token', data.token);
        //             // localStorage.setItem('user', JSON.stringify(data.data));
        //             // window.location.href = 'admin.html';
        //             console.log('Successfully logged in' + data)
        //         } else {
        //             alert(data.message);
        //         }
        //     })
        //     .catch(error => console.log(error));
    }
});