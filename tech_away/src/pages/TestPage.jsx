import React, { useState, useEffect } from 'react';
import api from '../utils/axios';

function WarehouseCard({ warehouse }) {
  return (
    <div className="bg-white shadow-lg rounded p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{warehouse.name}</h3>
      <p className="text-sm">Total Slots: {warehouse.totalSlots}</p>
      <p className="text-sm">Available Slots: {warehouse.availableSlots}</p>
      <p className="text-sm">ID: {warehouse.id}</p>
    </div>
  );
}

export default function App() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/warehouse')
      .then(response => {
        // response.data.data contém os itens
        setWarehouses(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Erro ao buscar armazéns');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Armazéns</h1>

      {loading && <p>Carregando armazéns...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map(wh => (
            <WarehouseCard key={wh.id} warehouse={wh} />
          ))}
        </div>
      )}
    </div>
  );
}