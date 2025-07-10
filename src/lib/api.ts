import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-strapi-dra-alejandra-production.up.railway.app/api',
});

export const getPromociones = async () => {
  try {
    const res = await API.get('/promocions?populate=*');
    return res.data;
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return null;
  }
};