import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(true);
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated };
};
