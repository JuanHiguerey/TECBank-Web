import logo from "../res/logo-tecbank.png"
import { useState } from "react"

export const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        alert(`The username is ${username} and the password is ${password}`)
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <br/><br/><img src={logo} className='Login-logo' alt="logo"/><br/><br/>
                <label>Usuario</label><br/>
                <input 
                    type='text'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                /><br/><br/>
                <label>Contraseña</label><br/>
                <input 
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                /><br/><br/><br/>
                <button type="submit">Ingresar</button><br/><br/> {/* Este boton tiene un evento onClick donde se mandan las credenciales al servidor */}
                <hr class="solid"></hr><br/>
                <button type='button'>Registrarse</button><br/><br/> {/* Este boton tiene un evento onClick donde se instancia otro componente que contiene el form para registrar usuarios */}
            </div>
        </form>
    )

}
