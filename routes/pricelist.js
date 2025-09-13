import express from 'express';
import PricelistItem from '../models/PricelistItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await PricelistItem.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC']]
    })
    res.json({ success: true, data: items });
  }
  catch (err) {
    console.error('error fetching pricelist items:', err);
    res.status(500).json({ success: false, message: 'Error fetching pricelist items' });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const item = await PricelistItem.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    await item.update(data);
    res.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating item' });
  }
});

export default router;