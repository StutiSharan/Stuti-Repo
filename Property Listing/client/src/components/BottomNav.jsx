import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaEnvelope } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import React from 'react';
const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext); // ✅ role comes from decoded JWT

  const [showPopup, setShowPopup] = useState(false);

  const handlePostClick = () => {
    if (role === 'seller') {
      navigate('/add');
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50">
        <div className="flex justify-around items-center py-3 text-gray-700">
          <Link
            to="/"
            className={`flex flex-col items-center ${location.pathname === '/' ? 'text-blue-600' : ''}`}
          >
            <FaHome size={20} />
            <span className="text-xs">Home</span>
          </Link>

          <button
            onClick={handlePostClick}
            className={`flex flex-col items-center ${location.pathname === '/add' ? 'text-blue-600' : ''}`}
          >
            <FaPlusCircle size={24} />
            <span className="text-xs">Post</span>
          </button>

          <Link
            to="/contact"
            className={`flex flex-col items-center ${location.pathname === '/contact' ? 'text-blue-600' : ''}`}
          >
            <FaEnvelope size={20} />
            <span className="text-xs">Contact</span>
          </Link>
        </div>
      </div>

      {/* ❌ Modal for unauthorized access */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-xs w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-700 mb-4">
              Sorry, this page is only accessible by <span className="font-medium">Sellers</span>.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
