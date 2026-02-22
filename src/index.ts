import express from 'express';
import swaggerUi from 'swagger-ui-express';
import facturacionCarterasRouter from './facturacion-carteras.router.js';
import comprobantesRouter from './comprobantes.router.js';
import listadosCosechasRouter from './listados-cosechas.router.js';
import swaggerSpec from './swagger.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Swagger UI - Configurado con CDN para que funcione en Vercel/Serverless sin problemas de rutas estáticas
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ]
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.get('/', (_req, res) => {
  res.send('API cartera-app-ws funcionando — Documentación: /api-docs');
});

// Servicio: FacturacionElectronicaCarteras
app.use('/wsfacturacioncarteras/api/v1', facturacionCarterasRouter);

// Servicio: DSA_ActualizacionDePagosPF (Hassar FE)
app.use('/api/comprobantes', comprobantesRouter);

// Servicio: DSA_ListadosCosechas
app.use('/api', listadosCosechasRouter);

// El servidor solo debe escuchar si no se está ejecutando como una Serverless Function de Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`  → Swagger UI:               http://localhost:${port}/api-docs`);
    console.log(`  → Mock FacturacionCarteras:  http://localhost:${port}/wsfacturacioncarteras/api/v1`);
    console.log(`  → Mock Comprobantes (Hassar): http://localhost:${port}/api/comprobantes`);
    console.log(`  → Mock Listados Cosechas:    http://localhost:${port}/api/replicaciones`);
  });
}

// Exportación requerida para Vercel
export default app;

