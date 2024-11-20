import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContex";

function Logout() {
  const [Session, setSession] = useState("a");
  const {setuser} = useContext(UserContext)
  const { token } = useParams();
  const close_session = (setter) => {
    if (token == localStorage.getItem("USER")) {
      localStorage.removeItem("USER");
      setuser(null)
      return setter(true);
    } else return setter(true);
  };

  useEffect(() => {
    close_session(setSession);
  }, []);

  return Session == true ? (
    <Navigate to={"/"} />
  ) : (
    <>
      <div>
        <h1>Cerrando sesion</h1>
      </div>
    </>
  );
}

export default Logout;
