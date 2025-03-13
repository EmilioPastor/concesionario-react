import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { ReservationProvider } from './context/ReservationContext';
import { fetchCars } from './api';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCars from './components/FeaturedCars';
import CarList from './components/CarList';
import FavoritesPage from './components/FavoritesPage';
import ContactForm from './components/Form';
import Graphs from './components/Graphs';
import CarDetail from './components/CarDetail';
import ReservationStepper from './components/ReservationStepper';
import UploadForm from './components/UploadForm';
import './styles/App.css';

function App() {
  const [globalFilters, setGlobalFilters] = useState({
    marca: [],
    combustible: [],
    precio_min: 0,
    precio_max: 100000,
    modelo: '',
    ordenar: 'precio',
    direccion: 'asc'
  });

  const [destacados, setDestacados] = useState([]);
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setAllCars(data);
        setDestacados(data.slice(0, 4));
      } catch (error) {
        console.error('Error cargando coches:', error);
      }
    };
    loadCars();
  }, []);

  return (
    <ReservationProvider>
      <FavoritesProvider>
        <Router>
          <Header />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <HeroSection />
                    <FeaturedCars cars={destacados} />
                    <CarList 
                      filters={globalFilters}
                      setFilters={setGlobalFilters}
                      cars={allCars}
                    />
                  </>
                } 
              />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/contacto" element={<ContactForm />} />
              <Route path="/estadisticas" element={<Graphs activeFilters={globalFilters} />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/reservar" element={<ReservationStepper />} />
              <Route path="/subir" element={<UploadForm setAllCars={setAllCars} />} />
            </Routes>
          </main>
        </Router>
      </FavoritesProvider>
    </ReservationProvider>
  );
}

export default App;