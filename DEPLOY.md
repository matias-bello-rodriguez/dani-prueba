# Sistema de Aduana Simple - Deploy

## Variables de Entorno Requeridas

No se requieren variables de entorno especiales para esta aplicación.

## Comandos de Build

```bash
npm install
```

## Comando de Start

```bash
npm start
```

## Health Check

La aplicación incluye un endpoint de health check en `/health`

## Puerto

La aplicación usa `process.env.PORT` automáticamente (requerido por Render)