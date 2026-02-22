import express from 'express';
import swaggerUi from 'swagger-ui-express';
import facturacionCarterasRouter from './facturacion-carteras.router.js';
import comprobantesRouter from './comprobantes.router.js';
import listadosCosechasRouter from './listados-cosechas.router.js';
import swaggerSpec from './swagger.js';
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (_req, res) => {
    res.send('API cartera-app-ws funcionando — Documentación: /api-docs');
});
// Servicio: FacturacionElectronicaCarteras
app.use('/wsfacturacioncarteras/api/v1', facturacionCarterasRouter);
// Servicio: DSA_ActualizacionDePagosPF (Hassar FE)
app.use('/api/comprobantes', comprobantesRouter);
// Servicio: DSA_ListadosCosechas
app.use('/api', listadosCosechasRouter);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`  → Swagger UI:               http://localhost:${port}/api-docs`);
    console.log(`  → Mock FacturacionCarteras:  http://localhost:${port}/wsfacturacioncarteras/api/v1`);
    console.log(`  → Mock Comprobantes (Hassar): http://localhost:${port}/api/comprobantes`);
    console.log(`  → Mock Listados Cosechas:    http://localhost:${port}/api/replicaciones`);
});
//# sourceMappingURL=index.js.map