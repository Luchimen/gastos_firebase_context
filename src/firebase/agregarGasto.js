import { db } from "./firebaseConfig";

const agregarGasto = ({ cantidad, categoria, descripcion, fecha, user }) => {
  return db.collection("gastos").add({
    cantidad: Number(cantidad),
    categoria,
    descripcion,
    fecha,
    user,
  });
};

export default agregarGasto;
