const API_BASE = 'https://apicoches.onrender.com/api/Coches';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }
  return response.json();
};

export const fetchCars = async (filters = {}) => {
  try {
    let url = API_BASE;
    const queryParams = [];

    // Filtros via API
    if (filters.marca?.length > 0) {
      url += `/marca/${encodeURIComponent(filters.marca[0])}`;
    } else if (filters.combustible?.length > 0) {
      url += `/combustible/${encodeURIComponent(filters.combustible[0])}`;
    }

    // Parámetros de precio
    if (filters.precio_min > 0) queryParams.push(`precio_min=${filters.precio_min}`);
    if (filters.precio_max < 100000) queryParams.push(`precio_max=${filters.precio_max}`);
    if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al cargar coches: ' + error.message);
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Coche no encontrado: ' + error.message);
  }
};

export const fetchCarsByModel = async (modelo) => {
  try {
    const response = await fetch(`${API_BASE}/modelo/${encodeURIComponent(modelo)}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error en la búsqueda: ' + error.message);
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...carData,
        disponible: true, // Asume que los nuevos coches están disponibles
        fecha: carData.fecha || new Date().toISOString().split('T')[0]
      })
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al crear el coche: ' + error.message);
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...carData, id: parseInt(id) })
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al actualizar el coche: ' + error.message);
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al eliminar el coche: ' + error.message);
  }
};
