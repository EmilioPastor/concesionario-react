import { Form } from 'react-bootstrap';

const FilterPanel = ({ brands = [], fuels = [], filters = {}, setFilters = () => {} }) => {
  const MIN_PRICE = 0;
  const MAX_PRICE = 100000;

  const handlePriceChange = (type, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    
    // Validación cruzada
    if (type === 'precio_min' && numValue > (filters.precio_max || MAX_PRICE)) {
      setFilters({ ...filters, precio_min: numValue, precio_max: numValue });
    } else if (type === 'precio_max' && numValue < (filters.precio_min || MIN_PRICE)) {
      setFilters({ ...filters, precio_max: numValue, precio_min: numValue });
    } else {
      setFilters({ ...filters, [type]: numValue });
    }
  };

  return (
    <div className="filter-panel">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold text-secondary mb-3">Ordenar por</Form.Label>
          <Form.Select
            className="form-select-lg"
            value={`${filters.ordenar}_${filters.direccion}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('_');
              setFilters({ ...filters, ordenar: field, direccion: order });
            }}
          >
            <option value="precio_asc">Precio: Menor a Mayor</option>
            <option value="precio_desc">Precio: Mayor a Menor</option>
            <option value="kilometros_asc">Kilómetros: Bajo a Alto</option>
            <option value="fecha_desc">Más Recientes Primero</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold text-secondary mb-3">Rango de Precio (€)</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Mínimo"
              value={filters.precio_min || ''}
              onChange={(e) => handlePriceChange('precio_min', e.target.value)}
              min="0"
              className="form-control-lg"
            />
            <Form.Control
              type="number"
              placeholder="Máximo"
              value={filters.precio_max || ''}
              onChange={(e) => handlePriceChange('precio_max', e.target.value)}
              min={filters.precio_min || 0}
              className="form-control-lg"
            />
          </div>
          <div className="d-flex justify-content-between mt-2 text-muted">
            <small>Rango: {MIN_PRICE.toLocaleString()} - {MAX_PRICE.toLocaleString()} €</small>
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold text-secondary mb-3">Marcas</Form.Label>
          <div className="d-flex flex-column gap-2">
            {brands.map(brand => (
              <Form.Check 
                key={brand}
                type="checkbox"
                label={brand}
                checked={filters.marca.includes(brand)}
                onChange={(e) => {
                  const newMarcas = e.target.checked
                    ? [...filters.marca, brand]
                    : filters.marca.filter(m => m !== brand);
                  setFilters({ ...filters, marca: newMarcas });
                }}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="fw-bold text-secondary mb-3">Combustibles</Form.Label>
          <div className="d-flex flex-column gap-2">
            {fuels.map(fuel => (
              <Form.Check 
                key={fuel}
                type="checkbox"
                label={fuel}
                checked={filters.combustible.includes(fuel)}
                onChange={(e) => {
                  const newCombustibles = e.target.checked
                    ? [...filters.combustible, fuel]
                    : filters.combustible.filter(c => c !== fuel);
                  setFilters({ ...filters, combustible: newCombustibles });
                }}
              />
            ))}
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FilterPanel;