import { Router } from 'express';
const router = Router();
/**
 * POST /api/replicaciones/general
 * POST /api/replicaciones/especifica
 * Body: { idMigration: number }
 */
const replicationHandler = (req, res) => {
    const { idMigration } = req.body ?? {};
    res.json({
        meta: {
            transactionID: '9bd0ebf4-0822-4845-91f5-20a5a60f197d',
            status: 'OK',
            statusCode: 200,
            timestamp: new Date().toISOString()
        },
        data: {
            active: false,
            sucessfull: true,
            error: ''
        }
    });
};
router.post('/replicaciones/general', replicationHandler);
router.post('/replicaciones/especifica', replicationHandler);
/**
 * GET /api/azure-ad/user
 * Header: Authorization (Bearer token)
 */
router.get('/azure-ad/user', (req, res) => {
    res.json({
        ODataContext: 'https://graph.microsoft.com/v1.0/$metadata#users/$entity',
        GivenName: 'Usuario Mock de Cosecha',
        EmployeeId: '12345'
    });
});
export default router;
//# sourceMappingURL=listados-cosechas.router.js.map