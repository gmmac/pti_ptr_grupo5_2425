import React, { createContext, useState, useContext } from 'react';

const InterestsFilterContext = createContext();

export const InterestsFilterProvider = ({ children }) => {

  const [filters, setFilters] = useState({
    name: '',
    clientNIC: '',
    orderBy: 'createdAt',
    orderDirection: 'DESC'
  });

  return (
    <InterestsFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </InterestsFilterContext.Provider>
  );
};

export const useFilter = () => useContext(InterestsFilterContext);
