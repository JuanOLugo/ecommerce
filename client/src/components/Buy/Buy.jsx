import React, { useEffect, useRef, useState } from "react";
import { categories } from "../../Utils/Categories";
function Buy() {
  const reff = useRef(null);
  const [File, setFile] = useState(null);
  const [Precio, setPrecio] = useState("");
  const [Description, setDescription] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Category, setCategory] = useState("");
  const formData = new FormData();

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      setFile(file);
    }
  };

  const handleSubmit = () => {
    if (
      Precio > 0 &&
      ProductName.length > 2 &&
      Category.length > 2 &&
      File != null
    ) {
      formData.append("file", File);
      formData.append(
        "data",
        JSON.stringify({
          precio: Precio,
          desc: Description,
          name: ProductName,
          categorie: Category,
        })
      );

    }else alert("falta")
  };

  return (
    <div className="relative top-10 w-4/5 mx-auto bg-indigo-400 rounded-md ">
      <div className="flex items-center  ">
        <div>
          <div className="my-3 mx-5">
            <h1 className="text-white font-bold">Nombre de producto</h1>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              value={ProductName}
              className="w-96 px-1 outline-indigo-500 rounded-md h-9 mt-2"
              placeholder="Ingresa un texto"
            />
          </div>
          <div className="my-3 mx-5">
            <h1 className="text-white font-bold">Descripcion</h1>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
              placeholder="Ingresa un texto"
              className="w-96 px-1 rounded-md h-9 mt-2 outline-indigo-500"
            />
          </div>
          <div className="my-3 mx-5">
            <h1 className="text-white font-bold">Precio de venta</h1>
            <input
              type="number"
              onChange={(e) => setPrecio(e.target.value)}
              value={Precio}
              placeholder="Ingresa un numero"
              className="w-96 px-1 rounded-md h-9 mt-2 outline-indigo-500"
            />
          </div>
          <div className="my-3 mx-5">
            <h1 className="text-white font-bold">Tipo de producto</h1>
            <select
              name=""
              id=""
              onChange={(e) => setCategory(e.target.value)}
              value={Category}
              className="w-96 px-1  rounded-md h-9 mt-2"
            >
              <option value="">Seleccione una opcion</option>
              {categories.map((categorie) => {
                return (
                  <option key={categorie.id + new Date()} value={categorie.name}>
                    {categorie.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-full">
          <div
            className="cursor-pointer h-96 border border-dashed bg-neutral-700  m-5 text-white flex items-center justify-center"
            onClick={() => {
              reff.current.click();
            }}
          >
            <div className="text-center font-bold bg-indigo-500 p-5 rounded-md border-dashed border">
              <h1 className="uppercase">Sube tu archivo</h1>
              <h1 className="text-5xl ">+</h1>
            </div>
          </div>
          <input
            type="file"
            onChange={handleInputFile}
            ref={reff}
            accept="image/*"
            name=""
            id=""
            className="hidden"
          />
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <button
          className="mt-5 mb-3 rounded-md font-semibold  bg-white text-indigo-500 w-96  py-2 "
          onClick={handleSubmit}
        >
          Guardar producto
        </button>
      </div>
    </div>
  );
}

export default Buy;
