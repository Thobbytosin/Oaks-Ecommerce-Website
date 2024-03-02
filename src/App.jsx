import React from 'react';
import {Outlet} from 'react-router-dom'
import { Footer, Navbar } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className={` w-full overflow-hidden`}>
      <ToastContainer />
      <Navbar />
      <div className=' min-h-screen'>
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default App
