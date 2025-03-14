import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({token , setToken ,darkMode,toggleDarkMode})=>{
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user")); 
    const currentUserId = currentUser?.id; 
    const username = currentUser?.username || "Kullanıcı";

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        navigate("/login");
    };

    return (
        <nav className={`navbar ${darkMode ? "dark" : ""}`}>
            <h1 className="logo">🎬 MovieApp</h1>
            <ul>
                <li><Link to="/">Anasayfa</Link></li>
                {token ?(
                    <>
                    <li><Link to="/favorites">Favorilerim</Link></li>
                    <li><Link to="/users">Kullanıcılar</Link></li>
                    <li><Link to="/recommendations">Öneriler</Link></li>
                    <li><Link to ="recommend">Öneri Yap</Link></li>

                
                    <li>
                            <Link to={`/profile/${currentUser?.id}`}>
                                <span className="profile-link">👤 Profilim</span>
                            </Link>
                        </li>
                    <li><button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/login">Giriş Yap</Link></li>
                    <li><Link to="/register">Kayıt Ol</Link></li>
                    </>
                )}
                <li>
                    <button className="dark-mode-btn" onClick={toggleDarkMode}>{darkMode ? "🌞 Aydınlık Mod" : "🌙 Koyu Mod"}</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;