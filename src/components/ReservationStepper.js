import { useState } from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import UserForm from './UserForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';
import { useReservation } from '../context/ReservationContext';
import { createCar } from '../api';
import '../styles/ReservationStepper.css';

const ReservationStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);
  const { reservation } = useReservation();

  const steps = [
    { title: 'Datos Personales', component: <UserForm /> },
    { title: 'Método de Pago', component: <PaymentForm /> },
    { title: 'Confirmación', component: <Confirmation /> }
  ];

  const handleNext = () => setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

  const handleFinalSubmit = async () => {
    try {
      await createCar({
        marca: reservation.car.marca,
        modelo: reservation.car.modelo,
        precio: reservation.car.precio,
        combustible: reservation.car.combustible,
        kilometros: reservation.car.kilometros,
        foto: reservation.car.foto,
        disponible: false
      });
      setActiveStep(3);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reservation-stepper p-4">
      <Row className="stepper-header mb-4">
        {steps.map((step, index) => (
          <Col key={index} className="stepper-step">
            <div className={`step-circle ${index === activeStep ? 'active' : ''}`}>
              {index + 1}
            </div>
            <div className="step-title">{step.title}</div>
          </Col>
        ))}
      </Row>

      <div className="step-content">
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
        {steps[activeStep].component}
      </div>

      <div className="stepper-buttons mt-4 d-flex justify-content-between">
        <Button 
          variant="outline-secondary" 
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Anterior
        </Button>
        
        {activeStep < steps.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>
            Siguiente
          </Button>
        ) : (
          <Button 
            variant="success" 
            onClick={handleFinalSubmit}
            disabled={!reservation.payment?.cardNumber}
          >
            Confirmar Reserva
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReservationStepper;