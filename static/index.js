document.addEventListener('DOMContentLoaded', () => {
// conectar al web socket
  var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port);
    socket.on('connect', () => {
        // notifica al servidor una nueva conexión
        socket.emit('join');
        
        document.querySelector('#submit').disabled = true;

        // habilita el botón solo si hay texto en el campo de entrada
        document.querySelector('#task').onkeyup = () => {
            if (document.querySelector('#task').value.length > 0)
                document.querySelector('#submit').disabled = false;
            else
                document.querySelector('#submit').disabled = true;
        };
        
        // toma el valor de entrada en el input del mensaje cuando se suba
        document.querySelector('#new-task').onsubmit = () => {

            const mensaje = document.querySelector('#task').value;

            // Clear input field and disable button again
            document.querySelector('#task').value = '';
            document.querySelector('#submit').disabled = true;
            socket.emit('submit mensaje', {'mensaje': mensaje});
            // Stop form from submitting
            return false;
        };
        
    });
 

        // la animación se ejecuta por cada submit de mensajes
    $('#submit').on('click',function()
    {
        //Fijo el scroll al fondo usando añadiendo una animación (animate)
        $(".chats").animate({ scrollTop: $('.chats').prop("scrollHeight")}, 800);
    });

    // cuando se detecte una conexión, notificar en la sala que ese usuario ha ingresado
    socket.on('joined', data => {
        const li = document.createElement('li');
        li.className = 'list'
        li.innerHTML = `<b>${data.mensaje}`;
        document.querySelector('#tasks').append(li);
        console.log("aca si");
        localStorage.setItem('last_channel', data.canal)
    });
        

  // recibe los datos desde el servidor para luego imprimirlos dentro de una etiqueta li a continuación creada
    socket.on('announce mensaje', data => {
        let local = localStorage.getItem("localuser")
        console.log(local)
        const li = document.createElement('li');
        // si el usuario del mensaje enviado desde el servidor no coincide con el usuario propio del navegador
        if (data.user != local) {
            // creamos una clase que identifique el mensaje como de otra persona
            li.className = 'client-chat'
        }  
        else {
            // sino creamos otra clase que identifique el mensaje como propio 
            li.className = 'my-chat'
        }
            
        li.innerHTML = `<b>${data.user}:</b> ${data.mensaje} --- ${data.tiempo} `;
        document.querySelector('#tasks').append(li);
        // agrega animación por cada chat enviado por otra persona
        $(".chats").animate({ scrollTop: $('.chats').prop("scrollHeight")}, 800);
    });

});   
