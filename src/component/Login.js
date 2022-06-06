import logo from "../res/logo-tecbank.png"
import { useState } from "react"
import {toast } from 'react-toastify';

import { Home } from "./Home"
import { Signup } from "./Signup";

//propiedades de la Toast   
const TOAST_PROPERTIES={
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(0);
    const [email, setEmail] = useState("");
    const [signUp, setSignUp] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetch(`http://localhost:1337/api/user/${username}/${password}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                console.log(data);
                setUserId(data.userId);
                setEmail(data.email);
            }
            else {
                console.log("Usuario o contraseña invalida.");
                toast.error('Usuario o password incorrecto.', TOAST_PROPERTIES);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('No se pudo conectar con el servidor.', TOAST_PROPERTIES);
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
        return <Home userId={userId} email={email}/>
    }
}

