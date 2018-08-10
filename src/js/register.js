initializeFirebase();
getAgencyList();

document.getElementById('register-user').addEventListener('click', event => {
    event.preventDefault();
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userAgency = document.getElementById('user-agency').value;
    const userHost = document.getElementById('user-host').value;

    visitorRegister(userName, userEmail, userAgency, userHost);
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-agency').value = '';
    document.getElementById('user-host').value = '';
})