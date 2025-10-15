# Build script para Windows PowerShell

Write-Host "🚀 Preparando build para Render..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Verificar que existe package.json
if (-not (Test-Path "package.json")) {
    Write-Host "❌ No se encontró package.json" -ForegroundColor Red
    exit 1
}

# Verificar dependencias
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
npm list --depth=0

# Verificar archivos principales
Write-Host "📁 Verificando archivos principales..." -ForegroundColor Yellow
$files_to_check = @("server.js", "index.html", "lista.html", "styles.css", "script.js", "data.js")

foreach ($file in $files_to_check) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Falta $file" -ForegroundColor Red
        exit 1
    }
}

# Verificar que no hay errores de sintaxis en JavaScript
Write-Host "🔍 Verificando sintaxis JavaScript..." -ForegroundColor Yellow
try {
    node -c server.js
    Write-Host "✅ server.js sintaxis OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en server.js" -ForegroundColor Red
    exit 1
}

try {
    node -c script.js
    Write-Host "✅ script.js sintaxis OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en script.js" -ForegroundColor Red
    exit 1
}

try {
    node -c data.js
    Write-Host "✅ data.js sintaxis OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en data.js" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build verification completado!" -ForegroundColor Green
Write-Host "🌐 Listo para deploy en Render" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. git add ." -ForegroundColor White
Write-Host "2. git commit -m 'Deploy: Sistema Aduana v1.0'" -ForegroundColor White
Write-Host "3. git push origin main" -ForegroundColor White
Write-Host "4. Configurar en Render.com" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Configuración Render:" -ForegroundColor Yellow
Write-Host "- Build Command: npm install" -ForegroundColor White
Write-Host "- Start Command: npm start" -ForegroundColor White
Write-Host "- Node Version: >= 18" -ForegroundColor White
Write-Host "==================================" -ForegroundColor Cyan