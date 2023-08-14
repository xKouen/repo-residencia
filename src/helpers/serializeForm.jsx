export const SerializeForm = (form) => {
  //Obtiene los datos del formulario
  const formData = new FormData(form);
  //Crea un objeto vacio
  const obj = {};

  //Recorre los datos del formulario
  for (let [name, value] of formData) {
    obj[name] = value;
  }
  return obj;
};
