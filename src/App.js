import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// pass in a user object here (which I fetch from axios)
// render out that object accordingly
function GithubProfile(userObject) {
  console.log("In github profile component", userObject);
  let user = userObject.userObject;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.blog}</p>
    </div>
  );
}

function App() {
  // input
  const [username, setUsername] = useState("");
  // user object
  const [user, setUser] = useState({});

  useEffect(() => {
    grabData();
  }, [username]);

  // grab data, given the username
  function grabData() {
    // localhost:3001/api/hotels/${hotelName}
    const url = `http://api.github.com/users/${username}`;
    axios.get(url).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    grabData();
  }

  function usernameOnChange(event) {
    let username = event.target.value;
    console.log(username);
    setUsername(event.target.value);
  }

  return (
    <div className="App">
      <h1>Use Effect</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={usernameOnChange}
        />{" "}
        <button type="submit">Get User Information</button>
      </form>
      <GithubProfile userObject={user} />
    </div>
  );
}

export default App;
