import React, { useState, useEffect } from "react";
import { updateProfile, getProfileUser } from "../Api";
import { useNavigate } from "react-router-dom";
import "../styles/editProfile.css";

const EditProfile = ({ token }) => {
    const navigate = useNavigate();
    const [editMode,setEditMode] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        favorite_genre: "",
        profile_picture: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getProfileUser(currentUser.id);
                setFormData(response.data);
            } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
            }
        };
        fetchUserData();
    }, [currentUser.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
        const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                // 📌 Boyutu küçültmek için canvas kullan
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const maxWidth = 200; // Maksimum genişlik (px)
                const maxHeight = 200; // Maksimum yükseklik (px)
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Kaliteyi %70'e indir
                setFormData({ ...formData, profile_picture: compressedBase64 });

                console.log("📦 Küçültülmüş Görsel Boyutu:", compressedBase64.length, "byte");
            };
        };
        reader.readAsDataURL(file);
    }
};
    

    const handleSave = async () => {
        console.log("🔍 Gönderilen Profil Verisi:", JSON.stringify(formData).length, "byte"); // Konsolda veri boyutunu göster
        try {
            await updateProfile(formData, token);
            localStorage.setItem("user", JSON.stringify({ ...currentUser, ...formData }));
            navigate(`/profile/${currentUser.id}`);
        } catch (error) {
            console.error("Profil güncelleme hatası:", error);
        }
    };

    return (
        <div className="edit-profile-container">
            
            <div className="edit-profile-card">
                <div className="profile-picture-container">
                    <img src={formData.profile_picture || "/default-profile.png"}  className="profile-pic" />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Kullanıcı Adı:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Biyografi:</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Favori Tür:</label>
                    <input type="text" name="favorite_genre" value={formData.favorite_genre} onChange={handleChange} />
                </div>
                <div className="buttons">
                    <button className="save-btn" onClick={handleSave}>💾 Kaydet</button>
                    <button className="cancel-btn" onClick={() => navigate(`/profile/${currentUser.id}`)}>❌ İptal</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
