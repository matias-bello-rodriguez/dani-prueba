#!/bin/bash

echo "🚀 Preparando build para Render..."
echo "=================================="

# Verificar que existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json"
    exit 1
fi

# Verificar dependencias
echo "📦 Verificando dependencias..."
npm list --depth=0

# Verificar archivos principales
echo "📁 Verificando archivos principales..."
files_to_check=("server.js" "index.html" "lista.html" "styles.css" "script.js" "data.js")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Falta $file"
        exit 1
    fi
done

# Verificar que no hay errores de sintaxis en JavaScript
echo "🔍 Verificando sintaxis JavaScript..."
node -c server.js && echo "✅ server.js sintaxis OK" || (echo "❌ Error en server.js" && exit 1)
node -c script.js && echo "✅ script.js sintaxis OK" || (echo "❌ Error en script.js" && exit 1)
node -c data.js && echo "✅ data.js sintaxis OK" || (echo "❌ Error en data.js" && exit 1)

echo ""
echo "✅ Build verification completado!"
echo "🌐 Listo para deploy en Render"
echo ""
echo "📋 Próximos pasos:"
echo "1. git add ."
echo "2. git commit -m 'Deploy: Sistema Aduana v1.0'"
echo "3. git push origin main"
echo "4. Configurar en Render.com"
echo ""
echo "🔧 Configuración Render:"
echo "- Build Command: npm install"
echo "- Start Command: npm start"
echo "- Node Version: >= 18"
echo "=================================="