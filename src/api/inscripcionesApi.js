import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerInscripciones = () => {
  return axios.get(`${API_URL}/inscripciones`);
};

export const crearInscripcion = (inscripcion) => {
  return axios.post(`${API_URL}/inscripciones`, inscripcion);
};

export const eliminarInscripcion = (id) => {
  return axios.delete(`${API_URL}/inscripciones/${id}`);
};