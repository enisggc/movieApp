import React,{useState,useEffect} from "react";
import { useParams, Link } from "react-router-dom";

import { getProfileUser,updateProfile } from "../Api";
import "../styles/profile.css";



const Profile = ({token}) =>{
    
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user")); 
    const currentUserId = currentUser?.id?.toString(); 
    const [profile , setProfile] = useState(null);
    


    useEffect(()=>{
        const fetchProfile = async ()=>{
            try {
                const response = await getProfileUser(id);
                setProfile(response.data);
                
            } catch (error) {
                console.error("Profil alınamadı:", error);
            }
        }
        fetchProfile();
    },[id]);

    
    
    

    if (!profile) return <p>Yükleniyor...</p>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={profile.profile_picture || "/default-profile.png"} alt="Profil" className="profile-pic" />
                    <h2>{profile.username}</h2>
                    <p className="bio">{profile.bio || "Biyografi eklenmemiş."}</p>
                </div>
                <div className="profile-details">
                    <p><strong>🎥 Favori Tür:</strong> {profile.favorite_genre || "Belirtilmemiş"}</p>
                </div>
                {currentUserId === id && (
                    <Link to="/profile/edit">
                        <button className="edit-profile-btn">⚙️ Profili Düzenle</button>
                    </Link>
                )}
            </div>
        </div>
    );

}

export default Profile;