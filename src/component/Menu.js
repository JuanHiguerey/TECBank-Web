import { useState } from "react"
import { Home } from "./Home";
import { Citas } from "./AgendarCitas";
import { MCitas } from "./ModificarCitas";
import { CCitas } from "./CancelarCitas";
import { Reportes } from "./Reportes";
import { ExchangeRates} from "./ExchangeRates";
import { PlanAhorro} from "./PlanAhorro";
import { VerPlanAhorro} from "./VerPlanAhorro";


export const Menu = (props) => {
    const [goBack, setBack] = useState(false);
    const [goCitas, setCitas] = useState(false);
    const [goMCitas, setMCitas] = useState(false);
    const [goCCitas, setCCitas] = useState(false);
    const [goReportes, setReportes] = useState(false);
    const [goExchangeRates, setExchangeRates]=useState(false);
    const [goPlan, setPlan]=useState(false);
    const [goVerPlan, setVerPlan]=useState(false);

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

    const onReportes = (event) => {
        setReportes(true);
    }
    const onExchange=(event)=>{
        setExchangeRates(true);
    }

    const onPlan=(event)=>{
        setPlan(true);
    }

    const onVerPlan=(event)=>{
        setVerPlan(true);
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
    else if (goReportes){
        return (<Reportes userId={props.userId}/>)
    }
    else if(goExchangeRates){
        return (<ExchangeRates userId={props.userId}/>)
    }
    else if(goPlan){
        return (<PlanAhorro userId={props.userId}/>)
    }
    else if(goVerPlan){
        return (<VerPlanAhorro userId={props.userId}/>)
    }
    else if(!goBack) {
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
                    <button className="button-home" onClick={onPlan}>Invertir en un Plan de Ahorro</button>
                    <button className="button-home" onClick={onReportes}>Llenar un reporte</button>
                    <button className="button-home" onClick={onExchange}>Ver Tipos de Cambio</button>
                    <button className="button-home">Cambiar Contraseña</button>
                    <button className="button-home" onClick={onVerPlan}>Ver mis Planes de Ahorro</button>
                </div>
            </div>
        )
    }
    else {
        return (<Home userId = {props.userId}/>)
    }
}

