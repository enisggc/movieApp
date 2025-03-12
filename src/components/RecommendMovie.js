import React, { useState } from "react";
import { recommendMovie } from "../Api";
import "../styles/recommendations.css";




const RecommendMovie = ({token})=>{
    const[receiverUsername , setReceiverUsername] = useState("");
    const[movieTitle,setMovieTitle]=useState("");
    const[message,setMessage] = useState("");

    const handleSubmit = async(e)=>{

        e.preventDefault();
        console.log("📤 Butona basıldı, handleSubmit çağrıldı.");
        console.log("🎯 Alıcı Kullanıcı:", receiverUsername);
        console.log("🎥 Önerilen Film:", movieTitle);
        console.log("📝 Mesaj:", message);
        if(!receiverUsername || !movieTitle) {
            alert("Lütfen alıcı kullanıcı adını ve film ismini giriniz!");
            return;
        }
        try {
            console.log("📌 Token değeri:", token);
            await recommendMovie(receiverUsername,movieTitle,message,token);
            alert("Film önerisi gönderildi!");
            setMovieTitle("");
            setMessage("");
        } catch (error) {
            console.error("Film önerme hatası:", error);
            alert("Film önerirken bir hata oluştu.");
        }
    }

    return (
        <div>
            <h2>Film Öner</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Alıcı Kullanıcı Adı" 
                    value={receiverUsername} 
                    onChange={(e) => setReceiverUsername(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Film İsmi" 
                    value={movieTitle} 
                    onChange={(e) => setMovieTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Mesajınızı yazın..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button type="submit">Gönder</button>
            </form>
        </div>
    );
};





export default RecommendMovie;