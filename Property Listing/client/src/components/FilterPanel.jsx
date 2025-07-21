export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded shadow">
      <select
        value={filters.type}
        onChange={e => setFilters({ ...filters, type: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">All Types</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="office">Office</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={e => setFilters({ ...filters, location: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
        className="border rounded px-3 py-2"
      />
    </div>
  )
}
