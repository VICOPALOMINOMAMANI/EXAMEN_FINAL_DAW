import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerEventos = () => {
  return axios.get(`${API_URL}/eventos`);
};

export const obtenerEventoPorId = (id) => {
  return axios.get(`${API_URL}/eventos/${id}`);
};

export const crearEvento = (evento) => {
  return axios.post(`${API_URL}/eventos`, evento);
};

export const actualizarEvento = (id, evento) => {
  return axios.put(`${API_URL}/eventos/${id}`, evento);
};

export const eliminarEvento = (id) => {
  return axios.delete(`${API_URL}/eventos/${id}`);
};