import React,{useState} from "react";
import {forgotPassword,resetPassword} from "../Api";


const ResetPassword = ()=>{
    const [email ,setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword ,setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [message,setMessage] = useState("");
    const [step, setStep] = useState(1);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        console.log("Şifre sıfırlama kodu gönderiliyor...", email);
        try {
            const response = await forgotPassword(email);
            setMessage(response.data.message);
            setStep(2); 
        } catch (error) {
            console.error("Şifre sıfırlama kodu hatası:", error);
            setMessage("Şifre sıfırlama kodu hatası: " + (error.response?.data.error || "Sunucu hatası"));
        }
    };

    const handleResetPassword = async(e)=>{
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Hata: Şifreler uyuşmuyor!");
            return;
        }
        console.log("Şifre sıfırlama isteği gönderiliyor...", email,otp);

        if (!otp || !newPassword) {
            setMessage("Lütfen OTP kodunu ve yeni şifreyi giriniz!");
            return;
        }
    
        try {
            const response = await resetPassword(email, otp, newPassword);
            setMessage(response.data.message);  
            console.log("✅ Şifre başarıyla güncellendi:", response.data.message);
        } catch (error) {
            console.error("Şifre sıfırlama hatası:", error);
            setMessage("Şifre sıfırlama hatası: " + error.response.data.error);
        }
    }

    return (
        <div className="auth-container">
            <h2>Şifre Sıfırlama</h2>

            {step === 1 && (
                <form className="auth-form" onSubmit={handleSendOtp}>
                    <input
                        type="email"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Kod Gönder</button>
                </form>
            )}

            {step === 2 && (
                <form className="auth-form" onSubmit={handleResetPassword}>
                    <input
                        type="text"
                        placeholder="E-posta kodu (OTP)"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Yeni Şifre"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Yeni Şifreyi Tekrar Girin"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Şifreyi Güncelle</button>
                </form>
            )}

            {step === 3 && (
                <p>{message} <br /> <a href="/login">Giriş Yap</a></p>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};


export default ResetPassword;