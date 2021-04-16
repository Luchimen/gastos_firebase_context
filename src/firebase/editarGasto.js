import { db } from "./firebaseConfig";

const editarGasto = ({ id, cantidad, categoria, descripcion, fecha }) => {
  return db
    .collection("gastos")
    .doc(id)
    .update({
      cantidad: Number(cantidad),
      categoria,
      descripcion,
      fecha,
    });
};

export default editarGasto;
