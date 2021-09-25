import { useState } from "react";

export const useToken = () => {
  // function that return local storage token
  const geToken = () => localStorage.getItem("token");

  // Intial token with existing local storage token
  const [token, setTokenInternal] = useState(geToken);

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
