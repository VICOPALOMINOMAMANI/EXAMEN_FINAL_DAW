import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerEventos } from "../api/eventosApi";
import { obtenerParticipantes } from "../api/participantesApi";
import { obtenerInscripciones } from "../api/inscripcionesApi";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const cargarResumen = async () => {
      const eventosRes = await obtenerEventos();
      const participantesRes = await obtenerParticipantes();
      const inscripcionesRes = await obtenerInscripciones();

      setEventos(eventosRes.data);
      setParticipantes(participantesRes.data);
      setInscripciones(inscripcionesRes.data);
    };

    cargarResumen();
  }, []);

  const proximosEventos = eventos.slice(0, 3);

  return (
    <main className="container">
      <section className="dashboard-hero">
        <div>
          <span className="badge">Plataforma Académica</span>
          <h1>Gestión moderna de eventos universitarios</h1>
          <p>
            Administra conferencias, talleres, seminarios, participantes e
            inscripciones desde un panel rápido, ordenado y profesional.
          </p>

          <div className="hero-actions">
            <Link className="btn-primary" to="/eventos">
              Ver eventos
            </Link>
            <Link className="btn-secondary" to="/crear-evento">
              Registrar evento
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <h3>Resumen del sistema</h3>

          <div className="stats-grid">
            <div className="stat-card">
              <span>📅</span>
              <h2>{eventos.length}</h2>
              <p>Eventos</p>
            </div>

            <div className="stat-card">
              <span>👥</span>
              <h2>{participantes.length}</h2>
              <p>Participantes</p>
            </div>

            <div className="stat-card">
              <span>✅</span>
              <h2>{inscripciones.length}</h2>
              <p>Inscripciones</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-section">
        <h2>Módulos principales</h2>

        <div className="quick-grid">
          <Link to="/eventos" className="quick-card">
            <span>📚</span>
            <h3>Gestión de eventos</h3>
            <p>Registra, consulta, actualiza y elimina eventos académicos.</p>
          </Link>

          <Link to="/participantes" className="quick-card">
            <span>👨‍🎓</span>
            <h3>Participantes</h3>
            <p>Administra estudiantes y docentes registrados.</p>
          </Link>

          <Link to="/inscripciones" className="quick-card">
            <span>📝</span>
            <h3>Inscripciones</h3>
            <p>Inscribe participantes y consulta los inscritos por evento.</p>
          </Link>
        </div>
      </section>

      <section className="quick-section">
        <h2>Próximos eventos</h2>

        <div className="grid">
          {proximosEventos.map((evento) => (
            <article className="card" key={evento.id}>
              <span className="tag">{evento.tipo}</span>
              <h2>{evento.titulo}</h2>
              <div className="info">
                <p><strong>Fecha:</strong> {evento.fecha}</p>
                <p><strong>Hora:</strong> {evento.hora}</p>
                <p><strong>Lugar:</strong> {evento.lugar}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;