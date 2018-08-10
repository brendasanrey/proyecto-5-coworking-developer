initializeFirebase();
// Traer la info 
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btn-login');

//Se agrega el evento click del login
btnLogin.addEventListener('click', e =>{
//Se obtiene el email y password   
    e.preventDefault();
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(result =>{
        location.href = ('adminView.html');
    })
    promise.catch(error =>{
        let errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
            swal({
                confirmButtonText: 'Aceptar',
                type: 'error',
                title: 'Contraseña inválida',
                text: 'Inténtalo de nuevo'
            });
        } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
            swal({
                confirmButtonText: 'Aceptar',
                type: 'error',
                title: 'Usuario inválido',
                text: 'Inténtalo de nuevo'
            });
        }
    });
});

/*btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();

});*/

//Agregando un identificador del estado del usuario
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser) {
    console.log(firebaseUser);
   // btnLogout.classList.add('hide');
} else {
    console.log('Not Logged In');
}
});




