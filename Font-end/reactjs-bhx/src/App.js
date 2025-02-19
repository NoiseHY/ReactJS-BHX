import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/admin/login';
import NotFound from './components/error';

// import Admin from './views/admin/Home';
import Admin_tmp from './views/admin/Home';

import User from './views/users/Home';
import DetailProduct from './views/users/products';
import User_cart from './views/users/cart';
import User_invoice from './views/users/invoice';
import User_profile_tmp from './views/users/customer';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho trang admin */}
        <Route path='/login' element={<Login/>} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/admin" element={<Admin_tmp />} />

        <Route exact path='/' element={<User/>} />
        <Route path='/product/:id' element={<DetailProduct/>} />
        <Route path="/cart/:id" element={<User_cart />} />
        <Route path="/invoice/:id" element={<User_invoice />} />
        <Route path='/profile/:id' element={<User_profile_tmp/>} />

        <Route component={NotFound} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
