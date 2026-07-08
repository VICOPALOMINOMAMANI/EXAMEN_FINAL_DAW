import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">🎓</div>
        <div>
          <h2>ContiEventos</h2>
          <span>Gestión Universitaria</span>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/eventos">Eventos</NavLink>
        <NavLink to="/crear-evento">Registrar Eventos</NavLink>
        <NavLink to="/participantes">Participantes</NavLink>
        <NavLink to="/inscripciones">Inscripciones</NavLink>
      </nav>

      <div className="admin-box">
        <span>Admin</span>
        <div className="avatar">A</div>
      </div>
    </header>
  );
}

export default Navbar;