import { Alert } from 'react-bootstrap';
import { useReservation } from '../context/ReservationContext';

const Confirmation = () => {
  const { reservation } = useReservation();

  return (
    <div className="confirmation-details">
      <Alert variant="success" className="text-center">
        <h4>✅ Reserva Confirmada</h4>
        <p className="mb-0">Recibirás un email con los detalles</p>
      </Alert>

      <div className="confirmation-grid mt-4">
        <div className="confirmation-item">
          <span>Vehículo:</span>
          <strong>{reservation.car?.brand} {reservation.car?.model}</strong>
        </div>
        <div className="confirmation-item">
          <span>Precio Total:</span>
          <strong>{reservation.car?.price.toLocaleString()} €</strong>
        </div>
        <div className="confirmation-item">
          <span>Nombre:</span>
          <strong>{reservation.userInfo?.fullName}</strong>
        </div>
        <div className="confirmation-item">
          <span>Email:</span>
          <strong>{reservation.userInfo?.email}</strong>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;