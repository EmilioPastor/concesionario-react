import { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <div className="position-relative mb-4">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Buscar por modelo, marca, año..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2"
        />
      </Form>
    </div>
  );
};

export default SearchBar;