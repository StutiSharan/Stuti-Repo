import { Link } from 'react-router-dom'
export default function PropertyCard({ p }) {
  return (
    <Link to={`/property/${p._id}`}>
      <div className="p-6 bg-white rounded-xl shadow space-y-2">
  <h3 className="text-xl font-bold">{property.title}</h3>
  <p className="text-gray-700">{property.description}</p>
  <div className="text-yellow-500 text-lg font-semibold">₹ {property.price}</div>
  <p className="text-sm text-gray-600">Area: {property.sqft} sqft</p>
</div>
    </Link>
  )
}
