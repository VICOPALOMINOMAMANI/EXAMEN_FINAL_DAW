import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eliminarEvento, obtenerEventos } from "../api/eventosApi";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargarEventos = async () => {
    const respuesta = await obtenerEventos();
    setEventos(respuesta.data);
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este evento?");

    if (confirmar) {
      await eliminarEvento(id);
      cargarEventos();
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const eventosFiltrados = eventos.filter((evento) =>
    evento.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    evento.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
    evento.lugar.toLowerCase().includes(busqueda.toLowerCase()) ||
    evento.ponente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Eventos académicos</h1>
          <p>Consulta, busca, actualiza y elimina eventos registrados.</p>
        </div>

        <Link className="btn-primary" to="/crear-evento">
          Nuevo evento
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por título, tipo, lugar o ponente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="grid">
        {eventosFiltrados.map((evento) => (
          <article className="card" key={evento.id}>
            <span className="tag">{evento.tipo}</span>
            <h2>{evento.titulo}</h2>
            <p>{evento.descripcion}</p>

            <div className="info">
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Hora:</strong> {evento.hora}</p>
              <p><strong>Lugar:</strong> {evento.lugar}</p>
              <p><strong>Ponente:</strong> {evento.ponente}</p>
              <p><strong>Cupos:</strong> {evento.cupos}</p>
            </div>

            <div className="card-actions">
              <Link className="btn-secondary" to={`/editar-evento/${evento.id}`}>
                Editar
              </Link>

              <button
                className="btn-danger"
                onClick={() => handleEliminar(evento.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      {eventosFiltrados.length === 0 && (
        <div className="empty-state">
          <h3>No se encontraron eventos</h3>
          <p>Intenta buscar con otro título, tipo, lugar o ponente.</p>
        </div>
      )}
    </main>
  );
}

export default Eventos;