# Project 2

Web Programming with Python and JavaScript

Al iniciar la aplicación solicita un nombre de usuario y una vez ingresado el user enruta a una pagina donde puede crear un canal 
o seleccionar un canal existente en la barra de navegación.

Una vez creado el canal o elegido desde la barra de navegación la aplicación enruta hacia la pagina del canal donde están guardados 
los mensajes de la conversación y donde podrá compartir mensajes de textos con las personas que estén dentro del canal.

En login.html toma el nombre de usuario y lo almacena en una lista, para que nadie pueda usar ese nombre mientras haya una persona activa con ese user. Además contiene un script que almacena ese nombre d eusuario en el local storage, para que de esta forma, a la hora de que se emita un mensaje desde socket.io, el navegador sepa que el mensaje que se está mandando es propio y no de otra persona, condicionando que el mesaje enviado con el nombre de usuario que contenga ese mensaje en el emit desde flask, conicida con el nombre de usuario en el local storage.

En index.html creamos nuestro canal, y gracias a flask, una vez creado el canal o seleccionado desde el navbar, dirige al usuario a la sala de chat. El canal se almacena en una lista de python, para que valide que nadie puede crear nuevamente ese canal si ya existe.

Finalmente está channel.html, en el está contenido un estilo agradable de una sala de chat, donde los usuarios pueden intercambiar mensajes en tiempo real y si acaso se salen de la sala de chat y vuelven a entrar, podrán observar los mensajes anteriormente enviados ya que estos mensajes quedan almacenados en un diccionario en el servidor, que a lo mucho podrá almacenar hasta 100 mensajes.


