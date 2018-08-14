# Registro de visitantes

## Preámbulo

El registro de visitantes en una empresa en América Latina es un proceso tedioso y manual. Lo común es que una persona esté en la recepción tomando nota - a veces con papel y lápiz - de cada visitante. Por razones de seguridad, usualmente piden a cada visitante dejar una identificación. Si vivimos en la era digital, ¿por qué seguimos registrando visitantes como si fuera 1985? ¿Qué tal si sustituimos a la persona en recepción por una tablet? ¿Qué tal si en lugar de pedir una identificación, tomamos una foto? ...

## Introducción

En este proyecto la empresa de coworking donde opera Laboratoria en tu ciudad ha decidido contratarte a ti y a dos compañeras para reinventar su proceso de registro de visitantes. Con la entrada de al mercado latinoamericano, tienen mucha más competencia y necesitan invertir en tecnología para mejorar su servicio; el registro de visitantes es un primer acercamiento. Te dan la referencia de [Evoy](https://envoy.com/) en EEUU (un servicio que ofrece un sistema digital de registro de visitantes) y ustedes tienen que desarrollar una versión mínima viable (ver anexo I abajo).

## Objetivos de aprendizaje

El objetivo principal de este proyecto es que pongas en práctica todo lo
aprendido durante el common core, con foco en la calidad, trabajando en un
equipo multifuncional y presentando tu solución a una audiencia.

## Consideraciones generales

Para completar este proyecto deberás trabajar en un equipo de tres y seguir las
siguientes consideraciones:

### 1. Planificación y organización

#### Roles, squad multifuncional

Cada integrante del equipo debe asumir alguno de los siguientes "roles" (\*),
liderando las siguientes áreas de trabajo:


**Diseñadora UX**

*Nallely Bravo Rodríguez*

   * Diseñar la experiencia de la aplicación (flujo, interacción, etc.).
   * Identificar, documentar y priorizar las historias de usuario.
   * Crear el diseño visual de la interfaz.

**Desarrolladoras Front-end**

*Brenda Paola Sánchez Reyes.*
*Michele Velázquez de la Rosa Becerra.*

   * Implementar la interfaz de usuario diseñada (HTML/CSS/JS).
   * Deben dividirse las funcionalidades entre las dos desarrolladoras.
   * Todas los desarrollos deben incluir pruebas unitarias.

El rol de Product Manager es asumido por Nallely Bravo pero igualmente, las responsabilidades de gestionar las actividades son discutidas con Brenda Sánchez y Michele Velázquez en los dailys diarios (9:00am) además de asignadas y compartidas entre todas las integrantes.

### 1.-Planificación inicial

Se dividio el trabajo en pequeñas tareas las cuales se fueron resolviendo en orden de prioridad.
En principio tenemos que diferenciar a los usuarios que se verán involucrados en el uso del portal de registro.
Existen 2 usuarios que serán involucrados en el uso de la interfaz el primer usuarios es el recepcionista o el administrador de la entrada del coworking y el otro usuario involucrado es el visitante.  
Una vez que se han identificado quienes serán los usuarios, se crea la primera estretegìa de planeación, Se tiene que generar un ingreso con autenticación para los recepcionistas o administradores del coworking.
Además se debe generar la base de datos de las agencias del coworking, así mismo se crea una base de datos para el registro de los visitantes.
Como parte importante del desarrollo se busca implementar que el visitante al ingresar sus datos se tome una foto como medida de seguridad y quedará su registro en el dashboasrd del recepcionista, hasta que registre su salida del coworking.
Otra implementación a la que se pretende es que al llegar al coworking el visitante ingrese sus datos y reciba un email en el que se le invite a pasar a la sala de espera en lo que se autoriza su ingreso a la agencia que visita.

### 2. Detalles sobre la implementación
Para crear el dashboard de la recepción se uso el servicio de Firebase, para generar la base de datos utilizamos el servicio de Firestore Cloud, se trabajo el servicio de Autenticación de Firebase. Se utilizó Boostrap para la maquetación de la interfaz. Se trabajo el servicio de mensajes de confirmación con EmailJS.

#### Tecnologías
**Github:** Es una plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git. Es donde se aloja nuestro proyecto y por donde compartimos nuestro trabajo.

**GitKraken**: Es una potente interfaz gráfica multiplataforma para git. Es muy intuitiva de usar y ayuda a llevar un seguimiento de los repositorios, ver la actividad de todos los integrantes, dar commits, fetch sin necesidad de la consola, entre otras cosas. Decidimos acercarnos a esta interfaz ya que fue una recomendación de un experto en un evento de Git (comentó que en muchos trabajos están utilizando esta interfaz)  al que asistió Brenda, y creemos que es importante tener conocimiento de las diferentes opciones que te solicitarán en un espacio de trabajo.

**Google Drive:** Creamos una nueva cuenta de correo *cowdevelop@gmail.com* para ligarla con los mensajes que van dirigidos a los visitantes cuando se registran y también para poder utilizar su plataforma de espacio libre en Drive para linkear videos, o audios.

**Procesadores de textos:** *Visual Studio, Sublime y Atom.*
 Utilizamos distintos tipos de procesadores de texto para poder crear la sintaxis de los archivos HTML/JS/CSS, así como la sintaxis markdown para documentar el proceso de desarrollo.

**Bootstrap:** Es un framework originalmente creado por Twitter, que permite crear interfaces web con CSS y JavaScript, cuya particularidad es la de adaptar la interfaz del sitio web al tamaño del dispositivo en que se visualice (responsive). Utilizamos bootstrap pues creemos que es el que nos da mayor versatilidad en cuanto a adaptar un diseño y movimientos de los elementos en la interfaz.
Firebase:

**Trello:** Es una herramienta de gestión de proyectos que hace que la colaboración sea sencilla y dinámica. Nosotras decidimos no utilizar un canvas físico y trasladar todo nuestro sprint planning al trello.

**Sketch app:** Es una aplicación para la computadora que te permite maquetar tus diseños de interface de una forma similar que Adobe Ilustrator. En este proyecto utilizamos Sketch para el proceso de diseño de las dos interfaces, la del dashboard y la de el registro de visitas.

**Adobe Ilustrator:** Es un programa de vectores para ilustraciones y maquetaciones que van a digital o a impresión. En este caso se usó el programa como apoyo en el diseño de las interfaces, diseño de imagen corporativa del proyecto y maquetación inicial.

**Adobe Photoshop:** Es un programa de edición de foto e ilustración digital. Utilizamos Photoshop para crear o editar las imágenes necesarias para la implementación de la plataforma, así como para la implementación de los prototipos.

**Marvel app:** Aplicación wep util para la implementación de prototipos que se pueden compartir por medio de una URL y así facilitar el proceso de testeo. Compatible con la plataforma Sketch app.



#### Organización:
(Estructura de ficheros de Bedrock, un boilerplate)

Explicar las Funciones implementadas.

### 3. Investigación y planteamiento de hipótesis User Research

#### Hipótesis
El primer acercamiento al problema partió desde nuestra propia experiencia e indagatoria, ya que pasamos nuestra mayor parte del tiempo en los espacios que ocupa Laboratoria en el coworking TERMINAL 1, solemos observar diariamente los diferentes tipos de persona que se alojan en un espacio como este, además de tener algunas experiencias propias al respecto.
Conforme a esta plática inicial surgieron las siguientes hipótesis:

1. En México, casi cualquier lugar que requiera un registro de visitantes, tiene resuelta pobremente la situación con un libro de visitas donde los usuarios garabatean sus nombres e intenciones, no siempre siendo sinceros o correctos por diferentes razones, enumeramos unas cuantas:
 * Prisa
 * El hartazgo que da ese tipo de tramites para entrar a un espacio.
 * Ser Graciosos.
 * Que el usuario no le interesa el control de la seguridad del lugar.
 * Piensa cometer un delito.

2. El producto no va dirigido a un sólo usuario.
De hecho identificamos al menos 3 usuarios: *“El visitante”*, *“Recepcionista”* y quien está ocupando un espacio en el coworking, para efectos de esta investigación lo llamaremos *“Anfitrión”*.

3. Dentro del mismo desmembramiento del problema, e imaginándonos posibles dolencias y satisfacciones de registrarse caímos en cuenta que podíamos englobar a nuestros usuarios visitantes en 4 diferentes situaciones:
  * *Con registro previo (hecho en línea) y con cita.*
  * *Con registro previo (hecho en línea) y sin cita.*
  * *Sin registro previo pero con una cita a una hora determinada. El usuario tiene que llegar y registrarse y pasar a ver a su anfitrión.*
 * *Sin registro previo y sin ninguna cita. El usuario tiene que registrarse y es probable que al no haber hecho un espacio previamente en su agenda, el anfitrión no pueda atenderle en ningún momento.*

4. En el área de recepción destacamos dos tipos de perfiles:
 * La (casi siempre) mujer joven que cada que alguien llega al mostrador ella le pregunta qué necesita y toma sus datos o
 * el miembro de seguridad (casi siempre hombre) que le pide a los visitantes que se registren.
5. Anfitrión: Este usuario también tiene sus diferentes variantes dentro del universo coworking
 * Marca de prestigio con un área de trabajo habitando ese coworking (aprox 6 miembros)
 * Startup (3 a 6 miembros)
 * Freelance (miembro en solitario.
6.- CoWorking: Pensando en todos los diferentes perfiles de usuario caímos en cuenta que el lugar dónde ocurre el registro también es perfilable, es un ente que tiene que dar servicio a los 3 tipos de usuario anteriores (con sus variantes) además de mantener las instalaciones funcionales.

Al ubicar todas estas variables, decidimos dirigir nuestros esfuerzos a solucionar los problemas del último usuario principalmente, ya que al final del día él es quien tomará la decisión de adquirir o no nuestro producto.

#### Historias de usuario
Creemos que entre más cerremos el target a donde va dirigido nuestro negocio, más efectivo puede ser nuestro mensaje, es por eso que hemos definido que nuestro producto, aunque tiene que solucionar necesidades de los 3 distintos de usuarios que van a interactuar con él, principalmente nos enfocaremos en las dolencias y problemas del Coworking.

** *El usuario quiere* **:

	* Agilizar la entrada y salida de personas sin perder control y seguridad.
	* Tener registro de las personas que acceden.
	* Poder consultar ése registro de forma ágil.
	* Brindarle a sus contratantes información clara de quién los visita.
	* Brindarle información instantánea a sus contratantes (los anfitriones) de cuando llegan visitantes que pidan por ellos.
	* Obtener información que les ayude a mejorar sus servicios de acuerdo a las necesidades que están pasando actualmente en el lugar.
	* Obtener información que le ayude a mejorar su infraestructura de acuerdo a las necesidades latentes de sus contratantes (los anfitriones).
	* Dar una apariencia de estar a la vanguardia.**

#### Cliente incógnito.
Pudimos visitar tres distintos coWorkings, uno dentro del área Roma Centro de la CDMX, que es muy popular para estos negocios, y otro en el Estado de México, ubicado en Ciudad Satélite.

Las entrevistas como *cliente incógnito* nos revelaron situaciones mucho más sinceras a que si hubiéramos ido directamente con los usuarios y revelado nuestras intenciones ya que nuestro producto también abarca una dolencia al respecto de la seguridad de los establecimientos.

##### Protocolo de entrevista:

Llegamos interpretando una startup que busca un espacio para 3 a 5 personas con posibilidad de incrementar el número después, así que estábamos abiertas a comenzar con un espacio comunitario pero estábamos interesadas en una oficina por motivos de seguridad (la idea es que se notara que abiertamente nos preocupaba mucho).

**Preguntas**:

   * ¿Cómo es el acceso ya que eres un inquilino del coworking?
   * ¿Se les da acceso a visitantes en áreas de trabajo para los inquilinos?
   * ¿Cómo es el acceso de visitantes?
   * ¿Hay áreas para atender mis visitas?
   * ¿Cómo me comunican que llegaron mis visitas?

**Cow**

  * Sigue teniendo la entrada con persona de seguridad al frente.
  * Sigue teniendo cuaderno de visitas.
  * Te piden identificación al entrar.
  * Identifican a los visitantes con un gafete.
  * Un miembro de seguridad está al pendiente para acompañarte a la salida cuando te retires.

![Cow](https://raw.githubusercontent.com/SakuraBravo/proyecto-5-coworking-developer/master/src/img/cow-research01.JPG)
![Cow](https://raw.githubusercontent.com/SakuraBravo/proyecto-5-coworking-developer/master/src/img/cow-research02.JPG)

La señora que nos atendió remarcaba mucho el hecho de que es un coworking digital, y que están en remodelación, también nos comentó que estaban en proceso de cambiar su registro de entrada a una app que te envía mensaje cuando tienes una visita (intuyo que se refieren a Envoy).


**Capital Coworking**

  * Tienen a una persona en recepción para tomar tus datos (sólo el nombre.
  * No tienen cuaderno de visitas.
  * No te piden identificación al entrar.
  * No tienen manera de identificar a los visitantes y el control de entradas y salidas es a consideración de la persona en la puerta.
  * Te advierten que estés al pendiente de tus cosas.
![cow](https://raw.githubusercontent.com/SakuraBravo/proyecto-5-coworking-developer/master/src/img/capitalcoworking01.JPG)


* Análisis de productos en el mercado
* Benchmark
* Insights
* Proto Persona

### 4. Diseño User Experience

#### Wireframes baja fidelidad


#### Wireframes de media fidelidad

[Arquitectura Dashboard](https://raw.githubusercontent.com/SakuraBravo/proyecto-5-coworking-developer/master/src/img/arqDashMedia.jpg)

#### Testeo de flujo.

#### Flujo final

#### Mockups de alta fidelidad
#### Arquitectura del sitio.
#### Pruebas de usabilidad con prototipo de alta fidelidad.
#### Insights de las pruebas de usabilidad.
