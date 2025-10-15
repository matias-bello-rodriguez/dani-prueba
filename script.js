// Variables globales
let mercanciaActual = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'lista.html' || currentPage === '') {
        initListaPage();
    } else {
        initFormPage();
    }
});

// Inicializar página de formulario
function initFormPage() {
    const form = document.getElementById('mercanciaForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            mostrarMensaje('Mercancía registrada exitosamente', 'success');
            form.reset();
        });
    }
}

// Inicializar página de lista
function initListaPage() {
    cargarMercancias();
    actualizarEstadisticas();
    
    // Event listeners para filtros
    const searchInput = document.getElementById('searchInput');
    const filterEstado = document.getElementById('filterEstado');
    
    if (searchInput) {
        searchInput.addEventListener('input', filtrarYMostrarMercancias);
    }
    
    if (filterEstado) {
        filterEstado.addEventListener('change', filtrarYMostrarMercancias);
    }
    
    // Event listeners para modal
    const modal = document.getElementById('detalleModal');
    const closeButtons = document.querySelectorAll('.close, .close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', cerrarModal);
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Event listener para descargar PDF
    const descargarPDFBtn = document.getElementById('descargarPDF');
    if (descargarPDFBtn) {
        descargarPDFBtn.addEventListener('click', function() {
            if (mercanciaActual) {
                generarPDF(mercanciaActual);
            }
        });
    }
}

// Cargar y mostrar mercancías
function cargarMercancias() {
    const mercancias = getMercancias();
    mostrarMercancias(mercancias);
}

// Filtrar y mostrar mercancías
function filtrarYMostrarMercancias() {
    const termino = document.getElementById('searchInput')?.value || '';
    const estado = document.getElementById('filterEstado')?.value || '';
    
    const mercanciasFiltradas = filtrarMercancias(termino, estado);
    mostrarMercancias(mercanciasFiltradas);
}

// Mostrar mercancías en la grilla
function mostrarMercancias(mercancias) {
    const grid = document.getElementById('mercanciaGrid');
    if (!grid) return;
    
    if (mercancias.length === 0) {
        grid.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><p>No se encontraron mercancías</p></div>';
        return;
    }
    
    grid.innerHTML = mercancias.map(mercancia => `
        <div class="mercancia-card" onclick="abrirDetalle(${mercancia.nroOrden})">
            <div class="card-header">
                <span class="orden-badge">Orden #${mercancia.nroOrden}</span>
                <span class="estado-badge estado-${mercancia.estadoMercancias.toLowerCase()}">${mercancia.estadoMercancias}</span>
            </div>
            <div class="card-body">
                <h3><i class="fas fa-box"></i> ${mercancia.tipoMercancia}</h3>
                <div class="card-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${mercancia.localidad}</p>
                    <p><i class="fas fa-user"></i> ${mercancia.consignatario}</p>
                    <p><i class="fas fa-calendar"></i> ${formatearFecha(mercancia.fechaIngAlmacen)}</p>
                    ${mercancia.kgs > 0 ? `<p><i class="fas fa-weight"></i> ${mercancia.kgs} kg</p>` : ''}
                    ${mercancia.cajetillas > 0 ? `<p><i class="fas fa-cigarette"></i> ${mercancia.cajetillas} cajetillas</p>` : ''}
                </div>
                <div class="card-tags">
                    ${mercancia.propuestaDonacion ? '<span class="tag tag-donacion"><i class="fas fa-heart"></i> Donación</span>' : ''}
                    ${isProximoVencimiento(mercancia.fechaVencimiento) ? '<span class="tag tag-vencimiento"><i class="fas fa-exclamation-triangle"></i> Próximo a vencer</span>' : ''}
                </div>
            </div>
            <div class="card-footer">
                <button class="btn-small btn-primary" onclick="event.stopPropagation(); generarPDF(${JSON.stringify(mercancia).replace(/"/g, '&quot;')})">
                    <i class="fas fa-file-pdf"></i> PDF
                </button>
                <button class="btn-small btn-secondary" onclick="event.stopPropagation(); mostrarSimulacionQR(${JSON.stringify(mercancia).replace(/"/g, '&quot;')})">
                    <i class="fas fa-qrcode"></i> Simular QR
                </button>
                <button class="btn-small btn-info" onclick="abrirDetalle(${mercancia.nroOrden})">
                    <i class="fas fa-eye"></i> Ver más
                </button>
            </div>
        </div>
    `).join('');
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    const stats = getEstadisticas();
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = stats.total;
        statNumbers[1].textContent = stats.pendientes;
        statNumbers[2].textContent = stats.paraDonacion;
        statNumbers[3].textContent = stats.proximosAVencer;
    }
}

