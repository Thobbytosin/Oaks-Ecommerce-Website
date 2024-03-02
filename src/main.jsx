import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About, Home, Products, Blog, Contact, SearchResult, ErrorPage, ProductDetails, Category } from './pages/index.js';
import SignUp from './pages/signUp/SignUp.jsx';
import Login from './pages/login/Login.jsx';
import Cart from './pages/cart/Cart.jsx';
import Faq from './pages/faq/FAQ.jsx';

import { store } from './app/store.js';
import { Provider } from 'react-redux';
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import TrackOrder from './pages/trackOrder/TrackOrder.jsx';
import Admin from './pages/admin/Admin.jsx';
import Support from './pages/support/Support.jsx';
import Wishlist from './pages/wishlist/Wishlist.jsx';
import FaqsDetails from './pages/faqsDetails/FaqsDetails.jsx';
import FaqsSearchResult from './pages/faqsSearchResult/FaqsSearchResult.jsx';
import Terms from './pages/terms/Terms.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
          path: "/",
          element: <Home />

        },

        {
          path: "/about",
          element: <About />
        },

        {
          path: "/shop",
          element: <Products />
        },

        {
          path: "/blog",
          element: <Blog />
        },

        {
          path: "/contact",
          element: <Contact />
        },

        {
          path: "/search/:search",
          element: <SearchResult />
        },
        
        {
          path: "/product/:id",
          element: <ProductDetails />
        },

        {
          path: "/category/:id",
          element: <Category />
        },

        {
          path: "/signup",
          element: <SignUp />
        },

        {
          path: "/login",
          element: <Login />
        },

        {
          path: "/wishlist",
          element: <Wishlist />
        },

        {
          path: "/cart",
          element: <PrivateRoute><Cart /></PrivateRoute>
        },


        {
          path: "/faqs",
          element: <Faq />
        },

        {
          path: "/faqs/:id",
          element: <FaqsDetails />
        },

        {
          path: "/faqs/search/:id",
          element: <FaqsSearchResult />
        },
        
        {
          path: "*",
          element: <ErrorPage />
        },

        {
          path: "/reset-password",
          element: <ResetPassword />
        },

        {
          path: "/dashboard",
          element: <Dashboard />
        },

        {
          path: "/track-order",
          element: <TrackOrder />
        },

        {
          path: "/support",
          element: <Support />
        },

        {
          path: "/terms-conditions",
          element: <Terms />
        }

        

    ],
    
  },
  {
    path: "/admin",
    element: <Admin />
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      
      </Provider>   
    </AuthProvider>


  
)
