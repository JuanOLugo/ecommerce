import React, { useState } from "react";
import { Authentication } from "../../Utils/Auth.connection";
import { NavLink } from "react-router-dom";
function Auth() {
  const Authenticator = new Authentication("http://localhost:3000");

  const [AuthState, setAuthState] = useState(true);
  const [EmailState, setEmailState] = useState("");
  const [PasswordState, setPasswordState] = useState("");
  const [ErrorMsg, setErrorMsg] = useState(null);

  const ErrorHandler = (message, time_message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, time_message);
  };

  const data = {
    name: "jua",
    age: 12
  }


  const autoDefaultStates = ({...states}) => {
    console.log(states)
    const statesToArray = Object.keys(states)
    statesToArray.forEach(state => {
      states[state]("")
    })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (EmailState.length < 3 || PasswordState.length < 3)
      return ErrorHandler("Rellene las credenciales", 2000);

     if (!AuthState) {
       //Register
       const user_data = { EmailState, PasswordState };
       const AuthenticatorResponse = await Authenticator.register(user_data);
       console.log(AuthenticatorResponse);
     } else {
       //Login
       const user_data = { EmailState, PasswordState };
       const AuthenticatorResponse = await Authenticator.login(user_data);
       console.log(AuthenticatorResponse);
     }

    autoDefaultStates({
      EmailState: (DATA) => setEmailState(DATA),
      PasswordState: (DATA) => setPasswordState(DATA)
    })
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="absolute top-5 left-5  text-indigo-500 font-bold">
        <h1>
          <NavLink to="/public">Ir atras</NavLink>
        </h1>
      </div>
      <div className="w-80">
        <div>
          <h1 className="text-2xl font-bold text-indigo-500 my-5">
            E-Commerce
          </h1>
        </div>
        <form onSubmit={HandleSubmit}>
          <div>
            <h1>Correo Electronico</h1>
            <input
              type="email"
              required
              value={EmailState}
              placeholder="..."
              min={4}
              max={25}
              onChange={(e) => setEmailState(e.target.value)}
              className="outline-none w-full border rounded-md mt-2 px-2 py-1"
            />
          </div>
          <div>
            <h1>Contraseña</h1>
            <input
              type="password"
              required
              value={PasswordState}
              placeholder="..."
              min={4}
              max={25}
              onChange={(e) => setPasswordState(e.target.value)}
              className="outline-none w-full border rounded-md mt-2 px-2 py-1"
            />
          </div>

          <div className="my-2">
            <button
              name="submit_button"
              className="bg-indigo-500 w-full py-2 text-white px-2 rounded-md "
            >
              {AuthState ? "Inicia Sesion" : "Registrate"}
            </button>
          </div>
          <div className=" w-full text-center  h-9">
            <h1 className="  text-red-500  ">{ErrorMsg}</h1>
          </div>
        </form>

        <div className="w-full text-center">
          <h1>
            {AuthState ? "¿No tienes una cuenta?" : "OH! Ya tienes una cuenta"}{" "}
            <label
              className="bg-indigo-500 text-white  px-3 py-1 rounded-md cursor-pointer"
              onClick={() => setAuthState(!AuthState)}
            >
              {AuthState ? "Registrate" : "Inicia sesion"}
            </label>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Auth;
