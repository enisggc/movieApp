import React,{useState,useEffect} from "react";
import { followUser,unfollowingUser } from "../Api";
import "../styles/userlist.css";

const UserList = ({users = [],token})=>{


    const[following ,setFollowing] =useState({});


    const handleFollow = async (userId)=>{
        try {
            await followUser(userId,token);
            setFollowing((prev)=>({...prev,[userId]:true}));
        } catch (error) {
            console.error("Takip hatası:", error);
        }
    }


    const handleUnfollow = async(userId)=>{
        try {
            await unfollowingUser(userId,token);
            setFollowing((prev)=>({...prev,[userId]:false}));
        } catch (error) {
            console.error("Takipten çıkma hatası:", error);
        }
    }


    return (
        <div className="user-list">
            {users.map((user) => (
                <div key={user.id} className="user-card">
                    <img src={user.profile_picture || "/default-profile.png"} alt="Profil" />
                    <h3>{user.username}</h3>
                    <button onClick={() => following[user.id] ? handleUnfollow(user.id) : handleFollow(user.id)}>
                        {following[user.id] ? "Takipten Çık" : "Takip Et"}
                    </button>
                </div>
            ))}
        </div>
    );
    
}


export default UserList;