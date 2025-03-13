import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (car) => {
    if (!favorites.some(fav => fav.id === car.id)) {
      setFavorites(prev => [...prev, car]);
      // Animación
      const heartElement = document.getElementById(`heart-${car.id}`);
      if (heartElement) {
        heartElement.classList.add('animate-like');
        setTimeout(() => heartElement.classList.remove('animate-like'), 1000);
      }
    }
  };

  const removeFromFavorites = (carId) => {
    setFavorites(prev => prev.filter(car => car.id !== carId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);