// Datos hardcodeados de mercancías incautadas
const mercanciasData = [
    {
        nroOrden: 1,
        fechaIngAlmacen: '2024-01-15',
        tipoMercancia: 'Cigarrillos',
        tipoVehiculo: 'Camión',
        cajetillas: 1000,
        kgs: 50.5,
        envasesBultos: 20,
        enteRegulador: 'SAG',
        localidad: 'Valparaíso',
        estadoMercancias: 'Bueno',
        nroOficioOrd: 'OF-001-2024',
        boletaRetencion: 'BR-001',
        actaIncaut: 'AI-001',
        nroPartePolicial: 'PP-001',
        nue: 'NUE-001',
        consignatario: 'Juan Pérez',
        rutDni: '12.345.678-9',
        marca: 'Mercedes',
        modelo: 'Actros',
        patente: 'AA-BB-12',
        ubicacionAlmacenaje: 'Almacén A1',
        observaciones: 'Mercancía en buen estado',
        robos: '',
        otrasObservaciones: 'Sin robos reportados',
        denuncia: 'DEN-001',
        estadoDecare: 'Pendiente',
        funcionarioDigitador: 'Carlos Rodriguez',
        fechaVencimiento: '2024-12-31',
        propuestaDonacion: true
    },
    {
        nroOrden: 2,
        fechaIngAlmacen: '2024-01-20',
        tipoMercancia: 'Alcohol',
        tipoVehiculo: 'Furgón',
        cajetillas: 0,
        kgs: 120.0,
        envasesBultos: 50,
        enteRegulador: 'Aduana',
        localidad: 'Santiago',
        estadoMercancias: 'Regular',
        nroOficioOrd: 'OF-002-2024',
        boletaRetencion: 'BR-002',
        actaIncaut: 'AI-002',
        nroPartePolicial: 'PP-002',
        nue: 'NUE-002',
        consignatario: 'María González',
        rutDni: '98.765.432-1',
        marca: 'Ford',
        modelo: 'Transit',
        patente: 'CC-DD-34',
        ubicacionAlmacenaje: 'Almacén B2',
        observaciones: 'Algunas botellas rotas',
        robos: 'Robo menor reportado',
        otrasObservaciones: 'Daños menores',
        denuncia: 'DEN-002',
        estadoDecare: 'En proceso',
        funcionarioDigitador: 'Ana Martínez',
        fechaVencimiento: '2024-06-30',
        propuestaDonacion: false
    },
    {
        nroOrden: 3,
        fechaIngAlmacen: '2024-02-01',
        tipoMercancia: 'Electrónicos',
        tipoVehiculo: 'Auto',
        cajetillas: 0,
        kgs: 25.0,
        envasesBultos: 15,
        enteRegulador: 'SII',
        localidad: 'Antofagasta',
        estadoMercancias: 'Excelente',
        nroOficioOrd: 'OF-003-2024',
        boletaRetencion: 'BR-003',
        actaIncaut: 'AI-003',
        nroPartePolicial: 'PP-003',
        nue: 'NUE-003',
        consignatario: 'Pedro Silva',
        rutDni: '11.111.111-1',
        marca: 'Toyota',
        modelo: 'Corolla',
        patente: 'EE-FF-56',
        ubicacionAlmacenaje: 'Almacén C3',
        observaciones: 'Equipos nuevos sin uso',
        robos: '',
        otrasObservaciones: 'Sin incidentes',
        denuncia: 'DEN-003',
        estadoDecare: 'Finalizado',
        funcionarioDigitador: 'Luis Hernández',
        fechaVencimiento: '2025-01-15',
        propuestaDonacion: true
    },
    {
        nroOrden: 4,
        fechaIngAlmacen: '2024-02-10',
        tipoMercancia: 'Medicamentos',
        tipoVehiculo: 'Furgón',
        cajetillas: 0,
        kgs: 8.5,
        envasesBultos: 30,
        enteRegulador: 'ISP',
        localidad: 'Concepción',
        estadoMercancias: 'Bueno',
        nroOficioOrd: 'OF-004-2024',
        boletaRetencion: 'BR-004',
        actaIncaut: 'AI-004',
        nroPartePolicial: 'PP-004',
        nue: 'NUE-004',
        consignatario: 'Farmacia Central',
        rutDni: '76.123.456-7',
        marca: 'Chevrolet',
        modelo: 'Express',
        patente: 'GG-HH-78',
        ubicacionAlmacenaje: 'Almacén Refrigerado A',
        observaciones: 'Medicamentos controlados',
        robos: '',
        otrasObservaciones: 'Requiere refrigeración',
        denuncia: 'DEN-004',
        estadoDecare: 'Pendiente',
        funcionarioDigitador: 'Carmen López',
        fechaVencimiento: '2024-08-15',
        propuestaDonacion: true
    },
    {
        nroOrden: 5,
        fechaIngAlmacen: '2024-02-15',
        tipoMercancia: 'Textiles',
        tipoVehiculo: 'Camión',
        cajetillas: 0,
        kgs: 200.0,
        envasesBultos: 80,
        enteRegulador: 'Aduana',
        localidad: 'Iquique',
        estadoMercancias: 'Bueno',
        nroOficioOrd: 'OF-005-2024',
        boletaRetencion: 'BR-005',
        actaIncaut: 'AI-005',
        nroPartePolicial: 'PP-005',
        nue: 'NUE-005',
        consignatario: 'Importadora Norte',
        rutDni: '99.888.777-6',
        marca: 'Volvo',
        modelo: 'FH16',
        patente: 'II-JJ-90',
        ubicacionAlmacenaje: 'Almacén D4',
        observaciones: 'Ropa de marcas reconocidas',
        robos: '',
        otrasObservaciones: 'Posible falsificación',
        denuncia: 'DEN-005',
        estadoDecare: 'En proceso',
        funcionarioDigitador: 'Roberto Sánchez',
        fechaVencimiento: '2025-12-31',
        propuestaDonacion: false
    },
    {
        nroOrden: 6,
        fechaIngAlmacen: '2024-03-01',
        tipoMercancia: 'Alimentos',
        tipoVehiculo: 'Camión',
        cajetillas: 0,
        kgs: 500.0,
        envasesBultos: 100,
        enteRegulador: 'SERNAPESCA',
        localidad: 'Puerto Montt',
        estadoMercancias: 'Regular',
        nroOficioOrd: 'OF-006-2024',
        boletaRetencion: 'BR-006',
        actaIncaut: 'AI-006',
        nroPartePolicial: 'PP-006',
        nue: 'NUE-006',
        consignatario: 'Pesquera del Sur',
        rutDni: '55.444.333-2',
        marca: 'Scania',
        modelo: 'R500',
        patente: 'KK-LL-12',
        ubicacionAlmacenaje: 'Almacén Refrigerado B',
        observaciones: 'Productos del mar congelados',
        robos: '',
        otrasObservaciones: 'Fecha de vencimiento próxima',
        denuncia: 'DEN-006',
        estadoDecare: 'Pendiente',
        funcionarioDigitador: 'Isabel Morales',
        fechaVencimiento: '2024-05-15',
        propuestaDonacion: true
    }
];

