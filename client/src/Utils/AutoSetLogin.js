export const AutoSetLogin = (token) => {
  try {
    localStorage.setItem("USER", token);
    return true;
  } catch (error) {
    throw new Error({ message: "Error al agregar item" });
  }
};
export const RemoveLogin = () => {
  try {
    const myRemove = window.localStorage.removeItem("USER");
    return true;
  } catch (error) {
    throw new Error({ message: "Error al remover el item" });
  }
};
