import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./User.css";

function User() {
  const [signIn, setSignIn] = useState(false);
  return (
    <>
      {signIn ? (
        <SignIn setSignIn={setSignIn} />
      ) : (
        <SignUp setSignIn={setSignIn} />
      )}
    </>
  );
}

export default User;

const SignIn = ({ setSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const localUsername = window.localStorage.getItem("username");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://task-22-by-xinzeo.onrender.com/api/v1/user/signIn",
        {
          username,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);
      window.localStorage.setItem("username", response.data.username);
    } catch (err) {
      if (err.response.status === 404) {
        alert("User doesn't exist!!");
      } else {
        alert("Username or Password is Incorrect!!");
      }
    }
  };

  return (
    <div className="user-form-container">
      <h2>Welcome Back {localUsername ? localUsername : "to What-To-Do"}!!</h2>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="SignIn"
      />
      <p onClick={() => setSignIn(false)}>SignUp?</p>
    </div>
  );
};

const SignUp = ({ setSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://task-22-by-xinzeo.onrender.com/api/v1/user/signUp",
        {
          username,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);
      window.localStorage.setItem("username", response.data.username);
    } catch {
      alert("User already exists!!");
    }
  };

  return (
    <div className="user-form-container">
      <h2>Welcome to What-To-Do!</h2>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="SignUp"
      />
      <p onClick={() => setSignIn(true)}>SignIn?</p>
    </div>
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  label,
}) => {
  return (
    <form className="user-form" onSubmit={onSubmit}>
      <label>
        ~ USERNAME
        <input
          type="text"
          name="username"
          value={username}
          autoComplete="username"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        ~ PASSWORD
        <input
          type="password"
          name="password"
          value={password}
          autoComplete="current-password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">{label}</button>
    </form>
  );
};
