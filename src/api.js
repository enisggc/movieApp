import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const Api = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL,
    headers : {
        "Content-Type" : "application/json"
    }
});




export const register = (userData) => Api.post("auth/register",userData);

export const login = (userData) => Api.post("auth/login",userData);

export const addFavorite = (movieId,token) => Api.post("/movies/add-favorite" , 
    {movie_Id:movieId} ,
     {
        headers:{Authorization:token}
    });

export const getFavorites = (token)=> Api.get("/movies/getFavorites", {headers: {Authorization:token}});



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


export default Api;
