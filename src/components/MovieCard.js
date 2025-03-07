import React from "react";
import {Link} from "react-router-dom";
import { addFavorite } from "../Api";


const MovieCard = ({movie,token})=>{

    const handleFavorite = async() =>{
        if(!token){
            alert("Favorilere eklemek için giriş yapmalısınız.");
            return;

        }

        try {
            await addFavorite(movie.id,token);
            alert("Film favorilere eklendi!");
        } catch (error) {
            console.error("Favorilere ekleme hatası:", error);
        }
    }
    return(
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title}></img>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <Link to={`/movie/${movie.id}`}>Detayları gör</Link>
            <button onClick={handleFavorite}>❤️‍🔥Favorilere Ekle</button>
        </div>
    );
};


export default MovieCard;