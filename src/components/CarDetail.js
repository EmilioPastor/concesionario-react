import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchCarById } from '../api';
import { useReservation } from '../context/ReservationContext';
import '../styles/CarDetails.css';

const DEFAULT_IMAGE = '/images/no-car.jpg';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setReservation } = useReservation();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const data = await fetchCarById(id);
        setCar(data);
      } catch (err) {
        setError(err.message || 'Error al cargar el coche');
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  const handleReservationStart = () => {
    if (!car) return;

    setReservation(prev => ({
      ...prev,
      car: {
        id: car.id,
        brand: car.marca,      // Usar propiedades de la API
        model: car.modelo,
        price: car.precio,
        fuel: car.combustible,
        km: car.kilometros,
        image: car.foto || DEFAULT_IMAGE  // Usar 'foto' en lugar de 'images'
      }
    }));
    navigate('/reservar');
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;
  if (!car) return <Alert variant="warning" className="mt-4">Coche no encontrado</Alert>;

  // Variables seguras
  const images = car.foto ? [car.foto] : [DEFAULT_IMAGE]; // Si la API solo devuelve 'foto' como string
  const mainImage = images[selectedImage] || DEFAULT_IMAGE;

  return (
    <Container className="car-detail my-5">
      <Row className="g-4 mb-4">
        <Col md={8}>
          <div className="main-image-container shadow-lg">
            <img 
              src={mainImage}
              alt={car.modelo} 
              className="main-image img-fluid rounded-3"
              onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
            />
          </div>
          
          <div className="thumbnails mt-4">
            {images.map((img, index) => (
              <button 
                key={index}
                className={`thumbnail-btn ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                
              </button>
            ))}
          </div>
        </Col>

        <Col md={4}>
          <div className="specs-card p-4 shadow-lg rounded-3">
            <h1 className="display-5 mb-4">{car.marca} {car.modelo}</h1>
            
            <div className="specs-grid mb-4">
              <div className="spec-item">
                <span className="spec-label">Año</span>
                <span className="spec-value">{new Date(car.fecha).getFullYear() || 'N/A'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Combustible</span>
                <span className="spec-value">{car.combustible}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Kilómetros</span>
                <span className="spec-value">{car.kilometros?.toLocaleString('es-ES') || '0'} km</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Disponible</span>
                <span className="spec-value">{car.disponible ? 'Sí' : 'No'}</span>
              </div>
            </div>

            <div className="price-container bg-light p-3 rounded-3 text-center mb-4">
              <span className="text-muted d-block">Precio Final</span>
              <h2 className="text-primary mb-0">
                {car.precio?.toLocaleString('es-ES') || '0'} €
              </h2>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-100 py-3 fw-bold"
              onClick={handleReservationStart}
              disabled={!car.disponible}
            >
              {car.disponible ? '🚗 Reservar Ahora' : 'No Disponible'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;