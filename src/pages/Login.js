import "../styles/auth.css";
import React,{useState,useEffect} from "react";
import { login } from "../Api";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../Api";
import { Link } from "react-router-dom";


const Login = ({ setToken })=>{
    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const navigate = useNavigate();

    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("Giriş isteği gönderiliyor...", { email, password });
        try {
            const response = await login({email,password});
            console.log("Giriş başarılı, gelen token:", response.data.token);
            localStorage.setItem("token",response.data.token);
            

            setToken(response.data.token);

            const userResponse = await fetchUserDetails(response.data.token);
            localStorage.setItem("user" , JSON.stringify(response.data.user));

            console.log("📢 Kullanıcı bilgileri localStorage'a kaydedildi:", userResponse.data);

            

            navigate("/");
        } catch (error) {
            console.error("Giriş hatası:", error);
            alert("Hata: " + error.response.data.error);
        }
        

    }
    return (
        <div className="auth-container">
            <h2>Giriş Yap</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Giriş Yap</button>
            </form>
            <Link to="/reset-password" className="forgot-password-link">Şifremi Unuttum</Link> {/* 📌 Link eklendi */}

        </div>
    );


}



export default Login;