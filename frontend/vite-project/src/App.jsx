
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Products from "./pages/Products/Products";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/Auths/Signup';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose = {3000} />
    </>
  );
}

export default App
