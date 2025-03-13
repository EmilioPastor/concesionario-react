// src/context/ReservationContext.js
import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState({
    car: null,
    userInfo: {},
    payment: {},
    step: 1
  });

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);