import { useState } from "react"
import { useEffect } from "react";
import { Menu } from "./Menu";



export const VerPlanAhorro = (props )=>{
    
    //regresar
    const [goBack, setBack] = useState(false);
    const onBack = (event) => {
        setBack(true);
    }
    
    const userId = props.userId;
    const [ahorros, setAhorro]=useState([]);

    const fetchApi= async()=>{
        const response= await fetch(`http://localhost:1337/PlanAhorro/${userId}`)
        const responseJSON=await response.json()
        setAhorro(responseJSON)
    }
    
    useEffect(()=>{
        fetchApi()
    })

    //quitar zona horaria del string
    const cortar=(plan)=>{
        if (plan===null) return 
        const cadena=plan
        const indice = cadena.indexOf("T");
        const extraida = cadena.substring(0, indice);
        return extraida
    }

    const verificarCantidadPlanes=(arrAhorro)=>{
        if(arrAhorro.length===0) return (<h2>Aun no hay planes de ahorro creados</h2>)
    }

    if(!goBack) {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br></br>
                <h1>Mis planes de ahorro</h1>
                {verificarCantidadPlanes(ahorros)}
                {ahorros.map((ahorro)=>(
                    <div className='contenedor-plan'>
                        <p className='nombre-plan'>{ahorro.nombre}</p>
                        <div className="datos-plan">
                            <span>{cortar(ahorro.fecha)}</span>
                            <span>{ahorro.montoFinal}</span>
                        </div>
                        <div className="label-ver-ahorro"> 
                            <span>Finaliza</span>
                            <span>Monto Final</span>
                        </div>  
                        
                    </div>
                ))}


            </div>
        )
    }
    else {
        return (<Menu userId={userId}/>)
    }

}

export default VerPlanAhorro;