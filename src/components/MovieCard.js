import React from "react";
import {Link} from "react-router-dom";


const MovieCard = ({movie})=>{
    return(
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title}></img>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <Link to={`/movie/${movie.id}`}>Detayları gör</Link>
        </div>
    );
};


export default MovieCard;