// Función para obtener todas las mercancías
function getMercancias() {
    return mercanciasData;
}

// Función para obtener una mercancía por número de orden
function getMercanciaByOrden(nroOrden) {
    return mercanciasData.find(m => m.nroOrden == nroOrden);
}

// Función para filtrar mercancías
function filtrarMercancias(termino, estado) {
    return mercanciasData.filter(mercancia => {
        const coincideBusqueda = !termino || 
            mercancia.nroOrden.toString().includes(termino) ||
            mercancia.tipoMercancia.toLowerCase().includes(termino.toLowerCase()) ||
            mercancia.consignatario.toLowerCase().includes(termino.toLowerCase()) ||
            mercancia.localidad.toLowerCase().includes(termino.toLowerCase());
        
        const coincideEstado = !estado || mercancia.estadoMercancias === estado;
        
        return coincideBusqueda && coincideEstado;
    });
}

// Función para obtener estadísticas
function getEstadisticas() {
    const total = mercanciasData.length;
    const pendientes = mercanciasData.filter(m => m.estadoDecare === 'Pendiente').length;
    const paraDonacion = mercanciasData.filter(m => m.propuestaDonacion).length;
    
    // Próximos a vencer (próximos 30 días)
    const hoy = new Date();
    const en30Dias = new Date();
    en30Dias.setDate(hoy.getDate() + 30);
    
    const proximosAVencer = mercanciasData.filter(m => {
        if (!m.fechaVencimiento) return false;
        const fechaVenc = new Date(m.fechaVencimiento);
        return fechaVenc >= hoy && fechaVenc <= en30Dias;
    }).length;
    
    return {
        total,
        pendientes,
        paraDonacion,
        proximosAVencer
    };
}