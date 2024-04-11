import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import TokenRequired from './components/auth/TokenRequired';
import HasNoToken from './components/auth/HasNoToken';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import Product from './pages/Product/Product';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
      <div className={`w-full h-screen relative ${isHamburgerOpen && " overflow-y-hidden "}`}>
        <HamburgerMenu isOpen={isHamburgerOpen} setIsOpen={setIsHamburgerOpen} style={`w-full  h-full absolute md:hidden top-0 left-0`}  />
        <Navbar HamOpen={isHamburgerOpen} isHamOpen={setIsHamburgerOpen} />
        <Routes>
            <Route element={<TokenRequired />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/product/add' element={<AddProduct />} />
            </Route>

            <Route element={<HasNoToken />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            <Route path='/*' element={<Error />} />
        </Routes>
      </div>
  );
}

export default App;
