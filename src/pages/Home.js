import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import React, { useState } from "react";
import { fetchMovies } from "../api";




const Home = () =>{
    const [movies , setMovies] = useState([]);


    const handleSearch = async(query)=>{
    const results = await fetchMovies(query);
    setMovies(results);


}
return(
    <div className="container">
        <h1>Film Arama Uygulaması</h1>
        <SearchBar onSearch={handleSearch}></SearchBar>
        <div className="movie-grid">
        {movies.length > 0 ? (
                    movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>Film aramak için bir kelime girin.</p>
                )}
        </div>
    </div>
);

};



export default Home;