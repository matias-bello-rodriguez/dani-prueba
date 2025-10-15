const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal - redirigir a index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para la lista
app.get('/lista', (req, res) => {
    res.sendFile(path.join(__dirname, 'lista.html'));
});

// Health check para Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 ===================================');
    console.log('📦 Sistema de Aduana iniciado');
    console.log('🌐 URL: http://localhost:' + PORT);
    console.log('📝 Formulario: http://localhost:' + PORT);
    console.log('📋 Lista: http://localhost:' + PORT + '/lista');
    console.log('🛑 Para detener: Ctrl + C');
    console.log('🚀 ===================================');
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n💤 Cerrando servidor...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n💤 Cerrando servidor...');
    process.exit(0);
});