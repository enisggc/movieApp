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
            console.log(" Token değeri:", token);
            await recommendMovie(receiverUsername,movieTitle,message,token);
            alert("Film önerisi gönderildi!");
            setReceiverUsername("");
            setMovieTitle("");
            setMessage("");
        } catch (error) {
            console.error("Film önerme hatası:", error);
            alert("Film önerirken bir hata oluştu.");
        }
    }

    return (
        <div className="recommend-container">
            <h2>🎬 Film Öner</h2>
            <div className="recommend-card">
                <form onSubmit={handleSubmit} className="recommend-form">
                    <input 
                        type="text" 
                        placeholder="Alıcı Kullanıcı Adı" 
                        value={receiverUsername} 
                        onChange={(e) => setReceiverUsername(e.target.value)} 
                        className="modern-input"
                    />
                    <input 
                        type="text" 
                        placeholder="Film İsmi" 
                        value={movieTitle} 
                        onChange={(e) => setMovieTitle(e.target.value)} 
                        className="modern-input"
                    />
                    <textarea 
                        placeholder="Mesajınızı yazın..." 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="modern-textarea"
                    />
                    <button type="submit" className="send-btn">📩 Gönder</button>
                </form>
            </div>
        </div>
    );
};





export default RecommendMovie;