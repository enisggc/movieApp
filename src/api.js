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

export const forgotPassword = (email) => Api.post("auth/forgot-password", { email });

export const resetPassword = (email,otp,newPassword) => Api.post("auth/reset-password", { email, otp, newPassword });

export const addFavorite = (movieId,token) => Api.post("/movies/add-favorite" , 
    {movie_id:movieId} ,
     {
        headers:{Authorization:`Bearer ${token.trim()}`}
    });

export const getFavorites = (token)=> Api.get("/movies/favorites", {headers: {Authorization:`Bearer ${token.trim()}`}});

export const removeFavorites = (token,movieId)=>
    Api.delete("/movies/remove-favorite",{
        headers: { Authorization: `Bearer ${token.trim()}` },
        data: { movie_id: movieId }
    })
    




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

export const fetchUserDetails = async (token)=>{
    return Api.get("/auth/user" ,{
        headers: { Authorization: `Bearer ${token.trim()}` }
    })
}

export const getUsers = (token) => {
    return Api.get("/users", {
        headers: { Authorization: `Bearer ${token.trim()}` },
    });
};




export const followUser = (following_id,token) =>{
    Api.post("/users/follow",{following_id},{
        headers: { Authorization: `Bearer ${token.trim()}`}
    })
};

export const unfollowingUser = (following_id,token)=>{
    Api.post("/users/unfollow",{following_id},{
        headers: { Authorization: `Bearer ${token.trim()}`},
        data: { following_id },
    })
};


export const getProfileUser = async (userId) =>{
    try {
        const response = await Api.get(`/users/profile/${userId}`);
        return response;  
    } catch (error) {
        console.error("Profil verisi çekilemedi:", error);
        throw error;
    }
};


export const updateProfile = async (userData,token) =>{
    try {
        const response = await Api.put("/users/profile", userData, {
            headers: { Authorization: `Bearer ${token.trim()}` }
        });
        return response; 
    } catch (error) {
        console.error("Profil güncellenirken hata oluştu:", error);
        throw error;
    }
};
//export const recommendMovie = (receiver_username,movie_title,message , token)=>{
    /*Api.post("/users/recommend-movie" , { receiver_username, movie_title, message },{
        headers: { Authorization: `Bearer ${token.trim()}`},
    });
};*/

export const recommendMovie = async (receiver_username, movie_title, message, token) => {
    console.log("📤 API'ye film önerme isteği gönderiliyor:", { receiver_username, movie_title, message, token });

    if (!token || typeof token !== "string") {
        console.error("Geçersiz token!", token);
        alert("Oturumunuzun süresi dolmuş olabilir. Lütfen tekrar giriş yapın.");
        return;
    }

    console.log("📤 API isteğinde kullanılan token:", `"Bearer ${token}"`);

    try {
        

        const response = await Api.post("/users/recommend-movie", 
            { receiver_username, movie_title, message },
            { headers: { Authorization: `Bearer ${token.trim()}` } }
        );

        console.log("✅ API Yanıtı:", response.data);
        return response;
    } catch (error) {
        console.error("❌ API Hatası:", error.response ? error.response.data : error.message);
        throw error;
    }
};




export const getRecommendations = (username,token)=>{
    
    return Api.get(`/movies/recommendations/${username}`, {
        headers: { Authorization: `Bearer ${token.trim()}` }
    });
}



export default Api;
