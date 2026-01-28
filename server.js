const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// --- ESTO ES LO QUE ARREGLA EL FALLO ---
app.use(cors({
    origin: '*', // Permite que cualquier web (como tu Netlify) le envíe órdenes
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marquezchinchons@gmail.com',
        pass: 'ooyo cheh xnzf wraf' // Tu código de 16 letras de Google
    }
});

app.post('/confirmar', (req, res) => {
    const { email, name, date, time } = req.body;
    console.log("Intentando enviar correo a:", email); // Esto saldrá en la consola de Docker

    const mailOptions = {
        from: 'LA JUNQUERA <tu-correo@gmail.com>',
        to: email,
        subject: '✅ Reserva Confirmada - LA JUNQUERA',
        html: `<h1>¡Hola ${name}!</h1><p>Tu reserva para el ${date} a las ${time} está confirmada.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error de Nodemailer:", error);
            res.status(500).json({ error: 'Error al enviar' });
        } else {
            res.status(200).json({ message: 'Email enviado' });
        }
    });
});

app.listen(3000, () => console.log('Servidor listo y con CORS abierto en el puerto 3000'));