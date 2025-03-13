import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCars = ({ cars }) => {
  return (
    <section className="featured-cars py-5">
      <div className="container">
        <h2 className="text-center mb-5 display-4 fw-bold text-primary">
          Vehículos Destacados
        </h2>
        <div className="row g-4">
          {cars.map((car) => (
            <div key={car.id} className="col-12 col-md-6 col-lg-3">
              <div className="featured-card card h-100 shadow-lg border-0">
                <img
                  src={car.foto}
                  alt={`${car.marca} ${car.modelo}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="card-title h5">
                    {car.marca} {car.modelo}
                  </h3>
                  <p className="text-muted mb-3">
                    Desde {car.precio.toLocaleString('es-ES')} €
                  </p>
                  <Link
                    to={`/car/${car.id}`}
                    className="btn btn-primary w-100"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;