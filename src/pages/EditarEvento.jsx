import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarEvento, obtenerEventoPorId } from "../api/eventosApi";

function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState({
    titulo: "",
    tipo: "Conferencia",
    fecha: "",
    hora: "",
    lugar: "",
    descripcion: "",
    ponente: "",
    cupos: ""
  });

  useEffect(() => {
    const cargarEvento = async () => {
      const respuesta = await obtenerEventoPorId(id);
      setEvento(respuesta.data);
    };

    cargarEvento();
  }, [id]);

  const handleChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await actualizarEvento(id, {
      ...evento,
      cupos: Number(evento.cupos)
    });

    navigate("/eventos");
  };

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Editar evento</h1>
          <p>Actualiza la información del evento académico.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Título</label>
        <input name="titulo" value={evento.titulo} onChange={handleChange} required />

        <label>Tipo</label>
        <select name="tipo" value={evento.tipo} onChange={handleChange}>
          <option>Conferencia</option>
          <option>Taller</option>
          <option>Seminario</option>
          <option>Charla</option>
        </select>

        <label>Fecha</label>
        <input type="date" name="fecha" value={evento.fecha} onChange={handleChange} required />

        <label>Hora</label>
        <input type="time" name="hora" value={evento.hora} onChange={handleChange} required />

        <label>Lugar</label>
        <input name="lugar" value={evento.lugar} onChange={handleChange} required />

        <label>Ponente</label>
        <input name="ponente" value={evento.ponente} onChange={handleChange} required />

        <label>Cupos</label>
        <input type="number" name="cupos" value={evento.cupos} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="descripcion" value={evento.descripcion} onChange={handleChange} required />

        <button className="btn-primary" type="submit">
          Guardar cambios
        </button>
      </form>
    </main>
  );
}

export default EditarEvento;