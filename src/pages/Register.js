import "../styles/auth.css";
    import React,{useState} from "react";
    import { register } from "../Api";
    import { useNavigate } from "react-router-dom";

    const Register = () =>{
        const [email ,setEmail] = useState("");
        const [password , setPassword] = useState("");
        const [username, setUsername] = useState("");

        const navigate = useNavigate();

            const handleSubmit = async (e) =>{
                e.preventDefault();
                console.log("Kayıt isteği gönderiliyor...", { email, password });

                try {
                    await register({email , password,username});
                    
                    alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
                    navigate("/login");
                } catch (error) {
                    console.error("Kayıt hatası:", error);
                    alert("Hata: " + error.response.data.error);

                }
                    
            }
                return (
                        <div className="auth-container">
                            <h2>Kayıt Ol</h2>
                            <form className="auth-form" onSubmit={handleSubmit}>
                                <input type="text" name="username" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}></input>
                                <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}></input>
                                <button type="submit">Kayıt Ol</button>
                            </form>
                        </div>
                    );

    }


    





    export default Register;