import { Container, Row, Alert } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import CarCard from './CarCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Tus Vehículos Favoritos</h1>
      
      {favorites.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favorites.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          Aún no tienes vehículos favoritos
        </Alert>
      )}
    </Container>
  );
};

export default FavoritesPage;