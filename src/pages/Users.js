import React, { useEffect, useState } from "react";
import { getUsers } from "../Api";
import UserList from "../components/UserList";
import "../styles/users.css";
import { Link } from "react-router-dom";


const Users = ({ token }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("🔥 useEffect çalıştı! Token:", token);
        const fetchUsers = async () => {

            if(!token) return;

            try {
                console.log("🔍 Kullanıcılar getiriliyor...");
                const response = await getUsers(token); 
                console.log("Kullanıcılar:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Kullanıcılar alınamadı:", error);
            }
        };
        if (token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <div className="users-container">
            <h2>Kullanıcılar</h2>
            {users.length === 0 ? (
                <p>Yükleniyor veya hiç kullanıcı yok...</p>
            ) : (
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                             <img 
                                src={user.profile_picture || "/default-profile.png"} 
                                alt={`${user.username} Profil Resmi`} 
                                className="user-profile-pic" 
                            />
                            <p>{user.username}</p>
                            <Link to={`/profile/${user.id}`}>Profili İncele</Link>  {/* 🔹 Link eklendi */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;