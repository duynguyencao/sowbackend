import express from 'express';
import TermsContent from '../models/TermsContent.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const terms = await TermsContent.findAll({
            where: { is_active: true },
            order: [['order', 'ASC']]
        })
        res.json({ success: true, data: terms });
    }
    catch (err) {
        console.error('error fetching terms:', err);
        res.status(500).json({ success: false, message: 'Error fetching terms' });
    }
})

export default router;