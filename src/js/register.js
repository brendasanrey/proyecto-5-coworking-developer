initializeFirebase();
getHostList();

document.getElementById('register-user').addEventListener('click', event => {
    event.preventDefault();
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userHost = document.getElementById('user-hots').value;

    visitorRegister(userName, userEmail, userHost);
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-hots').value = '';
})