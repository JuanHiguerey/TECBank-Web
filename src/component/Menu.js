import { useState } from "react"
import {Home} from "./Home";
import { Citas } from "./AgendarCitas";
import { MCitas } from "./ModificarCitas";
import { CCitas } from "./CancelarCitas";

export const Menu = (props) => {
    const [goBack, setBack] = useState(false);
    const [goCitas, setCitas] = useState(false);
    const [goMCitas, setMCitas] = useState(false);
    const [goCCitas, setCCitas] = useState(false);

    const onBack = (event) => {
        setBack(true);
    }

    const onCitas = (event) => {
        setCitas(true);
    }

    const onMCitas = (event) => {
        setMCitas(true);
    }

    const onCCitas = (event) => {
        setCCitas(true);
    }

    if (goCitas){
        return (<Citas userId={props.userId}/>)
    }
    else if (goMCitas){
        return (<MCitas userId={props.userId}/>)
    }
    else if (goCCitas){
        return (<CCitas userId={props.userId}/>)
    }
    else if(!goBack) {
        console.log("Logged in with userId " + props.userId);
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/><br/><br/>
                <div className="flex-row">
                    <button className="button-home" onClick={onCitas}>Agendar una Cita</button>
                    <button className="button-home" onClick={onMCitas}>Modificar una Cita</button>
                    <button className="button-home" onClick={onCCitas}>Cancelar una Cita</button>
                </div>
                <br/>
                <br/>
                <div className="flex-row">
                    <button className="button-home">Realizar un Trámite</button>
                    <button className="button-home">Llenar un reporte</button>
                    <button className="button-home">Ver Tipos de Cambio</button>
                    <button className="button-home">Cambiar Contraseña</button>
                </div>
            </div>
        )
    }
    else {
        return (<Home userID = {props.userID}/>)
    }
}

