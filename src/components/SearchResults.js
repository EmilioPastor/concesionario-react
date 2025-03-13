import { useLocation } from 'react-router-dom';
import CarList from './CarList';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  return (
    <div className="search-results">
      <h2 className="text-center mb-5">
        Búsqueda: <em className="text-primary">"{query}"</em>
      </h2>
      <CarList initialSearchQuery={query} />
    </div>
  );
};

export default SearchResults;