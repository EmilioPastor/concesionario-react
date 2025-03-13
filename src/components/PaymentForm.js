import { Form } from 'react-bootstrap';
import { useReservation } from '../context/ReservationContext';

const PaymentForm = () => {
  const { reservation, setReservation } = useReservation();

  const handlePaymentChange = (e) => {
    setReservation(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [e.target.name]: e.target.value
      }
    }));
  };

  return (
    <div className="payment-form">
      <Form.Group className="mb-3">
        <Form.Label>Número de Tarjeta</Form.Label>
        <Form.Control
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          pattern="\d{16}"
          onChange={handlePaymentChange}
          required
        />
      </Form.Group>

      <div className="row g-3">
        <div className="col-md-6">
          <Form.Label>Fecha de Expiración</Form.Label>
          <Form.Control
            name="expDate"
            placeholder="MM/AA"
            pattern="\d{2}/\d{2}"
            onChange={handlePaymentChange}
            required
          />
        </div>
        
        <div className="col-md-6">
          <Form.Label>CVC</Form.Label>
          <Form.Control
            name="cvc"
            placeholder="123"
            pattern="\d{3}"
            onChange={handlePaymentChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;