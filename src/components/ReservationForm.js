import { useState } from 'react';
import { Form, Button, ProgressBar, Alert } from 'react-bootstrap';

const ReservationForm = ({ car }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'transfer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      console.log('Reserva confirmada:', { car, ...formData });
      // Aquí iría la conexión con la API
    }
  };

  return (
    <div className="reservation-form p-4">
      <ProgressBar now={(step/3)*100} className="mb-4" />
      
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h4 className="mb-4">📝 Tus Datos</h4>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Form.Group>
          </>
        )}

        {step === 2 && (
          <>
            <h4 className="mb-4">📱 Contacto</h4>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </Form.Group>
          </>
        )}

        {step === 3 && (
          <>
            <h4 className="mb-4">💳 Método de Pago</h4>
            <Form.Group className="mb-4">
              <Form.Select 
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              >
                <option value="transfer">Transferencia Bancaria</option>
                <option value="credit">Tarjeta de Crédito</option>
              </Form.Select>
            </Form.Group>
            
            <Alert variant="success" className="text-center">
              <h5>{car.brand} {car.model}</h5>
              <p className="mb-0">Precio Final: {car.price.toLocaleString()} €</p>
            </Alert>
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <Button variant="outline-secondary" onClick={() => setStep(prev => prev - 1)}>
              ← Anterior
            </Button>
          )}
          <Button type="submit" variant="primary">
            {step === 3 ? 'Confirmar Reserva' : 'Continuar →'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ReservationForm;