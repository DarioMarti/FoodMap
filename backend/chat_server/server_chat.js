require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { promptAsistente } = require('./instrucciones_ia');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
        origin: "*", // Permitir peticiones desde cualquier origen (el VPS)
        methods: ["GET", "POST"]
    }
});

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: promptAsistente
});

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'foodmap'
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

    //Sistema de chat entre amigos
    socket.on('enviar_mensaje', (data) => {
        const { contenido, emisor_id, receptor_id } = data;

        const query = 'INSERT INTO mensaje (Contenido, Usuario_id, Usuario_receptor_id) VALUES (?, ?, ?)';
        db.query(query, [contenido, emisor_id, receptor_id], (err, result) => {
            if (err) {
                console.error('Error al guardar mensaje:', err);
                return;
            }

            io.to(`usuario_${receptor_id}`).emit('nuevo_mensaje', data);
        });
    });

    //Sistemade chat con el asistente IA
    socket.on('pregunta_asistente', async (data) => {
        try {
            // Iniciamos chat con el historial que mande el frontend (opcional)
            const chat = model.startChat({ history: data.historial || [] });
            const result = await chat.sendMessage(data.mensaje);
            const response = await result.response;

            // Enviamos la respuesta de vuelta solo a este socket
            socket.emit('respuesta_asistente', {
                texto: response.text(),
                fecha: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error en Gemini:", error);
            socket.emit('respuesta_asistente', {
                texto: "Ups, mi cerebro de IA está un poco cansado. Inténtalo de nuevo.",
                fecha: new Date().toISOString(),
                error: true
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor de chat corriendo en http://localhost:${PORT}`);
});
