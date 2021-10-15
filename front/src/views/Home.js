import React from "react";
import { useSelector } from "react-redux";
const Home = () => {  
  const user = useSelector(state=>state.user.user)
  return (
    <div>
      <p>{`${user ? "Bonjour " + user.firstname : "Utilisateur déconnecté"}`}</p>
      
    </div>
  );
};
export default Home;
