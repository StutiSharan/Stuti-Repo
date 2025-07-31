import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FavoritesContext } from "../context/FavoritesContext";
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [noResults, setNoResults] = useState(false);
const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}api/properties`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProperties(data);
        setFiltered(data);
        setNoResults(data.length === 0);
      })
      .catch((err) => {
        console.error(err);
        setNoResults(true);
      });
  }, []);

  const handleSearch = () => {
    const filteredList = properties.filter((prop) => {
      const matchesLocation = locationFilter
        ? prop.location?.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      const matchesMinPrice = minPrice ? Number(prop.price) >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? Number(prop.price) <= Number(maxPrice) : true;

      return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    setFiltered(filteredList);
    setNoResults(filteredList.length === 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 text-white pt-32 px-4 font-sans">
      
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-red-500">Dream Home</span>
        </h1>
        <p className="text-xl text-white/90">Explore the best properties for sale and rent in your city.</p>
      </div>

      {/* Filters */}
      <div className="bg-white/90 text-black px-6 py-6 max-w-6xl mx-auto shadow-xl flex flex-wrap gap-4 justify-center rounded-2xl md:rounded-full mb-20 transition-all duration-300">
        <input
          type="text"
          placeholder="Search by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2 rounded-md border w-[200px]"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 rounded-md border w-[140px]"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 rounded-md border w-[140px]"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 px-6 py-2 rounded-md font-semibold text-white transition-all duration-300"
        >
          🔍 Search
        </button>
      </div>

      {/* Featured Properties */}
      <div className="bg-white text-black rounded-t-[60px] pt-16 pb-24 px-4">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-800">🏡 Featured Properties</h2>

        {noResults && (
          <p className="text-center text-lg text-red-500 font-semibold mt-10">
            ❌ No properties match your search.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filtered.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 border border-gray-200 animate-fade-in-up"
            >
              {/* Swiper */}
              <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="mb-4"
              >
                <SwiperSlide>
                  <img
                    src={property.image}
                    alt="Property"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                </SwiperSlide>
              </Swiper>

              {/* Video (if exists) */}
              {property.video && (
                <div className="mb-4">
                  <video controls className="rounded-lg w-full">
                    <source src={property.video} type="video/mp4" />
                  </video>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-800">{property.title || "Property Title"}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="mt-2"><strong>Price:</strong> ₹{property.price || "N/A"}</p>
              <p><strong>Area:</strong> {property.area || "—"} sq ft</p>
              <p><strong>Amenities:</strong> {property.amenities?.join(", ") || "N/A"}</p>
<button
  onClick={() => toggleFavorite(property._id)}
  className={`text-red-500 font-semibold`}
>
  {isFavorite(property._id) ? "💖 Saved" : "🤍 Save"}
</button>
              {/* Map */}
              <div className="mt-4 h-40 rounded overflow-hidden z-0">
                <MapContainer
                  center={[property.lat || 28.6139, property.lng || 77.209]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[property.lat || 28.6139, property.lng || 77.209]}>
                    <Popup>{property.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <a
                  href={property.floorPlan || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Floor Plan
                </a>
                <a
                  href={property.virtualTour || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Virtual Tour
                </a>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
