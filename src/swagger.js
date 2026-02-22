import swaggerJsdoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'cartera-app-ws — Mock API',
            version: '1.0.0',
            description: 'Mock REST API que replica los endpoints de múltiples servicios: ' +
                'FacturacionElectronicaCarteras (`http://10.45.187.6:50471/wsfacturacioncarteras/api/v1`), ' +
                'DSA_ActualizacionDePagosPF — Hassar FE (`http://10.201.61.9:8080/api/comprobantes/`), ' +
                'DSA_ListadosCosechas, DSA_GenerarReportesReembolsos y DA0009ListadosDeCobranzas.',
        },
        servers: [
            { url: 'http://localhost:3001', description: 'Servidor local' },
        ],
        tags: [
            { name: 'Facturación Carteras', description: 'Endpoints del proceso de facturación electrónica (FacturacionElectronicaCarteras)' },
            { name: 'Comprobantes Hassar', description: 'Endpoints del servicio Hassar FE para emisión de comprobantes electrónicos AFIP (DSA_ActualizacionDePagosPF)' },
            { name: 'Servicios de Replicación', description: 'Endpoints de replicación y autenticación Azure AD (Usado por Cosechas, Reembolsos y Cobranzas)' },
        ],
        paths: {
            '/wsfacturacioncarteras/api/v1/generar': {
                post: {
                    tags: ['Facturación Carteras'],
                    summary: 'Generar datos de facturación',
                    description: 'Genera los datos de clientes para facturación a partir de una fecha de generación. ' +
                        'Disparado por el botón GENERAR en la aplicación desktop.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['FechaGeneracion'],
                                    properties: {
                                        FechaGeneracion: {
                                            type: 'string',
                                            format: 'date',
                                            example: '2026-02-22',
                                            description: 'Fecha del proceso de generación (yyyy-MM-dd)',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Datos generados correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            message: { type: 'string', example: 'Datos generados correctamente.' },
                                            fechaGeneracion: { type: 'string', example: '2026-02-22' },
                                            resumen: {
                                                type: 'object',
                                                properties: {
                                                    clientesFacturacion: { type: 'integer', example: 120 },
                                                    clientesPagoPuntual: { type: 'integer', example: 80 },
                                                    totalClientes: { type: 'integer', example: 200 },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/wsfacturacioncarteras/api/v1/enviar': {
                post: {
                    tags: ['Facturación Carteras'],
                    summary: 'Enviar/Facturar clientes',
                    description: 'Ejecuta el proceso de facturación enviando los clientes generados en una fecha, ' +
                        'asignando la fecha de factura indicada. Disparado por el botón FACTURAR.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['FechaGeneracion', 'FechaFacturar'],
                                    properties: {
                                        FechaGeneracion: {
                                            type: 'string',
                                            format: 'date',
                                            example: '2026-02-22',
                                            description: 'Fecha del proceso de generación previo (yyyy-MM-dd)',
                                        },
                                        FechaFacturar: {
                                            type: 'string',
                                            format: 'date',
                                            example: '2026-02-22',
                                            description: 'Fecha que se asignará a la factura (yyyy-MM-dd)',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Facturación enviada correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            message: { type: 'string', example: 'Facturación enviada correctamente.' },
                                            fechaGeneracion: { type: 'string', example: '2026-02-22' },
                                            fechaFacturar: { type: 'string', example: '2026-02-22' },
                                            resumen: {
                                                type: 'object',
                                                properties: {
                                                    clientesAFacturar: { type: 'integer', example: 100 },
                                                    importeAFacturar: { type: 'number', format: 'float', example: 50000.00 },
                                                    clientesFacturados: { type: 'integer', example: 95 },
                                                    importeFacturado: { type: 'number', format: 'float', example: 47500.00 },
                                                    clientesCorte: { type: 'integer', example: 5 },
                                                    totalClientes: { type: 'integer', example: 200 },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/wsfacturacioncarteras/api/v1/enviar-correos': {
                post: {
                    tags: ['Facturación Carteras'],
                    summary: 'Enviar correos a clientes facturados',
                    description: 'Inicia el proceso de envío de correos electrónicos a los clientes facturados. ' +
                        'No requiere body. Disparado por el botón ENVIAR CORREOS.',
                    requestBody: {
                        required: false,
                        content: {
                            'application/json': {
                                schema: { type: 'object', example: {} },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Correos enviados correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            message: { type: 'string', example: 'Correos enviados correctamente.' },
                                            enviados: { type: 'integer', example: 95 },
                                            errores: { type: 'integer', example: 0 },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // ── DSA_ActualizacionDePagosPF ─────────────────────────────────────
            '/api/comprobantes/creaComprobante': {
                post: {
                    tags: ['Comprobantes Hassar'],
                    summary: 'Crear comprobante electrónico (AFIP)',
                    description: 'Crea un comprobante electrónico — puede ser una **Factura de Interés** (`FERequest`) ' +
                        'o una **Nota de Crédito / Bonificación** (`FERequestNCC`, agrega `periodoAsoc`). ' +
                        'La respuesta debe tener `resultado = "A"` para ser considerada exitosa. ' +
                        'Llamado desde `ConsumirHassarFE()` con hasta 3 reintentos automáticos.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['nroTransaccion', 'tipoComprobante'],
                                    properties: {
                                        comprobanteFecha: { type: 'string', example: '20260222' },
                                        tipoComprobante: { type: 'string', example: '6', description: '6=Factura Interés, 8=Bonificación/NCC' },
                                        nroTransaccion: { type: 'integer', format: 'int64', example: 1001 },
                                        nroTransaccionConfirmado: { type: 'integer', format: 'int64', example: 1000 },
                                        nroOperacion: { type: 'integer', format: 'int64', example: 500 },
                                        tipoDocumento: { type: 'string', example: 'DNI' },
                                        documentoNro: { type: 'string', example: '12345678' },
                                        importeTotal: { type: 'number', format: 'double', example: 1210.00 },
                                        importeNetoNoGravado: { type: 'integer', format: 'int64', example: 0 },
                                        importeNeto: { type: 'number', format: 'double', example: 1000.00 },
                                        importeExcento: { type: 'number', format: 'double', example: 0.0 },
                                        importeTributo: { type: 'number', format: 'double', example: 0.0 },
                                        importeIVA: { type: 'number', format: 'double', example: 210.00 },
                                        sucursal: { type: 'integer', format: 'int64', example: 90 },
                                        caja: { type: 'integer', format: 'int64', example: 20 },
                                        tributos: {
                                            type: 'object',
                                            properties: {
                                                alicuota: { type: 'integer', example: 21 },
                                                baseImponible: { type: 'integer', example: 1000 },
                                                importe: { type: 'number', example: 210.00 },
                                                tipoTributo: { type: 'string', example: 'IVA' },
                                            },
                                        },
                                        alicuotas: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    baseImponible: { type: 'number', example: 1000.00 },
                                                    importe: { type: 'number', example: 210.00 },
                                                    tipoIVA: { type: 'string', example: '5' },
                                                },
                                            },
                                        },
                                        periodoAsoc: {
                                            type: 'object',
                                            description: 'Solo presente en FERequestNCC (bonificaciones)',
                                            properties: {
                                                fechaDesde: { type: 'string', example: '20260101' },
                                                fechaHasta: { type: 'string', example: '20260131' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Comprobante creado. Verificar `resultado === "A"` para éxito.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            puntoVenta: { type: 'integer', example: 90 },
                                            tipoComprobante: { type: 'string', example: '6' },
                                            numeroComprobante: { type: 'integer', format: 'int64', example: 1000001 },
                                            resultado: { type: 'string', example: 'A', description: '"A" = Aprobado, otro valor = error' },
                                            cae: { type: 'string', example: '74123456789012' },
                                            caeFechaVto: { type: 'string', example: '20260301' },
                                            caea: { type: 'string', nullable: true, example: null },
                                            nroTransaccion: { type: 'integer', format: 'int64', example: 1001 },
                                            fechaProceso: { type: 'string', example: '20260222' },
                                            urlAfip: { type: 'string', example: 'https://www.afip.gob.ar/fe/qr/?p=...' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/comprobantes/ackComprobante': {
                put: {
                    tags: ['Comprobantes Hassar'],
                    summary: 'Confirmar comprobante (ACK offline)',
                    description: 'Confirma el último comprobante procesado como recibido (modo offline). ' +
                        'Se llama **inmediatamente después** de un `creaComprobante` exitoso, ' +
                        'enviando el `nroTransaccion` del request anterior.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['nroCaja', 'nroSucursal', 'ultimoNroTransaccion'],
                                    properties: {
                                        nroCaja: { type: 'integer', example: 20, description: 'Número de caja (fijo: 20)' },
                                        nroSucursal: { type: 'integer', example: 90, description: 'Número de sucursal (fijo: 90)' },
                                        ultimoNroTransaccion: { type: 'integer', format: 'int64', example: 1001, description: 'nroTransaccion del creaComprobante previo' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'ACK confirmado correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean', example: true },
                                            message: { type: 'string', example: 'Comprobante confirmado correctamente.' },
                                            nroCaja: { type: 'integer', example: 20 },
                                            nroSucursal: { type: 'integer', example: 90 },
                                            ultimoNroTransaccion: { type: 'integer', example: 1001 },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // ── DSA_ListadosCosechas ──────────────────────────────────────────
            '/api/replicaciones/general': {
                post: {
                    tags: ['Servicios de Replicación'],
                    summary: 'Ejecutar replicación general',
                    description: 'Inicia el proceso de replicación general. Proyectos conocidos: ' +
                        '- **Cosechas:** `idMigration` (dinámico) ' +
                        '- **Reembolsos:** `idMigration` = 161 ' +
                        '- **Cobranzas:** `idMigration` = 73',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['idMigration'],
                                    properties: {
                                        idMigration: { type: 'integer', example: 1 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Réplica iniciada/ejecutada correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            meta: {
                                                type: 'object',
                                                properties: {
                                                    transactionID: { type: 'string', example: '9bd0ebf4-0822-4845-91f5-20a5a60f197d' },
                                                    status: { type: 'string', example: 'OK' },
                                                    statusCode: { type: 'integer', example: 200 },
                                                    timestamp: { type: 'string', format: 'date-time' },
                                                },
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    active: { type: 'boolean', example: false },
                                                    sucessfull: { type: 'boolean', example: true },
                                                    error: { type: 'string', example: '' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/replicaciones/especifica': {
                post: {
                    tags: ['Servicios de Replicación'],
                    summary: 'Ejecutar replicación específica',
                    description: 'Inicia el proceso de replicación específica. Proyectos conocidos: ' +
                        '- **Cobranzas:** `idMigration` = 74',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['idMigration'],
                                    properties: {
                                        idMigration: { type: 'integer', example: 1 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Réplica iniciada correctamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/paths/~1api~1replicaciones~1general/post/responses/200/content/application~1json/schema'
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/azure-ad/user': {
                get: {
                    tags: ['Servicios de Replicación'],
                    summary: 'Obtener datos de usuario de Azure AD',
                    description: 'Simula el endpoint de Microsoft Graph para obtener información del usuario autenticado.',
                    headers: {
                        Authorization: {
                            description: 'Bearer Token',
                            schema: { type: 'string' },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Datos del usuario encontrados',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            ODataContext: { type: 'string', example: 'https://graph.microsoft.com/v1.0/$metadata#users/$entity' },
                                            GivenName: { type: 'string', example: 'Usuario Mock de Cosecha' },
                                            EmployeeId: { type: 'string', example: '12345' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [], // rutas inline — no usamos comentarios JSDoc
};
const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map