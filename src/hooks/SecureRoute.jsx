import React, { useEffect, useState } from "react";
import { useUserAuthorization } from "../hooks/UserAuthorization.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const SecureRoute = ({ userLevel: userLevel, element: element }) => {
  const { user, isLoadingUser, userLogout } = useUserAuthorization();
  const [ isAllowed, setIsAllowed ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoadingUser) {
      if (!user) {
        userLogout();
        navigate("/login");
      } else {
        const rola = user?.rola;
        if (!rola) {
          userLogout();
          navigate("/login");
        } else if (rola === userLevel) {
          if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
            navigate("/dashboard/parking");
          }
        } else {
          userLogout();
          navigate("/login");
        }
      }
    }
  }, [isLoadingUser]);

  return (
    !isLoadingUser ? (
      !isAllowed ? element : <></>
    ) : <></>
  );
};

export default SecureRoute;
