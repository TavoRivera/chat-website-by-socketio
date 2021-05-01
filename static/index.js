document.addEventListener('DOMContentLoaded', () => {
// conectar al web socket
  var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', () => {
        // notifica al servidor una nueva conexión
     // socket.emit('conectado');
      
        document.querySelector('#submit').disabled = true;

        // Enable button only if there is text in the input field
        document.querySelector('#task').onkeyup = () => {
            if (document.querySelector('#task').value.length > 0)
                document.querySelector('#submit').disabled = false;
            else
                document.querySelector('#submit').disabled = true;
        };
      
       document.querySelector('#new-task').onsubmit = () => {

            const mensaje = document.querySelector('#task').value;
            // Add new item to task list
            // document.querySelector('#tasks').append(li);

            // Clear input field and disable button again
            document.querySelector('#task').value = '';
            document.querySelector('#submit').disabled = true;
            socket.emit('submit mensaje', {'mensaje': mensaje});
            // Stop form from submitting
            return false;
        };
            

    });
  
        socket.on('announce mensaje', data => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${data.user}:</b> ${data.mensaje}`;
        document.querySelector('#tasks').append(li);
    });

});   

 
    




