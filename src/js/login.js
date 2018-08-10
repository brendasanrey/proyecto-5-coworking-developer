console.log("Sí esta bien ligado con el html")
// Initialize Firebase
initializeFirebase();
// Traer la info 
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//Se agrega el evento click del login
btnLogin.addEventListener('click', e =>{
//Se obtiene el email y password    
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    console.log('Se escucha el evento click de login');
//
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e =>
        console.log(e.message));
});
// Se agrega el evento click del SignUp
btnSignUp.addEventListener('click', e => {
    console.log('Se escucha el evento click de SignUp');
  //Se obtiene el email y password    
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

//
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e =>
      console.log(e.message));  
});
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();

});
//Agregando un identificador del estado del usuario
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser) {
    console.log(firebaseUser);
   // btnLogout.classList.add('hide');
} else {
    console.log('Not Logged In');
}
});




