import React, { useEffect, useState } from "react";
import { getUsers } from "../Api";
import UserList from "../components/UserList";
import "../styles/users.css";


const Users = ({ token }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("🔥 useEffect çalıştı! Token:", token);
        const fetchUsers = async () => {

            if(!token) return;

            try {
                console.log("🔍 Kullanıcılar getiriliyor...");
                const response = await getUsers(token); 
                console.log("✅ Kullanıcılar:", response.data);
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
                <UserList users={users} token={token} />
            )}
        </div>
    );
};

export default Users;