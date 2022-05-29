import { useState } from "react"

import { Login } from "./Login";

export const Signup = (props) => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [goBack, setBack] = useState(false);

    const onBack = (event) => {
        setBack(true);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetch(`http://localhost:1337/api/user/${name}/${lastname}/${email}/${username}/${password}`, {
            method: 'POST'
        })
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                console.log(data);
                console.log(data.status);
                console.log(data.userId);
                setBack(true);
            }
            else {
                console.log("No fue posible registrar al usuario.");
            }
            setName("");
            setLastName("");
            setEmail("");
            setUsername("");
            setPassword("");
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    if(!goBack) {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/>
                <form onSubmit={onSubmitHandler}>
                    <label className="label-login">Nombre</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Apellido</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={lastname}
                        onChange={(event) => setLastName(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Correo</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    /><br/><br/>
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
                    <button className="button-login" type="submit">Registrar</button><br/><br/>
                </form>
            </div>
        )
    }
    else {
        return (<Login/>)
    }
}

