
import React ,{useEffect,useState} from "react";
import { getFavorites } from "../Api";


const Favorites = ({token}) =>{
    const [favorites,setFavorites] = useState([]);

    useEffect(()=>{
    const fetchFavorites = async() =>{
        if(!token) return;
        try {
            const response = await getFavorites(token);
            setFavorites(response.data);
        } catch (error) {
            console.error("Favoriler alınamadı:", error);
        }
    };
    fetchFavorites();
},[token]);


    return(
        <div>
            <h2>Favori Filmlerim</h2>
            {favorites.length===0 ? <p>Henüz Favorilere Film Eklenmedi</p> :
            favorites.map((fav)=>(
                <div key={fav.id}>
                    <p>Favori Film ID:{fav.movie_id}</p>
                </div>
            ))
            }
        </div>
    );

};


export default Favorites;