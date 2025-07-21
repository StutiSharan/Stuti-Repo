// models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  location: String,
  image: String,
  area: Number, // ✅ area in sqft
  lat: Number,  // ✅ latitude
  lng: Number,  // ✅ longitude
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
