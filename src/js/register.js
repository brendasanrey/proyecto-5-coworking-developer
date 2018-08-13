initializeFirebase();
getAgencyList();

document.getElementById('register-user').addEventListener('click', event => {
    event.preventDefault();
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userAgency = document.getElementById('user-agency').value;
    const userHost = document.getElementById('user-host').value;
    const userMotive = document.getElementById('user-motive').value;
    if(userName === '' || userEmail === ''){
        swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Error',
            text: 'Por favor verifica tus datos y vuelve a intentarlo.'
        })
    }
    visitorRegister(userName, userEmail, userAgency, userHost, userMotive);
})