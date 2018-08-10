window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDOgg-hQGU_h2OVup-ZIsDI_137joSDifA",
    authDomain: "proyecto-5-coworking-developer.firebaseapp.com",
    databaseURL: "https://proyecto-5-coworking-developer.firebaseio.com",
    projectId: "proyecto-5-coworking-developer",
    storageBucket: "proyecto-5-coworking-developer.appspot.com",
    messagingSenderId: "632752209221"
    });
    console.log('Se ha inicializado la sesion de firebase');

}
window.visitorRegister = (userName, userEmail, userHost) => {
let db = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();
db.collection('visitors').add({ 
  userName: userName,
  userEmail: userEmail,
  userHost: userHost,
  date: date
})
.then(result => {
  swal({
    confirmButtonText: 'Aceptar',
    type: 'success',
    title:'Visita Registrada',
    text:'Debe esperar a la confirmación'
  })
})

.catch(error => {
  console.log('Usted tiene que registrarse primero', error);
}); 
}
window.getHostList = () => {
let db = firebase.firestore(); 
let hostList= '';
db.collection('Co-Workings').orderBy('Agencia', 'asc').get()
.then(result => {
  result.forEach(host => {
hostList += `
<option value = "${host.data().Agencia}">${host.data().Agencia}</option>`
  }); 
  document.getElementById('user-hots').innerHTML += hostList ;
})
}