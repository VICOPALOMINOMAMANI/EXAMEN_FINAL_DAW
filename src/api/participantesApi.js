import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerParticipantes = () => {
  return axios.get(`${API_URL}/participantes`);
};

export const crearParticipante = (participante) => {
  return axios.post(`${API_URL}/participantes`, participante);
};

export const eliminarParticipante = (id) => {
  return axios.delete(`${API_URL}/participantes/${id}`);
};