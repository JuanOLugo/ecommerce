import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContex";

function Home() {
  const USERTOKEN = localStorage.getItem("USER");
  const {user} = useContext(UserContext)

  
  return (
    <div>
   

    </div>
  );
}

export default Home;