// Abrir modal con detalle
function abrirDetalle(nroOrden) {
    const mercancia = getMercanciaByOrden(nroOrden);
    if (!mercancia) return;
    
    mercanciaActual = mercancia;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="detalle-grid">
            <div class="detalle-section">
                <h4><i class="fas fa-info-circle"></i> Información Básica</h4>
                <div class="detalle-item"><strong>Nro. Orden:</strong> ${mercancia.nroOrden}</div>
                <div class="detalle-item"><strong>Fecha Ingreso:</strong> ${formatearFecha(mercancia.fechaIngAlmacen)}</div>
                <div class="detalle-item"><strong>Tipo Mercancía:</strong> ${mercancia.tipoMercancia}</div>
                <div class="detalle-item"><strong>Localidad:</strong> ${mercancia.localidad}</div>
                <div class="detalle-item"><strong>Estado:</strong> <span class="estado-badge estado-${mercancia.estadoMercancias.toLowerCase()}">${mercancia.estadoMercancias}</span></div>
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-calculator"></i> Cantidades</h4>
                ${mercancia.cajetillas > 0 ? `<div class="detalle-item"><strong>Cajetillas:</strong> ${mercancia.cajetillas}</div>` : ''}
                ${mercancia.kgs > 0 ? `<div class="detalle-item"><strong>Kilogramos:</strong> ${mercancia.kgs}</div>` : ''}
                ${mercancia.envasesBultos > 0 ? `<div class="detalle-item"><strong>Envases/Bultos:</strong> ${mercancia.envasesBultos}</div>` : ''}
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-user"></i> Consignatario</h4>
                <div class="detalle-item"><strong>Nombre:</strong> ${mercancia.consignatario}</div>
                <div class="detalle-item"><strong>RUT/DNI:</strong> ${mercancia.rutDni}</div>
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-car"></i> Vehículo</h4>
                <div class="detalle-item"><strong>Tipo:</strong> ${mercancia.tipoVehiculo}</div>
                <div class="detalle-item"><strong>Marca:</strong> ${mercancia.marca}</div>
                <div class="detalle-item"><strong>Modelo:</strong> ${mercancia.modelo}</div>
                <div class="detalle-item"><strong>Patente:</strong> ${mercancia.patente}</div>
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-file-invoice"></i> Documentación</h4>
                <div class="detalle-item"><strong>Nro. Oficio:</strong> ${mercancia.nroOficioOrd}</div>
                <div class="detalle-item"><strong>Boleta Retención:</strong> ${mercancia.boletaRetencion}</div>
                <div class="detalle-item"><strong>Acta Incautación:</strong> ${mercancia.actaIncaut}</div>
                <div class="detalle-item"><strong>Parte Policial:</strong> ${mercancia.nroPartePolicial}</div>
                <div class="detalle-item"><strong>NUE:</strong> ${mercancia.nue}</div>
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-warehouse"></i> Almacenamiento</h4>
                <div class="detalle-item"><strong>Ubicación:</strong> ${mercancia.ubicacionAlmacenaje}</div>
                <div class="detalle-item"><strong>Estado Decare:</strong> ${mercancia.estadoDecare}</div>
                <div class="detalle-item"><strong>Funcionario:</strong> ${mercancia.funcionarioDigitador}</div>
            </div>
            
            <div class="detalle-section">
                <h4><i class="fas fa-calendar-alt"></i> Fechas Importantes</h4>
                <div class="detalle-item"><strong>Fecha Vencimiento:</strong> ${mercancia.fechaVencimiento ? formatearFecha(mercancia.fechaVencimiento) : 'No especificada'}</div>
                <div class="detalle-item"><strong>Propuesta Donación:</strong> ${mercancia.propuestaDonacion ? 'Sí' : 'No'}</div>
            </div>
            
            ${mercancia.observaciones || mercancia.robos || mercancia.otrasObservaciones ? `
            <div class="detalle-section full-width">
                <h4><i class="fas fa-sticky-note"></i> Observaciones</h4>
                ${mercancia.observaciones ? `<div class="detalle-item"><strong>Observaciones:</strong> ${mercancia.observaciones}</div>` : ''}
                ${mercancia.robos ? `<div class="detalle-item"><strong>Robos:</strong> ${mercancia.robos}</div>` : ''}
                ${mercancia.otrasObservaciones ? `<div class="detalle-item"><strong>Otras Observaciones:</strong> ${mercancia.otrasObservaciones}</div>` : ''}
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('detalleModal').style.display = 'block';
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('detalleModal').style.display = 'none';
    mercanciaActual = null;
}

// Generar PDF con QR con datos completos de identificación
async function generarPDF(mercancia) {
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        // Generar identificador único para la mercancía
        const timestamp = new Date().getTime();
        const identificadorUnico = `ADU-${mercancia.nroOrden.toString().padStart(4, '0')}-${timestamp.toString().slice(-6)}`;
        
        // Datos completos para el QR (formato JSON para más información)
        const datosCompletos = {
            id: identificadorUnico,
            orden: mercancia.nroOrden,
            tipo: mercancia.tipoMercancia,
            consignatario: mercancia.consignatario,
            rut: mercancia.rutDni,
            fecha_ingreso: mercancia.fechaIngAlmacen,
            localidad: mercancia.localidad,
            estado: mercancia.estadoMercancias,
            peso_kg: mercancia.kgs,
            bultos: mercancia.envasesBultos,
            cajetillas: mercancia.cajetillas,
            ubicacion: mercancia.ubicacionAlmacenaje,
            vehiculo: `${mercancia.marca} ${mercancia.modelo} - ${mercancia.patente}`,
            acta: mercancia.actaIncaut,
            ente_regulador: mercancia.enteRegulador,
            funcionario: mercancia.funcionarioDigitador,
            vencimiento: mercancia.fechaVencimiento,
            donacion: mercancia.propuestaDonacion,
            generado: new Date().toISOString()
        };
        
        const infoQR = JSON.stringify(datosCompletos);
        
        // Generar QR code con más datos
        const qrCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCanvas, infoQR, { 
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
        });
        
        const qrDataURL = qrCanvas.toDataURL();
        
        // Configurar PDF - Header principal
        pdf.setFillColor(37, 99, 235); // Color azul
        pdf.rect(10, 10, 190, 15, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.text('ETIQUETA DE MERCANCÍA INCAUTADA', 105, 21, { align: 'center' });
        
        // Reset color
        pdf.setTextColor(0, 0, 0);
        
        // Identificador único destacado
        pdf.setFillColor(255, 243, 199);
        pdf.rect(10, 30, 190, 12, 'F');
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text(`ID: ${identificadorUnico}`, 105, 38, { align: 'center' });
        
        // Línea separadora
        pdf.setLineWidth(1);
        pdf.setDrawColor(37, 99, 235);
        pdf.line(10, 45, 200, 45);
        
        // Información principal en dos columnas
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(11);
        let yPos = 55;
        
        // Columna izquierda - Datos básicos
        pdf.setFont(undefined, 'bold');
        pdf.text('DATOS BÁSICOS', 15, yPos);
        pdf.setFont(undefined, 'normal');
        yPos += 8;
        
        pdf.text(`Nro. Orden: ${mercancia.nroOrden}`, 15, yPos);
        yPos += 6;
        pdf.text(`Tipo: ${mercancia.tipoMercancia}`, 15, yPos);
        yPos += 6;
        pdf.text(`Estado: ${mercancia.estadoMercancias}`, 15, yPos);
        yPos += 6;
        pdf.text(`Fecha Ingreso: ${formatearFecha(mercancia.fechaIngAlmacen)}`, 15, yPos);
        yPos += 6;
        pdf.text(`Localidad: ${mercancia.localidad}`, 15, yPos);
        yPos += 6;
        pdf.text(`Ubicación: ${mercancia.ubicacionAlmacenaje}`, 15, yPos);
        
        // Columna derecha - Consignatario y vehículo
        yPos = 63;
        pdf.setFont(undefined, 'bold');
        pdf.text('CONSIGNATARIO', 110, yPos);
        pdf.setFont(undefined, 'normal');
        yPos += 8;
        
        pdf.text(`Nombre: ${mercancia.consignatario}`, 110, yPos);
        yPos += 6;
        pdf.text(`RUT/DNI: ${mercancia.rutDni}`, 110, yPos);
        yPos += 10;
        
        pdf.setFont(undefined, 'bold');
        pdf.text('VEHÍCULO', 110, yPos);
        pdf.setFont(undefined, 'normal');
        yPos += 8;
        
        pdf.text(`${mercancia.tipoVehiculo}: ${mercancia.marca} ${mercancia.modelo}`, 110, yPos);
        yPos += 6;
        pdf.text(`Patente: ${mercancia.patente}`, 110, yPos);
        
        // Cantidades (si existen)
        yPos = 125;
        let cantidadesTexto = [];
        if (mercancia.kgs > 0) cantidadesTexto.push(`${mercancia.kgs} kg`);
        if (mercancia.cajetillas > 0) cantidadesTexto.push(`${mercancia.cajetillas} cajetillas`);
        if (mercancia.envasesBultos > 0) cantidadesTexto.push(`${mercancia.envasesBultos} bultos`);
        
        if (cantidadesTexto.length > 0) {
            pdf.setFont(undefined, 'bold');
            pdf.text('CANTIDADES', 15, yPos);
            pdf.setFont(undefined, 'normal');
            yPos += 8;
            pdf.text(cantidadesTexto.join(' | '), 15, yPos);
            yPos += 10;
        }
        
        // QR Code - más grande y centrado
        const qrSize = 60;
        const qrX = 15;
        const qrY = yPos + 5;
        
        pdf.addImage(qrDataURL, 'PNG', qrX, qrY, qrSize, qrSize);
        
        // Marco alrededor del QR
        pdf.setLineWidth(0.5);
        pdf.setDrawColor(100, 100, 100);
        pdf.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);
        
        // Información del QR
        const qrInfoX = qrX + qrSize + 10;
        let qrInfoY = qrY + 10;
        
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(12);
        pdf.text('CÓDIGO QR DE IDENTIFICACIÓN', qrInfoX, qrInfoY);
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        qrInfoY += 8;
        pdf.text('Contiene información completa de la mercancía', qrInfoX, qrInfoY);
        qrInfoY += 6;
        pdf.text('incluyendo datos de identificación, consignatario,', qrInfoX, qrInfoY);
        qrInfoY += 6;
        pdf.text('vehículo, documentación y ubicación.', qrInfoX, qrInfoY);
        qrInfoY += 10;
        
        pdf.setFont(undefined, 'bold');
        pdf.text(`ID Único: ${identificadorUnico}`, qrInfoX, qrInfoY);
        qrInfoY += 8;
        
        pdf.setFont(undefined, 'normal');
        pdf.text(`Generado: ${new Date().toLocaleString('es-CL')}`, qrInfoX, qrInfoY);
        
        // Documentación oficial
        yPos = qrY + qrSize + 15;
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(10);
        pdf.text('DOCUMENTACIÓN OFICIAL', 15, yPos);
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(8);
        yPos += 8;
        
        const docs = [
            `Acta Incautación: ${mercancia.actaIncaut}`,
            `Boleta Retención: ${mercancia.boletaRetencion}`,
            `Parte Policial: ${mercancia.nroPartePolicial}`,
            `NUE: ${mercancia.nue}`,
            `Ente Regulador: ${mercancia.enteRegulador}`,
            `Funcionario: ${mercancia.funcionarioDigitador}`
        ];
        
        docs.forEach(doc => {
            pdf.text(doc, 15, yPos);
            yPos += 5;
        });
        
        // Información adicional importante
        yPos += 5;
        if (mercancia.fechaVencimiento) {
            pdf.setFont(undefined, 'bold');
            pdf.setTextColor(220, 38, 38); // Rojo para destacar
            pdf.text(`⚠ VENCIMIENTO: ${formatearFecha(mercancia.fechaVencimiento)}`, 15, yPos);
            pdf.setTextColor(0, 0, 0);
            yPos += 6;
        }
        
        if (mercancia.propuestaDonacion) {
            pdf.setFont(undefined, 'bold');
            pdf.setTextColor(16, 185, 129); // Verde
            pdf.text('❤ PROPUESTA PARA DONACIÓN', 15, yPos);
            pdf.setTextColor(0, 0, 0);
            yPos += 6;
        }
        
        // Marco exterior de toda la etiqueta
        pdf.setLineWidth(2);
        pdf.setDrawColor(37, 99, 235);
        pdf.rect(8, 8, 194, yPos + 5);
        
        // Descargar PDF con nombre mejorado
        const nombreArchivo = `Etiqueta_${identificadorUnico}_${mercancia.tipoMercancia.replace(/\s+/g, '_')}.pdf`;
        pdf.save(nombreArchivo);
        
        mostrarMensaje(`PDF generado: ${nombreArchivo}`, 'success');
        
    } catch (error) {
        console.error('Error generando PDF:', error);
        mostrarMensaje('Error al generar PDF', 'error');
    }
}

// Funciones utilitarias
function formatearFecha(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-CL');
}

function isProximoVencimiento(fechaVencimiento) {
    if (!fechaVencimiento) return false;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferenciaDias = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
    return diferenciaDias <= 30 && diferenciaDias >= 0;
}

// Función para mostrar simulación del QR con datos
function mostrarSimulacionQR(mercancia) {
    const timestamp = new Date().getTime();
    const identificadorUnico = `ADU-${mercancia.nroOrden.toString().padStart(4, '0')}-${timestamp.toString().slice(-6)}`;
    
    const datosQR = {
        id: identificadorUnico,
        orden: mercancia.nroOrden,
        tipo: mercancia.tipoMercancia,
        consignatario: mercancia.consignatario,
        rut: mercancia.rutDni,
        fecha_ingreso: mercancia.fechaIngAlmacen,
        localidad: mercancia.localidad,
        estado: mercancia.estadoMercancias,
        peso_kg: mercancia.kgs,
        bultos: mercancia.envasesBultos,
        cajetillas: mercancia.cajetillas,
        ubicacion: mercancia.ubicacionAlmacenaje,
        vehiculo: `${mercancia.marca} ${mercancia.modelo} - ${mercancia.patente}`,
        acta: mercancia.actaIncaut,
        ente_regulador: mercancia.enteRegulador,
        funcionario: mercancia.funcionarioDigitador,
        vencimiento: mercancia.fechaVencimiento,
        donacion: mercancia.propuestaDonacion,
        generado: new Date().toISOString()
    };
    
    console.log('🔍 SIMULACIÓN DATOS DEL QR:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📋 ID ÚNICO: ${identificadorUnico}`);
    console.log('📊 DATOS COMPLETOS EN EL QR:');
    console.log(JSON.stringify(datosQR, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Mostrar notificación al usuario
    mostrarMensaje(`QR generado con ID: ${identificadorUnico} (ver consola para detalles)`, 'info');
    
    return identificadorUnico;
}

function mostrarMensaje(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${tipo}`;
    notification.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${mensaje}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Añadir al body
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Botón para cerrar manualmente
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}