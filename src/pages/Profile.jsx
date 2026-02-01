import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { email, logout } = useUser();
  const navigate = useNavigate();

  function fermerSession() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email : {email}</p>
      <button onClick={fermerSession}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;
