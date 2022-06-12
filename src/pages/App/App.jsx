
import React from 'react';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  const [user, setUser] = React.useState(getUser());
  const [hide, setHide] = React.useState()
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    const reqUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reqUser();
  }, []);


  function handleHide(evt) {
    setHide(evt.target.value)
    return evt.target.value
  }
  function handleChange(evt) {
    setChecked(!checked)
  }

  return (
    <main onClick={handleHide} style={{ backgroundColor: checked ? 'rgb(57, 62, 70)' : 'rgb(247, 247, 247)', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {user ?
        <>
          <NavBar hide={hide} handleChange={handleChange} checked={checked} user={user} setUser={setUser}  />
        </>
        :
        <>
          <NavBar handleChange={handleChange} checked={checked} user={user} setUser={setUser}  />
        </>
      }
    </main>
  );
}

