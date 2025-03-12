import React,{useState,useEffect} from "react";

import { useParams } from "react-router-dom";
import { getProfileUser,updateProfile } from "../Api";
import "../styles/profile.css";



const Profile = ({token}) =>{
    const {id} = useParams();
    const [profile , setProfile] = useState(null);
    const [editMode,setEditMode] = useState(false);
    const [formData, setFormData] = useState({ username: "", bio: "", favorite_genre: "", profile_picture: "" });


    useEffect(()=>{
        const fetchProfile = async ()=>{
            try {
                const response = await getProfileUser(id);
                setProfile(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error("Profil alınamadı:", error);
            }
        }
        fetchProfile();
    },[id]);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSave = async ()=>{
        try {
            await updateProfile(formData,token);
            setProfile(formData);
            setEditMode(false);
        } catch (error) {
            console.error("Profil güncelleme hatası:", error);
        }
    }

    if (!profile) return <p>Yükleniyor...</p>;

    return (
        <div className="profile-container">
            <img src={profile.profile_picture || "/default-profile.png"} alt="Profil" className="profile-pic" />
            {editMode ? (
                <div className="profile-edit">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Kullanıcı Adı" />
                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biyografi" />
                    <input type="text" name="favorite_genre" value={formData.favorite_genre} onChange={handleChange} placeholder="Favori Tür" />
                    <button onClick={handleSave}>Kaydet</button>
                </div>
            ) : (
                <div className="profile-info">
                    <h2>{profile.username}</h2>
                    <p>{profile.bio || "Biyografi eklenmemiş."}</p>
                    <p><strong>Favori Tür:</strong> {profile.favorite_genre || "Belirtilmemiş"}</p>
                    <button onClick={() => setEditMode(true)}>Düzenle</button>
                </div>
            )}
        </div>
    );
    


}

export default Profile;