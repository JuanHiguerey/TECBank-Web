import logo from "../res/logo-tecbank.png"
import { useState } from "react"

import { Home } from "./Home"
import { Signup } from "./Signup";

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(0);
    const [signUp, setSignUp] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetch(`http://localhost:1337/api/user/${username}/${password}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                console.log(data);
                console.log(data.status);
                console.log(data.userId);
                setUserId(data.userId);
            }
            else {
                console.log("Usuario o contraseña invalida.");
            }
            setUsername("");
            setPassword("");
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const onRegister = (event) => {
            setSignUp(true);
    }
    
    if(signUp) {
        return <Signup/>
    }
    else if(userId === 0) {
        return (
            <form onSubmit={onSubmitHandler}>
                <div>
                    <br/><br/><img src={logo} className='Login-logo' alt="logo"/><br/><br/>
                    <label className="label-login">Usuario</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Contraseña</label><br/>
                    <input
                        className="input-login"
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    /><br/><br/><br/>
                    <button className="button-login" type="submit">Ingresar</button><br/><br/>
                    <hr className="solid"></hr><br/>
                    <button onClick={onRegister} className="button-login" type="button">Registrarse</button><br/><br/>
                </div>
            </form>
        )
    }
    else {
        return <Home userId={userId}/>
    }
}

