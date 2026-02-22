import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

/**
 * POST /api/comprobantes/creaComprobante
 * Body: FERequest | FERequestNCC
 * Crea un comprobante electrónico (factura de interés o bonificación/NCC).
 * Llamado desde: FacturaInteres() y FacturaBonificacion() vía ConsumirHassarFE()
 */
router.post('/creaComprobante', (req: Request, res: Response) => {
    const { nroTransaccion, tipoComprobante } = req.body ?? {};

    res.json({
        puntoVenta: 90,
        tipoComprobante: tipoComprobante ?? '6',
        numeroComprobante: 1000001,
        resultado: 'A',
        cae: '74123456789012',
        caeFechaVto: '20260301',
        caea: null,
        nroTransaccion: nroTransaccion ?? 1,
        fechaProceso: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
        urlAfip: 'https://www.afip.gob.ar/fe/qr/?p=dummy',
    });
});

/**
 * PUT /api/comprobantes/ackComprobante
 * Body: { nroCaja: 20, nroSucursal: 90, ultimoNroTransaccion: number }
 * Confirma (ACK offline) el comprobante recién creado.
 * Llamado inmediatamente después de creaComprobante exitoso.
 */
router.put('/ackComprobante', (req: Request, res: Response) => {
    const { nroCaja, nroSucursal, ultimoNroTransaccion } = req.body ?? {};

    res.json({
        success: true,
        message: 'Comprobante confirmado correctamente.',
        nroCaja: nroCaja ?? 20,
        nroSucursal: nroSucursal ?? 90,
        ultimoNroTransaccion: ultimoNroTransaccion ?? 0,
    });
});

export default router;
