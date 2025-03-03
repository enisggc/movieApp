import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api";

const MovieDetails = ()=>{
    const {id} = useParams();
    const [movie,setMovie] = useState(null); 

    useEffect(()=>{
            const getMovieDetails = async ()=>{
            const data = await fetchMovieDetails(id);
            setMovie(data);
        };
        getMovieDetails();

    },[id]);
    

    if(!movie) return <p>Yükleniyor...</p>


    return(
        <div className="container movie-details">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p><strong>Yayın Tarihi:</strong> {movie.release_date}</p>
        </div>
    );
};



export default MovieDetails;

