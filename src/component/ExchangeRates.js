import { useState } from "react"
import { useEffect } from "react";
import { Menu } from "./Menu";

const url='http://localhost:1337/tipocambio';

export const ExchangeRates =(props) =>{

    const userId = props.userId;
    const [monedas, setMonedas]=useState([])
    const fetchApi= async()=>{
        const response= await fetch(url)
        const responseJSON=await response.json()
        setMonedas(responseJSON)
    }
    
    useEffect(()=>{
        fetchApi()
    },[])


    const [goBack, setBack] = useState(false);
    const onBack = (event) => {
        setBack(true);
    }

    if(!goBack) {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br></br>
                <h1>Tipo de Cambio</h1>
                {monedas.map((moneda)=>(
                    <div className='contenedor-moneda'>
                        <p className='nombre-moneda'>{moneda.Nombre}</p>
                        <div className="valores-moneda">
                            <span>{moneda.Compra}</span>
                            <span>{moneda.Venta}</span>
                        </div>
                        <div className="label-compra-venta"> 
                            <span>Compra</span>
                            <span>Venta</span>
                        </div>    
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (<Menu userId={userId} email={props.email}/>)
    }

}

export default ExchangeRates;