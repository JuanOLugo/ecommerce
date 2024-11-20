import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Authentication } from '../../Utils/Auth.connection';
import { UserContext } from '../../Context/UserContex';

function ProtectedRouteObserver() {

    const USER = localStorage.getItem("USER");
    const { user, setuser } = useContext(UserContext);
    useEffect(() => {
      if (USER) {
        const auth = new Authentication("http://localhost:3000");
        const result = new Promise((resolve, reject) => resolve(auth.auto_login(USER)))
        result.then((res) => {
          setuser(res.data.data);
        });
      }
    }, []);
  

  return <Outlet/>
}

export default ProtectedRouteObserver