// routes/propertyRoutes.js
import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error('Error saving property:', error.message);
    res.status(500).json({ error: 'Failed to add property' });
  }
});
// routes/propertyRoutes.js
router.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).send("Property not found");
    res.json(property);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});




// Get all properties (optional for listing)
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
