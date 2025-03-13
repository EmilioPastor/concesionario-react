import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import CarCard from './CarCard';
import FilterPanel from './FilterPanel';
import SearchBar from './SearchBar';

const CarList = ({ filters, setFilters, cars }) => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    const processData = () => {
      try {
        let results = [...cars];

        // Búsqueda global
        if (filters.modelo) {
          const searchTerm = filters.modelo.toLowerCase();
          results = results.filter(car =>
            car.modelo.toLowerCase().includes(searchTerm) ||
            car.marca.toLowerCase().includes(searchTerm) ||
            car.fecha.includes(searchTerm) ||
            car.combustible.toLowerCase().includes(searchTerm)
          );
        }

        // Filtros
        if (filters.marca.length > 0) {
          results = results.filter(car => filters.marca.includes(car.marca));
        }
        if (filters.combustible.length > 0) {
          results = results.filter(car => filters.combustible.includes(car.combustible));
        }
        results = results.filter(car => 
          car.precio >= (filters.precio_min || 0) && 
          car.precio <= (filters.precio_max || 100000)
        );

        // Ordenación
        results.sort((a, b) => {
          if (filters.ordenar === 'precio') {
            return filters.direccion === 'asc' ? a.precio - b.precio : b.precio - a.precio;
          }
          if (filters.ordenar === 'kilometros') {
            return filters.direccion === 'asc' ? a.kilometros - b.kilometros : b.kilometros - a.kilometros;
          }
          if (filters.ordenar === 'fecha') {
            return filters.direccion === 'asc' 
              ? new Date(a.fecha) - new Date(b.fecha) 
              : new Date(b.fecha) - new Date(a.fecha);
          }
          return 0;
        });

        setFilteredCars(results);
        setError(null);
      } catch (err) {
        setError('Error procesando los datos');
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    if (cars.length > 0) {
      processData();
    } else {
      setLoading(false);
    }
  }, [cars, filters]);

  const resetFilters = () => {
    setFilters({
      marca: [],
      combustible: [],
      precio_min: 0,
      precio_max: 100000,
      modelo: '',
      ordenar: 'precio',
      direccion: 'asc'
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={3} className="mb-4">
          <FilterPanel
            brands={[...new Set(cars.map(car => car.marca))]}
            fuels={[...new Set(cars.map(car => car.combustible))]}
            filters={filters}
            setFilters={setFilters}
          />
        </Col>

        <Col lg={9}>
          <SearchBar 
            onSearch={(query) => setFilters({ ...filters, modelo: query })}
          />
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 results-count">
              {filteredCars.length} resultados
              {filters.modelo && ` para "${filters.modelo}"`}
            </h4>
            <Button 
              variant="outline-danger" 
              onClick={resetFilters}
              disabled={
                !filters.marca?.length &&
                !filters.combustible?.length &&
                filters.precio_min === 0 &&
                filters.precio_max === 100000 &&
                !filters.modelo &&
                filters.ordenar === 'precio' &&
                filters.direccion === 'asc'
              }
            >
              Reiniciar Filtros
            </Button>
          </div>

          <Row xs={1} md={2} xl={3} className="g-4">
            {filteredCars.map(car => (
              <Col key={car.id}>
                <CarCard 
                  car={car}
                  isFavorite={favorites.some(f => f.id === car.id)}
                />
              </Col>
            ))}
          </Row>

          {filteredCars.length === 0 && (
            <Alert variant="info" className="mt-4 text-center">
              No se encontraron vehículos con los criterios seleccionados.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CarList;