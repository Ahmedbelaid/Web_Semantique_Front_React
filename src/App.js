import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/NavBar';
import Header from './components/Hero';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Annonce from './Pages/Annonces';
import Barter from './Pages/Barter';
import Category from './Pages/Category';
import Products from './Pages/Products';
import Form from './Pages/Form/Form';
import Event from './Pages/Event/Event';
import Venue from './Pages/Venue/Venue';
import BarterRequests from './Pages/BarterRequests/BarterRequests';
import Response from './Pages/Response/Response';
import Forum from './Pages/Forum/Forum';

function App() {
  const color = "teal";

  return (
    <Router>
      <div>
        <Nav color={color} />
        <Routes>
          <Route path="/barter" element={<Barter />} />
          <Route path="/form" element={<Form />} />
          <Route path="/announce" element={<Annonce />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/events" element={<Event />} />
          <Route path="/venues" element={<Venue />} />
          <Route path="/barterRequests" element={<BarterRequests />} />
          <Route path="/Responses" element={<Response />} />
          <Route path="/forums" element={<Forum />} />





          <Route path="/" element={<Header color={color} />} />
        </Routes>
        <Contact color={color} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
