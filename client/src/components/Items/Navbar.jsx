import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContex";
import { NavLink } from "react-router-dom";
import { categories } from "../../Utils/Categories";
function Navbar() {
  const usertoken = localStorage.getItem("USER");
  const { user } = useContext(UserContext);
  const [handlerCategory, sethandlerCategory] = useState(false);
  return (
    <div>
      <div className="flex bg-indigo-500 items-center justify-around  py-2">
        <h1 className="text-2xl text-white font-bold cursor-pointer" title="Ir a home"><NavLink to={"/"}>Ecommerce</NavLink></h1>
        <div>
          <div>
            <input
              type="text"
              className="w-96 px-2 text-black py-2 text-sm font-light rounded-md outline-1 outline-indigo-500"
              placeholder="Busca productos, marcas y mas!"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center bg-indigo-400 py-2 font-sm font-light text-white">
        <div className="flex ">
          <h1
            className="cursor-pointer mx-2"
            onMouseEnter={() => sethandlerCategory(!handlerCategory)}
          >
            Categorias
          </h1>
          <div
            className={`absolute top-28  bg-zinc-800 py-2 rounded-md text-sm ${
              handlerCategory ? "block" : "hidden"
            }`}
            onMouseLeave={() => sethandlerCategory(false)}
          >
            {categories.map((categorie) => {
              return (
                <h1
                  title={categorie.description}
                  className="cursor-pointer hover:bg-indigo-500 px-5 py-2"
                >
                  {categorie.name}
                </h1>
              );
            })}
          </div>

          <h1 className="cursor-pointer mx-2"><NavLink to={"/buy"}>Vender</NavLink></h1>
        </div>
        <div className="flex">
          {usertoken && user ? (
            <>
              <h1 className="cursor-pointer mx-2 text-indigo-950">
                {user.email.charAt(0).toUpperCase() + user.email.slice(1)}
              </h1>
              <h1 className="cursor-pointer mx-2 text-indigo-950">
                <NavLink to={"/logout/" + usertoken}>Logout</NavLink>
              </h1>
            </>
          ) : (
            <h1 className="cursor-pointer mx-2">
              <NavLink to={"/login"}>Ingresa</NavLink>
            </h1>
          )}
          <h1 className="cursor-pointer mx-2"><NavLink to={"/carrito"}>Mi carrito</NavLink></h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
