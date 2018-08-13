initializeFirebase();
document.getElementById('register-user').disabled = true;
document.getElementById('register-user-search').addEventListener('click', event => {
    event.preventDefault();
    const userEmail = document.getElementById('user-email').value;
    if (userEmail === '') {
        swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Error',
            text: 'Por favor verifica tus datos y vuelve a intentarlo.'
        })
    }
    visitorSearch(userEmail);
})

document.getElementById('register-user').addEventListener('click', event =>{
    const userEmail = document.getElementById('user-email').value;
    visitorCheckOut(userEmail);
})