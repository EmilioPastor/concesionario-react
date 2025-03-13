import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { fetchCars } from '../api';
import '../styles/Graphs.css';

ChartJS.register(...registerables);

const Graphs = ({ activeFilters }) => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCars();
        setCarsData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeFilters]);

  const processData = () => {
    const brandsDistribution = {};
    const fuelDistribution = {};
    const priceRanges = { 
      '0-20k': { name: '0 - 20k €', value: 0 },
      '20k-40k': { name: '20k - 40k €', value: 0 },
      '40k+': { name: 'Más de 40k €', value: 0 }
    };

    carsData.forEach(car => {
      brandsDistribution[car.marca] = (brandsDistribution[car.marca] || 0) + 1;
      fuelDistribution[car.combustible] = (fuelDistribution[car.combustible] || 0) + 1;
      
      if (car.precio <= 20000) priceRanges['0-20k'].value++;
      else if (car.precio <= 40000) priceRanges['20k-40k'].value++;
      else priceRanges['40k+'].value++;
    });

    return {
      brands: Object.entries(brandsDistribution)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      fuels: Object.entries(fuelDistribution)
        .map(([name, value]) => ({ name, value })),
      prices: Object.values(priceRanges)
    };
  };

  const { brands, fuels, prices } = processData();
  const colors = ['#1a365d', '#2c5282', '#ecc94b', '#48bb78', '#f56565'];

  // Datos para Chart.js
  const brandsChartData = {
    labels: brands.map(b => b.name),
    datasets: [{
      label: 'Vehículos por Marca',
      data: brands.map(b => b.count),
      backgroundColor: '#2c5282',
      borderColor: '#1a365d',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  const fuelsChartData = {
    labels: fuels.map(f => f.name),
    datasets: [{
      data: fuels.map(f => f.value),
      backgroundColor: colors,
      borderColor: '#fff',
      borderWidth: 2,
    }]
  };

  const pricesChartData = {
    labels: prices.map(p => p.name),
    datasets: [{
      label: 'Vehículos por Rango de Precio',
      data: prices.map(p => p.value),
      backgroundColor: '#ecc94b',
      borderColor: '#d6a41e',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  return (
    <div className="graphs-container container mt-5">
      <h2 className="text-center mb-5 display-5 fw-bold text-primary">
        Análisis del Mercado
      </h2>
      
      <div className="row g-4">
        {/* Gráfico de Marcas */}
        <div className="col-12 col-lg-6">
          <div className="chart-card p-4 shadow-lg rounded-3">
            <h5 className="fw-bold mb-4 text-secondary">Top 5 Marcas</h5>
            <Bar 
              data={brandsChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { 
                    backgroundColor: '#ffffff',
                    titleColor: '#2d3748',
                    bodyColor: '#4a5568',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Gráfico de Combustibles */}
        <div className="col-12 col-lg-6">
          <div className="chart-card p-4 shadow-lg rounded-3">
            <h5 className="fw-bold mb-4 text-secondary">Distribución de Combustibles</h5>
            <Pie 
              data={fuelsChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { 
                    position: 'right',
                    labels: { font: { size: 14 } }
                  },
                  tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#2d3748',
                    bodyColor: '#4a5568',
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Gráfico de Precios */}
        <div className="col-12">
          <div className="chart-card p-4 shadow-lg rounded-3">
            <h5 className="fw-bold mb-4 text-secondary">Distribución de Precios</h5>
            <Bar 
              data={pricesChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { 
                    backgroundColor: '#ffffff',
                    titleColor: '#2d3748',
                    bodyColor: '#4a5568',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;