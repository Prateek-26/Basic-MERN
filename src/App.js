import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/demo", {
        form,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Now if we log here, we'll get CORS error, since servers are different and its not allowed that one directly tries to access another. This can be allowed / resolved at the servers.
 
  const getUsers = async () => {
    await axios
      .get("http://localhost:8080/demo")
      .then((res) => {
        // console.log(res);
        const data = res.data;
        console.log(data);
        setUsers(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
getUsers();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h1>{ JSON.stringify(form) }</h1>  */}
        <input
          type="text"
          onChange={handleForm}
          name="uname"
          id=""
          placeholder="username"
        />
        <input
          type="password"
          onChange={handleForm}
          name="pword"
          id=""
          placeholder="password"
        />
        {/* <input type="submit" value="" placeholder=""/> */}
        <button type="submit">Enter</button>
      </form>
      <div>
        <ul>
          {users.map(user => <li key={user._id}>{user.username}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
