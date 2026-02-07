import React, { useEffect, useState } from "react";
import { useUserAuthorization } from "../hooks/UserAuthorization.jsx";
import { useNavigate } from "react-router-dom";

const SecureRoute = ({ userLevel: userLevel, element: element }) => {
  const { user, isLoadingUser, userLogout } = useUserAuthorization();
  const [ isAllowed, setIsAllowed ] = useState(false);
  const navigate = useNavigate();

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
        }
      if (rola === userLevel) {
      navigate("/dashboard/parking")
   
    } else {
      navigate("/login")
      userLogout();
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
