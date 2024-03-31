import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authServices } from "../../api/auth/auth.service";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.JSX.Element;
  allowedRoles: string[];
}) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAllowed(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await authServices.validateToken(token);
        const { role } = response.data;
        if (allowedRoles.includes(role.description)) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);

        setIsAllowed(false);
      }

      setIsLoading(false);
    };

    validateToken();
  }, [allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAllowed && !localStorage.getItem("token")) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return isAllowed ? (
    children
  ) : (
    <Navigate
      to="/error"
      replace
      state={{ from: location, errorType: "unauthorized" }}
    />
  );
};
