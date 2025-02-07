import React, { useState } from 'react';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout; 