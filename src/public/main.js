console.log('Js del cliente')
const title = document.querySelector('#title-welcome');
const chatBox = document.querySelector('#send');
const socket = io();
let user = '';

Swal.fire({
    title:'Ingrese nickname',
    input: 'text',
    text: 'Para ingresar al chat identificarse',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'Che ingresa un nombre capo'
    }
}).then((result)=>{
    console.log(result.value) // obtengo el valor del input que paso la validacion
    user = result.value
    title.innerText = 'Bienvenido al chat ' + user
    socket.emit('newUsers',{ user });
})


chatBox.addEventListener('keyup',(event) => {
    if(event.key === 'Enter'){
        console.log('HOLA')
        socket.emit('mensaje',{ user, mensaje: event.target.value })
        chatBox.value = ''
    }
})

socket.on('conversacion',(data) => {
    const contenedorChat = document.querySelector('#contenedor-chat');
    contenedorChat.innerHTML = ''
    data.forEach(chat => {
        const div = document.createElement('div');
        const nombre = document.createElement('p');
        const mensaje = document.createElement('p');
        nombre.innerText = chat.user + ': ';
        nombre.classList.add('bold_name');
        mensaje.innerText = chat.mensaje;
        div.appendChild(nombre);
        div.appendChild(mensaje);
        contenedorChat.appendChild(div);
    })     
})
