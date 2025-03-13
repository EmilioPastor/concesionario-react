import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const CarCard = ({ car, isFavorite }) => {
  const { addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('carId', car.id);
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    </Tooltip>
  );

  return (
    <Card 
      className="h-100 shadow-sm car-card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={car.foto || '/images/no-car.jpg'}
          alt={`${car.marca} ${car.modelo}`}
          className="car-image"
          onError={(e) => { e.target.src = '/images/no-car.jpg'; }}
        />
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <Button
            variant={isFavorite ? 'danger' : 'outline-danger'}
            className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            id={`heart-${car.id}`}
          >
            {isFavorite ? '❤️' : '♡'}
          </Button>
        </OverlayTrigger>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 fw-bold text-primary">{car.marca} {car.modelo}</Card.Title>
        <Card.Text className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <span className="text-muted">Año</span>
            <span>{new Date(car.fecha).getFullYear()}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Precio</span>
            <span className="fw-bold">{car.precio?.toLocaleString('es-ES')} €</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Combustible</span>
            <span>{car.combustible}</span>
          </div>
        </Card.Text>
        <Button 
          as={Link} 
          to={`/car/${car.id}`}
          variant="outline-primary" 
          className="w-100 mt-2"
        >
          Ver Detalles
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;