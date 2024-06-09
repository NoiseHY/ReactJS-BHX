import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/admin/login';

import Admin from './views/admin/Home';


import User from './views/users/Home';
import DetailProduct from './views/users/products';
import User_cart from './views/users/cart';

import NotFound from './components/error';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang admin */}
        <Route path='/login' element={<Login/>} />
        <Route path="/admin" element={<Admin />} />


        <Route exact path='/' element={<User/>} />
        <Route path='/product/:id' element={<DetailProduct/>} />
        <Route path="/cart" element={<User_cart />} />


        <Route component={NotFound} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
