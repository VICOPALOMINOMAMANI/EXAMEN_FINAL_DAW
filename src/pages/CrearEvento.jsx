import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearEvento } from "../api/eventosApi";

function CrearEvento() {
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

  const handleChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearEvento({
      ...evento,
      cupos: Number(evento.cupos)
    });
    alert("Evento registrado correctamente");
    navigate("/eventos");
  };

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Registrar evento</h1>
          <p>Completa la información del evento académico.</p>
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
          Guardar evento
        </button>
      </form>
    </main>
  );
}

export default CrearEvento;