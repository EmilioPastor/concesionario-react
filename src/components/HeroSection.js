import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <video autoPlay muted loop playsInline className="hero-video">
        <source src="/videos/mercedes.mp4" type="video/mp4" />
        <img src="/imagenes/mercedes.jpg" alt="Vehículos de lujo" />
        Tu navegador no soporta vídeos HTML5.
      </video>
      <div className="hero-content">
        <h1 className="hero-title">Descubre tu próximo vehículo</h1>
        <p className="hero-subtitle">Calidad y elegancia a tu alcance</p>
            {/* <div className="scroll-indicator"></div> */}
      </div>
    </section>
  );
};

export default HeroSection;