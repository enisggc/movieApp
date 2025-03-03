import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchMovies = async (query)=>{
    try {
        const response  = await axios.get(`${BASE_URL}/search/movie` ,{
            params: {
                api_key:API_KEY,
                query:query,
                language:'tr-TR'
            }
        })
        return response.data.results;
    } catch (error) {
        console.error('API Hatası:', error);
        return [];
    }
};


export const fetchMovieDetails = async (movieId) =>{
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`,{
            params:{
                api_key:API_KEY,
                language:'tr-TR'
            }
        });
        return response.data;   
    } catch (error) {
        console.error('API Hatası:', error);
        return null;
    }
}

