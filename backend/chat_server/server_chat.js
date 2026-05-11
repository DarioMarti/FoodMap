const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodmap'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    socket.on('unirse', (usuario_id) => {
        socket.join(`usuario_${usuario_id}`);
        console.log(`Usuario ${usuario_id} unido a su sala privada`);
    });

    socket.on('enviar_mensaje', (data) => {
        const { contenido, emisor_id, receptor_id, grupo_id } = data;

        const query = 'INSERT INTO mensaje (Contenido, Usuario_id, Usuario_receptor_id, Grupo_id) VALUES (?, ?, ?, ?)';
        db.query(query, [contenido, emisor_id, receptor_id, grupo_id], (err, result) => {
            if (err) {
                console.error('Error al guardar mensaje:', err);
                return;
            }

            if (grupo_id) {
                io.to(`grupo_${grupo_id}`).emit('nuevo_mensaje', data);
            } else {
                io.to(`usuario_${receptor_id}`).emit('nuevo_mensaje', data);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor de chat corriendo en http://localhost:${PORT}`);
});
