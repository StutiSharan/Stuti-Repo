import React, { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import axios from "axios";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    if (!favorites || favorites.length === 0) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/properties`);
        const allProps = res.data || [];
        const matched = allProps.filter((p) => favorites.includes(p._id));
        setSavedProperties(matched);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="pt-32 text-center text-gray-600 text-lg font-medium">
        💡 You haven't added any favorites yet.
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">💖 Your Favorite Properties</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {savedProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-800 font-bold">₹{property.price}</p>
            <p className="text-sm text-gray-500">{property.area} sq ft</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
