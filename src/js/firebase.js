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

window.visitorRegister = (userName, userEmail, userAgency, userHost, userMotive) => {
  let db = firebase.firestore();
  const date = getRegisterDate();
  const hour = getRegisterHour();
  db.collection('Co-Workings').doc(userAgency).get()
    .then(result => {
      db.collection('visitors').add({
        userName: userName,
        userEmail: userEmail,
        userAgencyID: userAgency,
        userAgencyName: result.data().Agencia,
        userHost: userHost,
        userMotive: userMotive,
        date: date,
        hour: hour,
        status: 0
      })
        .then(result => {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'success',
            title: 'Registro exitoso',
            text: 'Por favor espero un momento a que su visita sea aprobada'
          })
        })
        .catch(error => {
          console.log('Error', error)
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
        if (agencyID === host.data().idAgencia) {
          hostList += `<option value = "${host.id}">${host.data().name}</option>`;
        }
      });
      document.getElementById('user-host').innerHTML += hostList;
    })
}

window.changeVisitorStatus = (userID, option) => {
  let db = firebase.firestore();
  db.collection('visitors').doc(userID).update({
    status: option
  })
    .then(() => {
      swal({
        confirmButtonText: 'Aceptar',
        type: 'success',
        title: 'El status de la visita fue cambiado',
        text: 'Confirme al visitante el status de su registro'
      })
      drawListOfVisitors();
    }).cacth(error => {
      console.log('Error', error);
    })
}

window.drawStatusBadge = (status, userID) => {
  let statusElements = '';
  if (status === 1) {
    statusElements = '<span class="badge badge-success"><i class="fas fa-check-circle"></i> Aprobado</span>';
  } else if (status === 0) {
    statusElements = `<span class="badge badge-primary mr-1"><i class="fas fa-clock"></i> En espera</span><span class="mr-1 badge badge-success"><button class="no-btn white-text" title="Aprovar visita" onclick="changeVisitorStatus('${userID}',1)"><i class="fas fa-check-circle"></i></button></span><span class="badge badge-danger"><button class="no-btn white-text" title="Rechazar visita" onclick="changeVisitorStatus('${userID}',2)"><i class="fas fa-times-circle"></i></button></span>`;
  } else {
    statusElements = '<span class="badge badge-danger"><i class="fas fa-times-circle"></i> Rechazado</span>';
  }
  return statusElements;
}

window.showUserCard = (userID) => {
  let db = firebase.firestore();
  db.collection('visitors').doc(userID).get()
    .then(result => {
      let content = `<div class="small-text border-card d-none" id="userCard"><p>Nombre: ${result.data().userName}</p><p>Correo: ${result.data().userEmail}</p><p>Host: ${result.data().userAgencyName}</p><p>Fecha: ${result.data().date}</p></div>`;
      document.getElementById('card-gafete').innerHTML = content;
      let doc = new jsPDF();
      doc.fromHTML($('#card-gafete').get(0), 20, 20, {
        'width': 300
      });
      doc.save('gafete.pdf');
    })
    .catch(error => {
      console.log('Error', error)
    })
}

window.drawListOfVisitors = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById('table1').style.display = 'block';
      document.getElementById('table2').style.display = 'none';
      document.getElementById('table3').style.display = 'none';
      let db = firebase.firestore();
      let tableContent = '';
      let i = 1;
      db.collection('visitors').orderBy('hour', 'desc').get()
        .then(result => {
          result.forEach(visitor => {
            const status = drawStatusBadge(visitor.data().status, visitor.id);
            tableContent += `<tr>
        <th scope="row">${i++}</th>
        <td>${visitor.data().userName}</td>
        <td>${visitor.data().userEmail}</td>
        <td>${visitor.data().userAgencyName}</td>
        <td>${visitor.data().date}</td>
        <td>${visitor.data().hour}</td>
        <td>${visitor.data().userMotive}</td>
        <td class="text-center">${status}</td>
        <td><button title="Imprimir gafete" class="no-btn" onclick="showUserCard('${visitor.id}')"><span class="badge badge-warning"><i class="fas fa-id-card-alt"></i> Imprimir gafete</span></button></td>
      </tr>`;
          });
          document.getElementById('table-content').innerHTML = tableContent;
        })
        .catch(error => {
          console.log('Error', error);
        });
    } else {
      location.href = ('AdminLogin.html');
    }
  });
}

window.drawListOfAgencies = () => {
  document.getElementById('table1').style.display = 'none';
  document.getElementById('table2').style.display = 'block';
  document.getElementById('table3').style.display = 'none';
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

window.drawListOfHosts = () => {
  document.getElementById('table1').style.display = 'none';
  document.getElementById('table2').style.display = 'none';
  document.getElementById('table3').style.display = 'block';
  let db = firebase.firestore();
  let tableContent = '';
  let i = 1;
  db.collection('host').get()
    .then(result => {
      result.forEach(host => {
        tableContent += `<tr>
        <th scope="row">${i++}</th>
        <td>${host.data().name}</td>
        <td>${host.data().email}</td>
        <td>${host.data().agencia}</td>
      </tr>`
      });
      document.getElementById('table-content3').innerHTML = tableContent;
    })
    .catch(error => {
      console.log('Error', error);
    })

}

window.getRegisterDate = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  day = addZeroToDate(day);
  month = addZeroToDate(month);

  return `${day}/${month}/${year}`;
}

window.addZeroToDate = (digit) => {
  if (digit < 10) {
    digit = `0${digit}`;
  }
  return digit;
}

window.getRegisterHour = () => {
  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  hour = addZeroToDate(hour);
  minutes = addZeroToDate(minutes);
  seconds = addZeroToDate(seconds);

  return `${hour}:${minutes}:${seconds}`;
}

window.signOut = () => {
  firebase.auth().signOut()
    .then(element => {
      location.href('AdminLogin.html');
    }).catch(error => {
      console.log('Error al cerrar sesión');
    });
}