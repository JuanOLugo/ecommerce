import React, { useContext, useEffect, useState } from "react";
import { Authentication } from "../../Utils/Auth.connection";
import { NavLink, useNavigate } from "react-router-dom";
import { autoDefaultStates } from "../../Utils/AutoDefaultStates";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { AutoSetLogin } from "../../Utils/AutoSetLogin";
import { UserContext } from "../../Context/UserContex";
function Auth() {
  const Authenticator = new Authentication("http://localhost:3000");

  const [AuthState, setAuthState] = useState(true);
  const [EmailState, setEmailState] = useState("");
  const [PasswordState, setPasswordState] = useState("");
  const [ErrorMsg, setErrorMsg] = useState(null);
  const { user, setuser } = useContext(UserContext);
  const navigator = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (EmailState.length < 3 || PasswordState.length < 3)
      return ErrorHandler("Rellene las credenciales", 2000);

    if (AuthState) {
      //Register
      const user_data = { Email: EmailState, Password: PasswordState };
      const AuthenticatorResponse = await Authenticator.register(user_data);
      const validation = AutoSetLogin(AuthenticatorResponse.userdata.TOKEN);
      setuser(AuthenticatorResponse.userdata.data);
      console.log(AuthenticatorResponse)
      if (validation) {
        navigator("/");
      }
    } else {
      //Login
      const user_data = { email: EmailState, password: PasswordState };
      try {
        const AuthenticatorResponse = await Authenticator.login(user_data);
        if (AuthenticatorResponse.status != 404) {
          const validation = AutoSetLogin(AuthenticatorResponse.data.TOKEN);
          setuser(AuthenticatorResponse.data.data);
          if (validation) {
            navigator("/");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    //autoDefaultStates({
    // EmailState: (DATA) => setEmailState(DATA),
    // PasswordState: (DATA) => setPasswordState(DATA),
    //});
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
              {AuthState ? "Registrate" : "Inicia Sesion"}
            </button>
          </div>
          <div className=" w-full text-center  h-9">
            <h1 className="  text-red-500  ">{ErrorMsg}</h1>
          </div>
        </form>

        <div className="w-full text-center">
          <h1>
            {AuthState ? "OH! Ya tienes una cuenta" : "¿No tienes una cuenta?"}{" "}
            <label
              className="bg-indigo-500 text-white  px-3 py-1 rounded-md cursor-pointer"
              onClick={() => setAuthState(!AuthState)}
            >
              {AuthState ? "Inicia sesion" : "Registrate"}
            </label>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Auth;
