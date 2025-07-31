import axios from 'axios'
// BASE da URL: https://api.themoviedb.org/3
// URL API: /movie/now_playing?api_key=2036df264b59354ad360c8e877a0294f&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;
