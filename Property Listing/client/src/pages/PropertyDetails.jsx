import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  if (!property) return <div className="pt-32 text-center text-gray-700">Loading...</div>;

  return (
    <div className="pt-32 px-4 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl  flex items-center justify-center font-bold mb-4">{property.title}</h1>
      <p className="text-lg flex items-center justify-center mb-6">{property.description}</p>

     <div className="w-full h-[500px] bg-white mb-6 flex items-center justify-center overflow-hidden">
  <img
    src={property.image}
    alt="Property"
    className="h-full object-contain flex items-center justify-center"
    
  />
</div>


      <p className="text-xl flex items-center justify-center"><strong>Price:</strong> ₹{property.price}</p>
      <p className=" flex items-center justify-center"><strong>Location:</strong> {property.location}</p>

      {/* Map */}
      <div className="h-80 my-6">
        <MapContainer
          center={[28.6139, 77.209]} // fallback coordinates
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[28.6139, 77.209]}>
            <Popup>{property.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyDetails;
