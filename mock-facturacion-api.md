# Mock FacturacionCarteras API

This simulator provides mock endpoints for:
- POST /wsfacturacioncarteras/api/v1/generar
- POST /wsfacturacioncarteras/api/v1/enviar
- POST /wsfacturacioncarteras/api/v1/enviar-correos

## Usage

1. Start the server:

   ```bash
   node src/mock-facturacion-api.js
   ```

2. Send POST requests to the endpoints above using tools like Postman or curl.

### Example Request

POST http://localhost:50471/wsfacturacioncarteras/api/v1/generar

Body:
```
{
  "FechaGeneracion": "2026-02-21"
}
```

### Example Response
```
{
  "success": true,
  "message": "Datos generados correctamente.",
  "fechaGeneracion": "2026-02-21",
  "resumen": {
    "clientesFacturacion": 120,
    "clientesPagoPuntual": 80,
    "totalClientes": 200
  }
}
```

## Endpoints

- **/wsfacturacioncarteras/api/v1/generar**: Simula la generación de datos.
- **/wsfacturacioncarteras/api/v1/enviar**: Simula el envío de facturación.
- **/wsfacturacioncarteras/api/v1/enviar-correos**: Simula el envío de correos.

## Customization

Edit `src/mock-facturacion-api.js` to adjust mock responses as needed.
