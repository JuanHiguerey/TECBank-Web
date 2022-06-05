import { useState } from "react"
import { useEffect } from "react";
import { Menu } from "./Menu";
import Select from 'react-select';
import axios from 'axios';
import {toast } from 'react-toastify';
  

//valores para plazos corto
const PLAZOS_CORTO=[{value:1, label:"1 año"}];
    
//valores para plazos largo
const PLAZOS_LARGO=[
    {value:3, label:"3 años"},
    {value:5, label:"5 años"},
    {value:10, label:"10 años"}];

//valores para Tipos de plan    
const TIPOS=[{value:1, label:"Corto Plazo"},
    {value:2, label:"Largo Plazo"}];

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

//valores de la tasas de interes, segun la cantidad de annos    
const PORCENTAJES=[
    {annos:1, tasas:[0.015, 0.025, 0.02]},
    {annos:3, tasas:[0.025, 0.03, 0.035]},
    {annos:5, tasas:[0.05, 0.08, 0.1]},
    {annos:10,tasas:[0.12, 0.15, 0.20]}
]

//realizar la operacion para sacr el monto final del plan
const calcularRango=(monto)=>{
    if (monto<500000) throw Error
    else if (monto<=2500000 ) return 0;
    else if (monto<=6000000 && monto>2500000) return 1;
    else return 2;
}

//obtener la tasa de interes
const getTasas=(annosTasa)=>{
    return (PORCENTAJES.find(({annos})=>annosTasa===annos).tasas)
}

export const PlanAhorro =(props) =>{

    const [goBack, setBack] = useState(false);
    const onBack = (event) => {
        setBack(true);
    }

    const [plazos, setPlazos]=useState(PLAZOS_CORTO);
    const userId = props.userId;
    const [nombre, setNombre]=useState('');
    const [tipo, setTipo]=useState(TIPOS[0]);
    const [monto, setMonto]=useState(0);
    const [plazo, setPlazo]=useState(PLAZOS_CORTO[0]);
    const [montoTotal, setMontoTotal]=useState(0);
    

    //verificar y guardar los datos del plan de ahorro
    const guardar = async(event) => {
        event.preventDefault();
        console.log(tipo);
        if(nombre===''){
            toast.error('Error! Debe introducir un nombre', TOAST_PROPERTIES)
            return
        }
        if(monto<500000){
            toast.error('Error! El monto debe ser mayor a 500000 ', TOAST_PROPERTIES)
            return
        }
        if(montoTotal==='Ingresar monto mayor o igual a 500000'){
            toast.error('Error! Debe ingresar un monto ', TOAST_PROPERTIES)
            return
        }
        try {
            await axios.post(`http://localhost:1337/PlanAhorro`, {
                idUsuario:userId, nombre:nombre ,idTipoPlan:tipo.value, plazo:plazo.value, montoFinal:montoTotal}
            )
             toast.success('Plan de Ahorro creado exitosamente', TOAST_PROPERTIES)
        } catch (error) {
            toast.error('Error datos mal introducidos', TOAST_PROPERTIES)
        }
        
    }

    useEffect(() => {
      setPlazo(plazos[0])
    }, [plazos])

    //seleccionar Corto Plazo, y solo aparezca la opcion de un anno
    const actualizarTipo=(nuevoTipo)=>{
        setTipo(nuevoTipo)
        setPlazos(nuevoTipo.value === 1 ? PLAZOS_CORTO: PLAZOS_LARGO)
        
    } 

    //obtener y guardar el monto inertao
    const calcularMontoFinal=(event)=>{
        const nuevoMonto=event.target.value
        setMonto(nuevoMonto)
    }

    //useEffect para calcular el monto Total
    //verfica que no se pueda poner letras y el monto sea superior a 500000
    useEffect(() => {
        if(monto<500000) return setMontoTotal("Ingresar monto mayor o igual a 500000")
        try {
            const montoAhorro=parseInt(monto)
            if( isNaN(parseFloat(monto)) || !isFinite(monto)) throw Error
            const annos=plazo.value
            const tasas=getTasas(annos)
            const tasa=tasas[calcularRango(montoAhorro)]
            console.log(montoAhorro+(montoAhorro*tasa*annos));
            setMontoTotal(montoAhorro+(montoAhorro*tasa*annos));
        } catch (error) {
            setMontoTotal("Ingresar monto mayor o igual a 500000")
        }
        
      }, [monto, plazo])

    if(!goBack) {
        return(
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br></br>
                <h1>Plan de Ahorro</h1>
                <form onSubmit={guardar}>
                    <div className="contenedor-input-plan">
                        <label className="label-ahorro">Nombre   </label>
                        <input
                            className="input-ahorro"
                            type='text'
                            minlength="4"
                            value={nombre}
                            onChange={(event)=>setNombre(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <label for="monto" className="label-ahorro"> Monto   </label>
                        <input
                            id="monto"
                            className="input-ahorro"
                            value={monto}
                            onChange={ calcularMontoFinal} 
                        />
                        <br/>
                        <br/>
                        <label for="tipo" className="label-ahorro">Tipo Plan   </label>
                        <Select defaultValue={tipo}
                            id="tipo"
                            placeholder="Tipo de Plan"
                            className="select-ahorro"
                            options={TIPOS}
                            onChange={actualizarTipo}
                        />
                        <br/>
                        <label for="plazo" className="label-ahorro"> Plazo   </label>
                        <Select value={plazo}
                            id="plazo"
                            placeholder="Plazo"
                            className="select-ahorro"
                            options={plazos}
                            onChange={setPlazo}
                        />
                        <br/>
                        <p className="label-ahorro">Monto Final </p>
                        <p className="label-ahorro">{montoTotal}</p>
                        <button className="button-ahorro" type="submit">Crear</button>  
                    </div>
                </form>
                 
                <br/>
            </div>
        )
    }
    else {
        return (<Menu userId={userId}/>)
    }    

}


export default PlanAhorro;
