import React,{useEffect,useState} from "react";
import { getRecommendations } from "../Api";


const Recommendations = ({token,username}) =>{
    const [recommendations,setRecommendations] = useState([]);

    useEffect(()=>{
        console.log("🔍 useEffect çalıştı!");
    console.log("🔍 username:", username);
    console.log("🔍 token:", token);
        if (!username || !token) {
            console.log("❌ Kullanıcı adı veya token eksik, API çağrısı yapılmadı!");
            return;
        }


        const fetchRecommendations = async()=>{
            
            console.log("📢 Film önerileri API çağrısı yapılıyor. Kullanıcı:", username);

            try {
                const response = await getRecommendations(username,token);
                console.log("✅ Film önerileri alındı:", response.data);
                setRecommendations(response.data);
            } catch (error) {
                console.error(" Gelen öneriler alınamadı:", error);
            }
        }
        fetchRecommendations();
    },[username,token]);


    return (
        <div>
            <h2>Gelen Film Önerileri</h2>

           
            {recommendations.length === 0 ? (
                <p>Henüz sana önerilen bir film yok.</p>
            ) : (
                <ul>
                    
                    {recommendations.map((rec, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            
                            <img
                                src={rec.profile_picture || "/default-profile.png"}
                                alt="Gönderen"
                                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                            />
                            <div>
                                <strong>{rec.sender_username}</strong> sana <b>"{rec.movie_title}"</b> filmini önerdi!
                                <p>{rec.message}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default Recommendations;