# 🚀 Guía de Deploy en Render

## 📋 Preparación para Deploy

### ✅ Archivos Listos para Deploy:
- `server.js` - Servidor Express optimizado para producción
- `package.json` - Con engines y scripts configurados
- `Procfile` - Para especificar cómo ejecutar la app
- `.gitignore` - Para excluir archivos innecesarios
- Todos los archivos estáticos (HTML, CSS, JS)

## 🌐 Pasos para Deploy en Render

### 1. Preparar Repositorio Git

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Deploy: Sistema de Aduana Simple v1.0"

# Conectar con repositorio remoto (GitHub, GitLab, etc.)
git remote add origin https://github.com/tu-usuario/aduana-simple.git
git branch -M main
git push -u origin main
```

### 2. Configurar en Render

1. **Ir a Render.com** y hacer login
2. **Crear nuevo Web Service**
3. **Conectar repositorio Git**
4. **Configurar el servicio:**

#### Configuración del Servicio:
- **Name**: `aduana-simple`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` o el más cercano
- **Branch**: `main`
- **Root Directory**: Dejar vacío (raíz del repo)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### Variables de Entorno:
No se requieren variables especiales.

#### Plan:
- **Free Tier** está perfecto para esta aplicación

### 3. Deploy Automático
Una vez configurado, Render:
- ✅ Clonará tu repositorio
- ✅ Ejecutará `npm install`
- ✅ Iniciará con `npm start`
- ✅ Proporcionará una URL pública

## 🔧 Configuración Técnica

### Especificaciones:
- **Node.js**: >= 18.0.0
- **Puerto**: Dinámico (process.env.PORT)
- **Health Check**: `/health` endpoint
- **Archivos Estáticos**: Servidos por Express

### Comandos Importantes:
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start

# Build (no necesario, solo archivos estáticos)
npm run build
```

## 📁 Estructura Final del Proyecto

```
aduana-simple/
├── .gitignore              # Archivos a ignorar
├── DEPLOY.md               # Instrucciones de deploy
├── Procfile                # Configuración para Render
├── README.md               # Documentación
├── package.json            # Dependencias y scripts
├── server.js               # Servidor Express
├── index.html              # Formulario principal
├── lista.html              # Lista de mercancías
├── styles.css              # Estilos
├── script.js               # Funcionalidad JavaScript
└── data.js                 # Datos hardcodeados
```

## 🎯 URL de la Aplicación

Una vez deployada, tendrás:
- **URL Principal**: `https://aduana-simple.onrender.com`
- **Formulario**: `https://aduana-simple.onrender.com/`
- **Lista**: `https://aduana-simple.onrender.com/lista`
- **Health Check**: `https://aduana-simple.onrender.com/health`

## 🔄 Actualizaciones

Para actualizar la aplicación:
1. Hacer cambios en el código
2. Commit y push a GitHub
3. Render automáticamente redeploya

```bash
git add .
git commit -m "Actualización: [descripción del cambio]"
git push origin main
```

## 🐛 Troubleshooting

### Errores Comunes:
1. **Puerto en uso**: El servidor usa `process.env.PORT` automáticamente
2. **Archivos no encontrados**: Verificar que todos los archivos estén en el repo
3. **Build falla**: Verificar que `package.json` tenga las dependencias correctas

### Logs en Render:
- Ve a tu servicio en Render
- Usa la pestaña "Logs" para ver errores
- El health check en `/health` ayuda a verificar que todo funciona

## ✨ Características en Producción

- ✅ Formulario de registro de mercancías
- ✅ Lista interactiva con filtros
- ✅ Generación de PDF con QR
- ✅ Simulación de datos QR
- ✅ Diseño responsive
- ✅ 6 mercancías de ejemplo
- ✅ Interfaz moderna y profesional

¡Tu aplicación estará lista para usar en producción! 🎉