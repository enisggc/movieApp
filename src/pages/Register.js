    import React,{useState} from "react";
    import { register } from "../Api";

    const Register = () =>{
        const [email ,setEmail] = useState("");
        const [password , setPassword] = useState("");

            const handleSubmit = async (e) =>{
                e.preventDefault();
                console.log("Kayıt isteği gönderiliyor...", { email, password });

                try {
                    await register({email , password});
                    
                    alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");

                } catch (error) {
                    console.error("Kayıt hatası:", error);
                    alert("Hata: " + error.response.data.error);

                }
                    
            }
                return (
                        <div>
                            <h2>Kayıt Ol</h2>
                            <form onSubmit={handleSubmit}>
                                <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}></input>
                                <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}></input>
                                <button type="submit">Kayıt Ol</button>
                            </form>
                        </div>
                    );

    }


    





    export default Register;