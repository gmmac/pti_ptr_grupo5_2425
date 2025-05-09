import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Exemplo de chamada a API pública
    fetch('https://jsonplaceholder.typicode.com/todos/3')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-2xl mb-4">Contador: {count}</h1>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="px-4 py-2 text-base rounded bg-blue-500 hover:bg-blue-600 text-white"
      >
        Incrementar
      </button>

      <div className="mt-8 w-3/4 max-w-md bg-white shadow-lg rounded p-4">
        <h2 className="text-xl mb-2">Dados da API:</h2>
        {loading && <p>Carregando dados...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}
        {data && (
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}