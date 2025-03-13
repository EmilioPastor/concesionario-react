import { Form } from 'react-bootstrap';
import { useReservation } from '../context/ReservationContext';

const UserForm = () => {
  const { reservation, setReservation } = useReservation();

  const handleChange = (e) => {
    setReservation(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [e.target.name]: e.target.value
      }
    }));
  };

  return (
    <div className="user-form">
      <Form.Group className="mb-3">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control
          name="fullName"
          value={reservation.userInfo.fullName || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={reservation.userInfo.email || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={reservation.userInfo.phone || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </div>
  );
};

export default UserForm;