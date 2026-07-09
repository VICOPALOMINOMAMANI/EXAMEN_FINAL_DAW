import { useEffect, useState } from "react";
import { obtenerEventos } from "../api/eventosApi";
import { obtenerParticipantes } from "../api/participantesApi";
import {
  crearInscripcion,
  eliminarInscripcion,
  obtenerInscripciones
} from "../api/inscripcionesApi";

function Inscripciones() {
  const [eventos, setEventos] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

  const [eventoId, setEventoId] = useState("");
  const [participanteId, setParticipanteId] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarDatos = async () => {
    const eventosRes = await obtenerEventos();
    const participantesRes = await obtenerParticipantes();
    const inscripcionesRes = await obtenerInscripciones();

    setEventos(eventosRes.data);
    setParticipantes(participantesRes.data);
    setInscripciones(inscripcionesRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!eventoId || !participanteId) {
      setMensaje("Selecciona un evento y un participante.");
      return;
    }

    const yaExiste = inscripciones.some(
      (i) => i.eventoId === eventoId && i.participanteId === participanteId
    );

    if (yaExiste) {
      setMensaje("Este participante ya está inscrito en este evento.");
      return;
    }

    const eventoSeleccionado = eventos.find((e) => e.id === eventoId);
    const participanteSeleccionado = participantes.find(
      (p) => p.id === participanteId
    );

    const nuevaInscripcion = {
      eventoId,
      eventoTitulo: eventoSeleccionado.titulo,
      participanteId,
      participanteNombre: participanteSeleccionado.nombres
    };

    await crearInscripcion(nuevaInscripcion);
    alert("Inscripción registrada correctamente.");
    setEventoId("");
    setParticipanteId("");
    setMensaje("Inscripción registrada correctamente.");

    cargarDatos();
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar esta inscripción?");

    if (confirmar) {
      await eliminarInscripcion(id);
      cargarDatos();
    }
  };

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Inscripciones</h1>
          <p>Inscribe participantes en eventos académicos y consulta los inscritos.</p>
        </div>
      </div>

      <div className="two-columns">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Nueva inscripción</h2>

          <label>Evento</label>
          <select value={eventoId} onChange={(e) => setEventoId(e.target.value)}>
            <option value="">Selecciona un evento</option>
            {eventos.map((evento) => (
              <option key={evento.id} value={evento.id}>
                {evento.titulo}
              </option>
            ))}
          </select>

          <label>Participante</label>
          <select
            value={participanteId}
            onChange={(e) => setParticipanteId(e.target.value)}
          >
            <option value="">Selecciona un participante</option>
            {participantes.map((participante) => (
              <option key={participante.id} value={participante.id}>
                {participante.nombres} - {participante.tipo}
              </option>
            ))}
          </select>

          {mensaje && <p className="message">{mensaje}</p>}

          <button className="btn-primary" type="submit">
            Inscribir participante
          </button>
        </form>

        <section>
          <h2 className="section-title">Listado de inscritos</h2>

          <div className="list-panel">
            {inscripciones.map((inscripcion) => (
              <article className="inscription-item" key={inscripcion.id}>
                <div>
                  <h3>{inscripcion.eventoTitulo}</h3>
                  <p>{inscripcion.participanteNombre}</p>
                </div>

                <button
                  className="btn-danger"
                  onClick={() => handleEliminar(inscripcion.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}

            {inscripciones.length === 0 && (
              <div className="empty-state">
                <h3>No hay inscripciones registradas</h3>
                <p>Selecciona un evento y un participante para crear una inscripción.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Inscripciones;