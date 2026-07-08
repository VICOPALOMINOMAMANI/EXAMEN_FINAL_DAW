import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Eventos from "../pages/Eventos";
import CrearEvento from "../pages/CrearEvento";
import EditarEvento from "../pages/EditarEvento";
import Participantes from "../pages/Participantes";
import Inscripciones from "../pages/Inscripciones";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/crear-evento" element={<CrearEvento />} />
      <Route path="/editar-evento/:id" element={<EditarEvento />} />
      <Route path="/participantes" element={<Participantes />} />
      <Route path="/inscripciones" element={<Inscripciones />} />
    </Routes>
  );
}

export default AppRoutes;