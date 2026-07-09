import { useEffect, useState } from "react";
import {
  crearParticipante,
  eliminarParticipante,
  obtenerParticipantes
} from "../api/participantesApi";

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [participante, setParticipante] = useState({
    nombres: "",
    correo: "",
    tipo: "Estudiante"
  });

  const cargarParticipantes = async () => {
    const respuesta = await obtenerParticipantes();
    setParticipantes(respuesta.data);
  };

  useEffect(() => {
    cargarParticipantes();
  }, []);

  const handleChange = (e) => {
    setParticipante({
      ...participante,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearParticipante(participante);
    alert("Participante registrado correctamente.");
    setParticipante({
      nombres: "",
      correo: "",
      tipo: "Estudiante"
    });

    cargarParticipantes();
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este participante?");

    if (confirmar) {
      await eliminarParticipante(id);
      cargarParticipantes();
    }
  };

  const participantesFiltrados = participantes.filter((p) =>
    p.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Participantes</h1>
          <p>Registra, consulta y elimina estudiantes o docentes.</p>
        </div>
      </div>

      <div className="two-columns">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Registrar participante</h2>

          <label>Nombres completos</label>
          <input
            name="nombres"
            value={participante.nombres}
            onChange={handleChange}
            required
          />

          <label>Correo institucional</label>
          <input
            type="email"
            name="correo"
            value={participante.correo}
            onChange={handleChange}
            required
          />

          <label>Tipo</label>
          <select
            name="tipo"
            value={participante.tipo}
            onChange={handleChange}
          >
            <option>Estudiante</option>
            <option>Docente</option>
          </select>

          <button className="btn-primary" type="submit">
            Guardar participante
          </button>
        </form>

        <section>
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar participante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="list-panel">
            {participantesFiltrados.map((p) => (
              <article className="participant-item" key={p.id}>
                <div>
                  <h3>{p.nombres}</h3>
                  <p>{p.correo}</p>
                  <span>{p.tipo}</span>
                </div>

                <button
                  className="btn-danger"
                  onClick={() => handleEliminar(p.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}

            {participantesFiltrados.length === 0 && (
              <div className="empty-state">
                <h3>No se encontraron participantes</h3>
                <p>Registra un nuevo participante o cambia la búsqueda.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Participantes;