import React, { createContext, useContext, useState } from "react";

const StatusContext = createContext();

export const useStatus = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState({
    assessment: "",
    message: "",
  });

  const setStatusData = ({ assessment, message }) =>
    setStatus({ assessment, message });

  return (
    <StatusContext.Provider value={{ status, setStatusData }}>
      {children}
    </StatusContext.Provider>
  );
};
