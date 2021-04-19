document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect('http//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        socket.send("connected now!");
    });
    socket.on('message', sata => {
        console.log(`mensaje recibido: ${data}`);
    })

})
