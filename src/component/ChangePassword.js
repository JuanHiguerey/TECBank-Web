import { useState } from "react"
import { Menu } from "./Menu";
import React from 'react';
import {toast } from 'react-toastify';


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

export const ChangePassword=(props)=>{

    //regresar al menu
    const [goBack, setBack] = useState(false);
    const onBack = (event) => {
        setBack(true);
    }

    const userId = props.userId;
    const email = props.email;
    const [password, setPassword]=useState('');
    const [newPassword, setNewPassword]=useState('')
    const [tokenClient, setTokenClient] = useState("");
    const [tokenServer, setTokenServer] = useState(-1);


    //verificar la contraena y lo campos para su actualizacion
    const onSubmitHandler = async(event) => {
        event.preventDefault();
        if(newPassword===""|| password===""||tokenClient==""){
            toast.error('Debe rellenar los espacios', TOAST_PROPERTIES)
            return;
        }
        if ( newPassword.length < 8 ){
            toast.error('Contraseña tiene menos de 8 caracteres', TOAST_PROPERTIES)
            return;
        }
        if (!newPassword.match(/[A-Z]/)){
            toast.error('Contraseña no tiene una letra mayuscula', TOAST_PROPERTIES)
            return;
        } 
        if (!newPassword.match(/[0-9]/)){
            toast.error('Contraseña no tiene un número', TOAST_PROPERTIES)
            return;
        }
        if (!newPassword.match('[¡!#¿?@]')){
            toast.error('Contraseña debe de tener ¡, !, #, ¿, ?, @', TOAST_PROPERTIES)
            return;
        } 
        if (newPassword===password){
            toast.error('Debe cambiar por una contraseña nueva', TOAST_PROPERTIES)
            return;
        }
        if(tokenServer === -1){
            toast.error('Debe agregar el token correcto', TOAST_PROPERTIES)
            return;
        }
        try {
            if(tokenServer === tokenClient && tokenServer !== -1) {
                fetch(`http://localhost:1337/api/newpassword/${userId}/${newPassword}`, {
                    method: 'POST'
                }) 
                toast.success('Se cambio la contraseña', TOAST_PROPERTIES)
            }    
        } catch (error) {
            toast.error('Error', TOAST_PROPERTIES)
        }
    }
    

    //enviar el token de verificacion al correo 
    const onGetToken = (event) => {
        toast.info("El token fue enviado a su correo");
        fetch(`http://localhost:1337/api/token/send/${email}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                setTokenServer(data.token);
                console.log("El token se envio exitosamente");
            }
            else {
                console.log("No se pudo obtener un  token.");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    if(!goBack) {
        return(
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br/><br/>
                <h1>Cambiar Contraseña</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label className="label-cambio-password">Contraseña Actual    </label>
                        <input 
                            className="input-cambio-password"
                            type='password'
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <label className="label-cambio-password">Contraseña Nueva   </label>
                        <input 
                            className="input-cambio-password"
                            type='text'
                            value={newPassword}
                            onChange={(event)=>setNewPassword(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <label className="label-cambio-password">Token    </label>
                        <input
                            className="input-cambio-password" 
                            type='text'
                            value={tokenClient}
                            onChange={(event) => setTokenClient(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <button  classname="button-cambio" type="button" onClick={onGetToken}>Generar Token</button><br/><br/>
                        <button classname="button-cambio" type="submit">Hacer el cambio</button>
                    </div>
                </form>
            </div>
            
                 
        )
    }
    else {
        return (<Menu userId={userId} email={props.email}/>)
    }
    
}