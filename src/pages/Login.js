import React,{useState,useEffect} from "react";
import { login } from "../Api";
import { useNavigate } from "react-router-dom";

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
            

            

            
            navigate("/");
        } catch (error) {
            console.error("Giriş hatası:", error);
            alert("Hata: " + error.response.data.error);
        }
        

    }
    return (
        <div>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );


}



export default Login;