// controllers/propertyController.js
import axios from 'axios';
import Property from '../models/Property.js';

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, image, area } = req.body;

    // 🔍 Geocode the location
    const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: location,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'real-estate-app'
      }
    });

    const { lat, lon } = geoRes.data[0] || {};

    const property = new Property({
      title,
      description,
      price,
      location,
      image,
      area,
      lat: parseFloat(lat) || 28.6139, // fallback to Delhi
      lng: parseFloat(lon) || 77.209
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error('Error saving property:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
