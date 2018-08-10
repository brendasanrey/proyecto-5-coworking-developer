window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDOgg-hQGU_h2OVup-ZIsDI_137joSDifA",
    authDomain: "proyecto-5-coworking-developer.firebaseapp.com",
    databaseURL: "https://proyecto-5-coworking-developer.firebaseio.com",
    projectId: "proyecto-5-coworking-developer",
    storageBucket: "proyecto-5-coworking-developer.appspot.com",
    messagingSenderId: "632752209221"
  });
}

window.visitorRegister = (userName, userEmail, userAgency, userHost) => {
  let db = firebase.firestore();
  const date = firebase.firestore.FieldValue.serverTimestamp();
  db.collection('Co-Workings').doc(userAgency).get()
  .then(result =>{
    db.collection('visitors').add({
      userName: userName,
      userEmail: userEmail,
      userAgencyID: userAgency,
      userAgencyName: result.data().Agencia,
      userHost: userHost,
      date: date,
      status: 0
    })
      .then(result => {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'success',
          title: 'Su visita fue registrada',
          text: 'Debe esperar a la confirmación del host'
        })
      })
      .catch(error => {
        console.log('Tiene que registrarse primero', error);
      });
  })  
}

window.getAgencyList = () => {
  let db = firebase.firestore();
  let agencyList = '';
  db.collection('Co-Workings').orderBy('Agencia', 'asc').get()
    .then(result => {
      result.forEach(agency => {
        agencyList += `<option value = "${agency.id}">${agency.data().Agencia}</option>`;
      });
      document.getElementById('user-agency').innerHTML += agencyList;
    })
}

window.getHostList = () => {
  let db = firebase.firestore();
  let hostList = '';
  const agencyID = document.getElementById('user-agency').value;
  document.getElementById('user-host').innerHTML = '<option value="" disabled selected>Elige un anfitrón</option>'; 
  db.collection('host').orderBy('name', 'asc').get()
    .then(result => {
      result.forEach(host => {
        if(agencyID === host.data().idAgencia){
          hostList += `<option value = "${host.id}">${host.data().name}</option>`;
        }
      });
      document.getElementById('user-host').innerHTML += hostList;
    })
}


window.drawStatusBadge = (status) =>{
  let statusElements = '';
  if(status === 1){
    statusElements = '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Aprovado</span>';
  }else if(status === 0) {
    statusElements = '<span class="badge badge-primary"><i class="fas fa-clock"></i> En espera</span>';
  }else{
    statusElements = '<span class="badge badge-danger"><i class="fas fa-times-circle"></i> Rechazado</span>';
  }
  return statusElements;
}

window.drawNameHost = (hostID) =>{
  let db = firebase.firestore();
  let hostName = '';
  db.collection('host').doc(hostID).get()
    .then(response => {
      hostName = `${response.data().name}`;
    })
    return hostName;
}

window.showUserCard = (userID) =>{
  let db = firebase.firestore();
  db.collection('visitors').doc(userID).get()
  .then(result =>{
    let content = `<div class="small-text border-card d-none" id="userCard"><p>Nombre: ${result.data().userName}</p><p>Correo: ${result.data().userEmail}</p><p>Host: ${result.data().userHost}</p><p>Fecha: ${result.data().date}</p></div>`;
    document.getElementById('card-gafete').innerHTML = content;
    let doc = new jsPDF();
    doc.fromHTML($('#card-gafete').get(0), 20, 20,{
      'width': 300 });
    doc.save('gafete.pdf');
  })
  .catch(error =>{
    console.log('Error', error)
  })
}

window.drawListOfVisitors = () =>{
  document.getElementById('table1').style.display = 'block';
  document.getElementById('table2').style.display = 'none';
  let db = firebase.firestore();
  let tableContent = '';
  let i = 1;
  db.collection('visitors').orderBy('date', 'desc').get()
  .then(result =>{
    result.forEach(visitor =>{
      const status = drawStatusBadge(visitor.data().status);
      tableContent += `<tr>
        <th scope="row">${i++}</th>
        <td>${visitor.data().userName}</td>
        <td>${visitor.data().userEmail}</td>
        <td>${visitor.data().userAgencyName}</td>
        <td>${visitor.data().date}</td>
        <td>${status}</td>
        <td><button class="no-btn"><span class="badge badge-warning" onclick="showUserCard('${visitor.id}')">Imprimir gafete</span></button></td>
      </tr>`;
    });
    document.getElementById('table-content').innerHTML = tableContent;
  })
  .catch(error =>{
    console.log('Error', error);
  })

}

drawListOfHosts = () =>{
  document.getElementById('table1').style.display = 'none';
  document.getElementById('table2').style.display = 'block';
  let db = firebase.firestore();
  let tableContent = '';
  let i = 1;
  db.collection('Co-Workings').get()
    .then(result => {
      result.forEach(host => {
        tableContent += `<tr>
        <th scope="row">${i++}</th>
        <td>${host.data().Agencia}</td>
        <td>${host.data().Teléfono}</td>
        <td>${host.data().email}</td>
      </tr>`
      });
      document.getElementById('table-content2').innerHTML = tableContent;
    })
    .catch(error => {
      console.log('Error', error);
    })
}