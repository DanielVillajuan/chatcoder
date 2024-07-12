import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import ViewRouters from './routes/viewsRouters.route.js';
import { Server } from 'socket.io';

const app = express();
const PORT = 8080 // esto deberia de ser un valor desde la variable de entorno

app.engine('handlebars', handlebars.engine()); // especifico que motor de plantilla vamos
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/',ViewRouters);

const httpServer = app.listen(PORT, () => {
    console.log('Listo el server http');
})

const io = new Server(httpServer);
const conversacion = [];
const usuarios = [];

io.on('connection', (socket) => {

    socket.on('mensaje',(data) => {
        conversacion.push(data);
        io.emit('conversacion', conversacion);
    })
    
    socket.on('nuevoUsuario', (usuario) => {
        socket.emit('conversacion', conversacion);
    })

})
