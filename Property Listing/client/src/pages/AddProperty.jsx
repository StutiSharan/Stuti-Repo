import React, { useState, useContext, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AddProperty() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔐 Redirect buyers away from this page
  useEffect(() => {
    if (role !== 'seller') {
      navigate('/');
    }
  }, [role, navigate]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
    area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/properties', {
        ...form,
        price: Number(form.price),
        area: Number(form.area),
      });
      navigate('/');
    } catch (err) {
      alert('Failed to add property');
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center pt-20 pb-32">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl animate-fade"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Property</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {['title', 'location', 'price', 'area', 'image', 'description'].map((field) => (
            <div key={field} className="relative">
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="peer w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-transparent"
                placeholder={`Enter ${field}`}
              />
              <label
                htmlFor={field}
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
        >
          Submit Property
        </button>
      </form>
    </section>
  );
}
