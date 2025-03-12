
import React ,{useEffect,useState} from "react";

import { getFavorites, removeFavorites } from "../Api";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";


const Favorites = ({token}) =>{
    const [favorites,setFavorites] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
    console.log("Favorilere ekleme işlemi için kullanılan token:", token);
    const fetchFavorites = async() =>{
        if(!token) return;
        try {
            console.log("Favori filmleri almak için API çağrısı yapılıyor...");
            const response = await getFavorites(token);
            console.log("API Yanıtı:", response);
            console.log("Favori filmler API Yanıtı:", response.data);


            const moviesData = await Promise.all(response.data.map(async(fav)=>{
                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${fav.movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=tr-TR`);
                return movieResponse.json();
            }))
            setFavorites(moviesData);
        } catch (error) {
            console.error("Favoriler alınamadı:", error);
        }
    };
    fetchFavorites();
},[token]);


    const handleRemoveFavorite = async (movieId) =>{
        try {
            await removeFavorites(token,movieId);
            setFavorites((prevFavorites)=>{
                prevFavorites.filter((movie)=>movie.id!==movieId);
            });
            console.log("Film favorilerden çıkarıldı:", movieId);
        } catch (error) {
            console.error("Favori çıkarma hatası:", error);
        }
    }


    return(
        <div>
     {!favorites ? ( // Eğer favorites undefined ise
            <p>Yükleniyor...</p>
        ) : favorites.length === 0 ? (
            <p>Henüz Favorilere Film Eklenmedi</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <button onClick={() => navigate(`/movie/${movie.id}`)}>Detayları Gör</button>
              <button onClick={() => handleRemoveFavorite(movie.id)}>Favorilerden Çıkar</button>
            </div>
          ))}
        </div>
      )}
    </div>
    );

};


export default Favorites;