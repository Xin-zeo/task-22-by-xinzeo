import viteLogo from "../../assets/vite.svg";
import reactLogo from "/react.svg";
import "./Navbar.css";

function Navbar({ removeCookies }) {
  const handleSignOut = () => {
    removeCookies("access_token");
    window.localStorage.removeItem("userID");
  };
  return (
    <nav>
      <div id="logoContainer">
        <img src={reactLogo} alt="Logo" />
        <p>What-To-Do</p>
      </div>
      <button id="signOut" onClick={handleSignOut}>
        SignOut
      </button>
      <div id="userContainer">
        <img src={viteLogo} alt="User Image" />
        <p>{window.localStorage.username}</p>
      </div>
    </nav>
  );
}

export default Navbar;
