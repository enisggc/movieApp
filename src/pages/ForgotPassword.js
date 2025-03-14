import React ,{useState} from "react";
import { forgotPassword } from "../Api";

const ForgotPassword = ()=>{
    const [email ,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleForgotPassword = async(e)=>{
        e.preventDefault();
        console.log("Şifre sıfırlama isteği gönderiliyor...", email);
        try {
            const response = await forgotPassword(email);
            setMessage(response.data.message);
            
        } catch (error) {
            console.error("Şifre sıfırlama hatası:", error);
            setMessage("Şifre sıfırlama hatası: " + error.response.data.error);
        }
    }
    <form onSubmit={handleForgotPassword}>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <button type="submit">Kod Gönder</button>
</form>

{otpSent && ( 
    <form onSubmit={handleVerifyOtp}>
        <input type="text" placeholder="E-posta kodu" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Kodu Doğrula</button>
    </form>
)}

{otpVerified && ( 
    <form onSubmit={handleResetPassword}>
        <input type="password" placeholder="Yeni Şifre" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Şifreyi Güncelle</button>
    </form>
)}

};


export default ForgotPassword;


    