import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ 
  children, 
  title = 'Ecommerce-store', 
  author = 'ismial abbasi', 
  description = 'Welcome to Ecommerce Store, your premier destination for cutting-edge mobiles, laptops, and more! Dive into our virtual emporium where the latest smartphones, sleek laptops, and an array of other gadgets await your discovery. Our streamlined interface ensures effortless navigation, guiding you to the perfect device to suit your needs. Feel secure as you shop with our robust encryption technology safeguarding every transaction. Keep an eye out for our spontaneous flash sales and exclusive promotions, adding an element of excitement to your shopping experience. With lightning-fast shipping, your new tech companions will arrive promptly at your doorstep, ready to elevate your digital lifestyle. Explore the possibilities at Ecommerce Store today!', 
  keywords = 'ecommerce,mobile,laptop , iphone, ios, androaid ' 
}) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}>{children}</main>
      <ToastContainer />
      <Toaster />
      <Footer />
    </div>
  );
}

export default Layout;
