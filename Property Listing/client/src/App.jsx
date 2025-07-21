// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/Properties';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from "./pages/ForgotPassword"; 
import { AuthContext } from './context/AuthContext';
import ResetPassword from "./pages/ResetPassword";
import BottomNav from './components/BottomNav';
import Favorites from "./pages/Favorites";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        {token && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
<Route path="/property/:id" element={<PropertyDetails />} />
 <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/favorites" element={<Favorites />} />
<Route path="/property/:id" element={<PropertyDetails />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute role="seller">
                  <AddProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/property/:id"
              element={
                <ProtectedRoute>
                  <PropertyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties"
              element={
                <ProtectedRoute>
                  <Properties />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
   <Footer />
    <BottomNav />
      </div>
    </Router>
  );
}

export default App;
