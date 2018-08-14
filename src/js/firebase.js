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

window.visitorSearch = (userEmail) => {
  let db = firebase.firestore();
  let cont = 0;
  let result = '';
  db.collection('visitors').get()
    .then(response => {
      response.forEach(visitor => {
        if (visitor.data().userEmail === userEmail) {
          cont++;
          result = `<div class="card">
                        <div class="card-body">
                            <span class="titles">Nombre: ${visitor.data().userName}</span>
                            <p class="mb-0 text-right little-text">¿No son tus datos?</p> 
                            <a href="visitorCheckOut.html"><p class="mb-0 text-right little-text">Intenta de nuevo</p></a>
                        </div>
                    </div>`;
        }
      })
      document.getElementById('user-info').innerHTML = result;
      if (cont === 0) {
        swal({
          confirmButtonText: 'Aceptar',
          type: 'error',
          title: 'No se encontro ningun registro',
          text: 'Por favor verifica tus datos y vuelve a intentarlo.'
        })
      } else {
        document.getElementById('register-user').disabled = false;
      }
    })
}

window.visitorCheckOut = (userEmail) => {
  let db = firebase.firestore();
  db.collection('visitors').get()
    .then(response => {
      const hour = getRegisterHour();
      response.forEach(visitor => {
        if (visitor.data().userEmail === userEmail) {
          const userID = visitor.id;
          db.collection('visitors').doc(userID).update({
            status: 3,
            departureTime: hour
          })
            .then(() => {
              location.href = ('splash.html');
            })
        }
      })
    })
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
        departureTime: '00:00',
        status: 0
      })
        .then(result => {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'success',
            title: 'Registro exitoso',
            text: 'Por favor espero un momento a que su visita sea aprobada'
          }).then((result) => {
            location.href = ('../index.html');
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
  if (status === 0) {
    statusElements = `<p class="mb-0"><span class="mr-1 badge badge-success"><button class="no-btn white-text" title="Aceptar" onclick="changeVisitorStatus('${userID}',1)"><i class="fas fa-check-circle"></i>  Aceptar</button></span></p><p class="mt-0"><span class="badge badge-danger"><button class="no-btn white-text" title="Denegar" onclick="changeVisitorStatus('${userID}',2)"><i class="fas fa-times-circle"></i> Denegar</button></span></p>`;
  } else if (status === 1) {
    statusElements = `<span class="badge badge-primary"><i class="fas fa-clock"></i> Pendiente</span>`;
  } else if (status === 2) {
    statusElements = '<span> N/A</span>';
  } else {
    let db = firebase.firestore();
    db.collection('visitors').doc(userID).get()
      .then(response => {
        document.getElementById(`departure-time${userID}`).innerHTML = `<span>${response.data().departureTime}</span>`;
      })
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
      document.getElementById('table1').style.display = 'table';
      document.getElementById('table2').style.display = 'none';
      document.getElementById('table3').style.display = 'none';
      document.getElementById('chart1').style.display = 'none';
      const elements = document.getElementsByClassName('table0');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
      }
      let db = firebase.firestore();
      let tableContent = '';
      let i = 1;
      const todayDate = getRegisterDate();
      const todayDay = getDay(todayDate);
      let todayVisitors = 0;
      let interviewMotive = 0;
      let classMotive = 0;
      let personalMotive = 0;
      let meetingMotive = 0;
      db.collection('visitors').orderBy('hour', 'desc').get()
        .then(result => {
          result.forEach(visitor => {
            if (visitor.data().date === todayDate) {
              todayVisitors++;
              if (visitor.data().userMotive === 'Personal') {
                personalMotive++;
              }
              if (visitor.data().userMotive === 'Clase') {
                classMotive++;
              }
              if (visitor.data().userMotive === 'Reunión') {
                meetingMotive++;
              }
              if (visitor.data().userMotive === 'Entrevista') {
                interviewMotive++;
              }
              const status = drawStatusBadge(visitor.data().status, visitor.id);
              tableContent += `<tr>
              <th scope="row">${i++}</th>
              <td class="text-center"><p class="mb-0">${visitor.data().userName}</p><p class="mt-0 gray-text">${visitor.data().userEmail}</p></td>
              <td class="text-center">${visitor.data().userAgencyName}</td>
              <td class="text-center">${visitor.data().userMotive}</td>
              <td class="text-center">${visitor.data().date}</td>
              <td class="text-center">${visitor.data().hour}</td>
              <td class="text-center" id="departure-time${visitor.id}">${status}</td>
              <td><button title="Imprimir gafete" class="no-btn" onclick="showUserCard('${visitor.id}')"><span class="badge badge-warning"><i class="fas fa-id-card-alt"></i> Imprimir gafete</span></button></td>
            </tr>`;
            }
          });
          document.getElementById('table-content').innerHTML = tableContent;
          document.getElementById('today-visitors').innerHTML = todayVisitors;
          document.getElementById('day-and-month').innerHTML = todayDay[0];
          document.getElementById('year').innerHTML = todayDate.slice(6, 10);
          document.getElementById('interview-motive').innerHTML = interviewMotive;
          document.getElementById('personal-motive').innerHTML = personalMotive;
          document.getElementById('meeting-motive').innerHTML = meetingMotive;
          document.getElementById('class-motive').innerHTML = classMotive;

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
  document.getElementById('table2').style.display = 'table';
  document.getElementById('table3').style.display = 'none';
  document.getElementById('chart1').style.display = 'none';
  const elements = document.getElementsByClassName('table0');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
  let db = firebase.firestore();
  let tableContent = '';
  let i = 1;
  db.collection('Co-Workings').get()
    .then(result => {
      result.forEach(host => {
        tableContent += `<tr>
        <th scope="row" class="text-center">${i++}</th>
        <td class="text-center">${host.data().Agencia}</td>
        <td class="text-center">${host.data().Teléfono}</td>
        <td class="text-center">${host.data().email}</td>
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
  document.getElementById('table3').style.display = 'table';
  document.getElementById('chart1').style.display = 'none';
  const elements = document.getElementsByClassName('table0');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
  let db = firebase.firestore();
  let tableContent = '';
  let i = 1;
  db.collection('host').get()
    .then(result => {
      result.forEach(host => {
        tableContent += `<tr>
        <th scope="row" class="text-center">${i++}</th>
        <td class="text-center">${host.data().name}</td>
        <td class="text-center">${host.data().email}</td>
        <td class="text-center">${host.data().agencia}</td>
      </tr>`
      });
      document.getElementById('table-content3').innerHTML = tableContent;
    })
    .catch(error => {
      console.log('Error', error);
    })
}

window.drawAnalytics = () => {
  document.getElementById('table1').style.display = 'none';
  document.getElementById('table2').style.display = 'none';
  document.getElementById('table3').style.display = 'none';
  document.getElementById('chart1').style.display = 'block';
  const elements = document.getElementsByClassName('table0');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'block';
  }
  let db = firebase.firestore();
  let totalVisitors = 0;
  let interviewMotive = 0;
  let classMotive = 0;
  let personalMotive = 0;
  let meetingMotive = 0;
  const todayDate = getRegisterDate();
  const todayDay = getDay(todayDate);

  db.collection('visitors').get()
    .then(result => {
      result.forEach(visitor => {
        totalVisitors++;
        if (visitor.data().userMotive === 'Personal') {
          personalMotive++;
        }
        if (visitor.data().userMotive === 'Clase') {
          classMotive++;
        }
        if (visitor.data().userMotive === 'Reunión') {
          meetingMotive++;
        }
        if (visitor.data().userMotive === 'Entrevista') {
          interviewMotive++;
        }
      });
      document.getElementById('today-visitors').innerHTML = totalVisitors;
      document.getElementById('day-and-month').innerHTML = todayDay[1];
      document.getElementById('year').innerHTML = todayDate.slice(6, 10);
      document.getElementById('interview-motive').innerHTML = interviewMotive;
      document.getElementById('personal-motive').innerHTML = personalMotive;
      document.getElementById('meeting-motive').innerHTML = meetingMotive;
      document.getElementById('class-motive').innerHTML = classMotive;
    })
  drawChart1();
}

window.drawChart1 = () => {
  const canva = '<canvas id="myChart1"></canvas>';
  document.getElementById('chart1').innerHTML = canva;
  let ctx = document.getElementById('myChart1').getContext('2d');
  let db = firebase.firestore();
  let monday = 0;
  let tuesday = 0;
  let wednesday = 0;
  let thursday = 0;
  let friday = 0;
  let saturday = 0;
  let sunday = 0;
  db.collection('visitors').get()
    .then(response => {
      response.forEach(visitor => {
        let dayOfWeek = getDay(visitor.data().date);
        if (dayOfWeek[2] === 'Lunes') {
          monday++;
        }
        if (dayOfWeek[2] === 'Martes') {
          tuesday++;
        }
        if (dayOfWeek[2] === 'Miércoles') {
          wednesday++;
        }
        if (dayOfWeek[2] === 'Jueves') {
          thursday++;
        }
        if (dayOfWeek[2] === 'Viernes') {
          friday++;
        }
        if (dayOfWeek[2] === 'Sábado') {
          saturday++;
        }
        if (dayOfWeek[2] === 'Domingo') {
          sunday++;
        }
      })
      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
          datasets: [{
            label: "Días con más visitas",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [monday, tuesday, wednesday, thursday, friday, saturday, sunday],
          }]
        }
      });
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

window.getDay = (todayDate) => {
  const day = todayDate.slice(0, 2);
  const moth = todayDate.slice(3, 5);
  const year = todayDate.slice(6, 10);
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const moths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"];
  const newDay = new Date(moth + ' ' + day + ', ' + year + ' 12:00:00');
  const newDate = [`${days[newDay.getUTCDay()]} ${day} de ${moths[newDay.getMonth()]}`, `${moths[newDay.getMonth()]}`, `${days[newDay.getUTCDay()]}`];
  return newDate;
}

window.signOut = () => {
  firebase.auth().signOut()
    .then(element => {
      location.href('AdminLogin.html');
    }).catch(error => {
      console.log('Error al cerrar sesión');
    });
}