const express = require('express');
const app = express();
const port = 50471;

app.use(express.json());

// Mock endpoints
app.post('/wsfacturacioncarteras/api/v1/generar', (req, res) => {
  // Simulate processing
  res.json({
    success: true,
    message: 'Datos generados correctamente.',
    fechaGeneracion: req.body.FechaGeneracion || null,
    resumen: {
      clientesFacturacion: 120,
      clientesPagoPuntual: 80,
      totalClientes: 200
    }
  });
});

app.post('/wsfacturacioncarteras/api/v1/enviar', (req, res) => {
  // Simulate processing
  res.json({
    success: true,
    message: 'Facturación enviada correctamente.',
    fechaGeneracion: req.body.FechaGeneracion || null,
    fechaFacturar: req.body.FechaFacturar || null,
    resumen: {
      clientesAFacturar: 100,
      importeAFacturar: 50000.00,
      clientesFacturados: 95,
      importeFacturado: 47500.00,
      clientesCorte: 5,
      totalClientes: 200
    }
  });
});

app.post('/wsfacturacioncarteras/api/v1/enviar-correos', (req, res) => {
  // Simulate processing
  res.json({
    success: true,
    message: 'Correos enviados correctamente.',
    enviados: 95,
    errores: 0
  });
});

app.listen(port, () => {
  console.log(`Mock FacturacionCarteras API listening at http://localhost:${port}/wsfacturacioncarteras/api/v1`);
});
