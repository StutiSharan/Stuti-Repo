import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
   axios.get(`${import.meta.env.VITE_API_URL}api/properties`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error('Error fetching properties:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {properties.map((prop) => (
          <Link to={`/property/${prop._id}`} key={prop._id} className="h-full">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 h-full flex flex-col justify-between">
              <img
                src={prop.image || '/house-placeholder.png'}
                alt={prop.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {prop.title || 'Property Title'}
                  </h3>
                  <p className="text-gray-600 mb-1">{prop.location || 'Location'}</p>
                </div>
                <p className="text-indigo-600 font-bold text-lg mt-4">
                  ₹ {prop.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Properties;
