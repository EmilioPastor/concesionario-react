import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createCar } from '../api';
import '../styles/UploadForm.css';

const DEFAULT_IMAGE = '/images/no-car.jpg';

const UploadForm = ({ setAllCars }) => {
  const [formData, setFormData] = useState({
    matricula: '',
    marca: '',
    modelo: '',
    precio: '',
    combustible: 'Gasolina',
    kilometros: '',
    fecha: '',
    foto: DEFAULT_IMAGE,
    disponible: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const carData = {
        matricula: formData.matricula,
        marca: formData.marca,
        modelo: formData.modelo,
        precio: Number(formData.precio),
        combustible: formData.combustible,
        kilometros: Number(formData.kilometros),
        fecha: new Date(formData.fecha).toISOString().split('T')[0], // Formato YYYY-MM-DD
        foto: formData.foto,
        disponible: formData.disponible
      };
      const newCar = await createCar(carData);
      setAllCars(prev => [...prev, newCar]);
      setSuccess(true);
      setFormData({
        matricula: '',
        marca: '',
        modelo: '',
        precio: '',
        combustible: 'Gasolina',
        kilometros: '',
        fecha: '',
        foto: DEFAULT_IMAGE,
        disponible: true
      });
    } catch (err) {
      setError(err.message || 'Error al enviar los datos. Verifica los campos.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="upload-form container mt-5">
      <h2 className="mb-4">Añadir Nuevo Vehículo</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Vehículo añadido correctamente!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
            pattern="[0-9]{4}[A-Z]{3}"
            title="Formato: 1234ABC"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio (€)</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            min="0"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Combustible</Form.Label>
          <Form.Select
            name="combustible"
            value={formData.combustible}
            onChange={handleChange}
          >
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Kilómetros</Form.Label>
          <Form.Control
            type="number"
            name="kilometros"
            min="0"
            value={formData.kilometros}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Fabricación</Form.Label>
          <Form.Control
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check 
            type="switch"
            id="disponible"
            label="Disponible"
            checked={formData.disponible}
            onChange={(e) => 
              setFormData({ ...formData, disponible: e.target.checked })
            }
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Añadir Vehículo'}
        </Button>
      </Form>
    </div>
  );
};

export default UploadForm;