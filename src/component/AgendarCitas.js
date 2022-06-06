import { useState } from "react"
import { Menu } from "./Menu";
import React from 'react';
import Select from 'react-select';
import {toast } from 'react-toastify';

//propiedades de la Toast   
const TOAST_PROPERTIES={
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

export const Citas = (props) => {
    const [goBack, setBack] = useState(false);

    const userId = props.userId;
    const [selectedDay, setDay] = useState(null);
    const [selectedTime, setTime] = useState(null);
    const [selectedType, setType] = useState(0);
    const [selectedLocation, setLocation] = useState(0);


    
    //boton de volver
    const onBack = (event) => {
        setBack(true);
    }

    //boton de solicitar una cita
    const onRequestAppointment = (event) => {
        event.preventDefault();

        if(selectedDay===null||selectedTime===null||selectedType===0||selectedDay===null||selectedLocation===0){
            toast.error('Rellene todos los espacios', TOAST_PROPERTIES);
            return;
        }
        //buscar si ya hay una cita en esta fecha y hora y en esa sucursal
        fetch(`http://localhost:1337/api/getCita/${selectedDay.value}/${selectedTime.value}/${selectedLocation.value}`)
        .then(async response => {
            const data = await response.json();
            if (data.status === "success"){
                if (data.json.length === 0){
                    //agendar la cita
                    fetch(`http://localhost:1337/api/agendarCita/${userId}/${selectedDay.value}/${selectedTime.value}/${selectedType.value}/${selectedLocation.value}`, {
                        method: 'POST'
                    })
                    .then(async response => {
                        const data = await response.json();
                        if (data.status === "success"){
                            console.log("Se agendó su cita exitosamente");
                            toast.success('Cita creada exitosamente', TOAST_PROPERTIES)
                        }
                        else{
                            toast.error('Se encontró un error', TOAST_PROPERTIES)
                            console.log("Se encontró un error");
                        }
                    })
                } else{
                    console.log("No hay espacio disponible a esa hora"); 
                    toast.error('No hay espacio disponible a esa hora', TOAST_PROPERTIES)
                }
            } else{
                
                console.log("Se encontró un error");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }



    //días
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    var days = [];

    for (let i = 0; i < 7; i++){
        day++;
        if ([1, 3, 5, 7, 8, 10].includes(month) && day > 31){
            day = 1;
            month++;
        }
        if ([4, 6, 9, 11].includes(month) && day > 30){
            day = 1;
            month++;
        }
        if (month === 2){
            let leapYear = false;
            if (year % 4 === 0){
                leapYear = true;
                if (year % 100 === 0 && year % 400 !== 0){
                    leapYear = false;
                }
            }

            if (leapYear && day > 29 ){
                day = 1;
                month++;
            }
            if (!leapYear && day > 28){
                day = 1;
                month++;
            }
        }
        if (month === 12 && day > 31){
            day = 1;
            month = 1;
            year++;
        }

        let str_day = ''.concat(day, '-', month, '-', year)
        let str_day_sql = ''.concat(year, '-', month, '-', day)
        days.push({value: str_day_sql, label: str_day});
    }
    
    //horas
    var horas = [];
    for (let hour = 7, minutes = 3; hour < 17;){
        let str_time = ''.concat(hour, ':', minutes, '0')
        horas.push({value: str_time, label: str_time})
        if (minutes === 3){
            hour++
            minutes = 0
            if (hour === 12){
                hour++
            }
        }
        else{
            minutes = 3
        }
    }

    //tipos de cita
    var tipos = [];
    tipos.push({value: 1, label: "Solicitar firma digital"});
    tipos.push({value: 2, label: "Solicitud o renovación de licencias de conducir"});
    tipos.push({value: 3, label: "Solicitud o renovación de pasaporte"});
    tipos.push({value: 4, label: "Reserva de espacio"});

    //suscursales
    var suscursales = [];
    suscursales.push({value: 1, label: "San José Centro"});
    suscursales.push({value: 2, label: "Multiplaza del Este"});
    suscursales.push({value: 3, label: "Lincoln Plaza"});
    suscursales.push({value: 4, label: "Alajuela Centro"});
    suscursales.push({value: 5, label: "City Mall"});
    suscursales.push({value: 6, label: "Oxígeno Human Playground"});
    suscursales.push({value: 7, label: "Paseo Metrópoli"});



    
    //pantalla
    if(!goBack) {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/>
                <h1>Citas</h1>
                <br/>
                <Select defaultValue={selectedDay}
                onChange={setDay}
                options={days}
                className="select-appointment"
                placeholder="Fecha"/>
                <br/>
                <Select defaultValue={selectedTime}
                onChange={setTime}
                options={horas}
                className="select-appointment"
                placeholder="Hora"/>
                <br/>
                <Select defaultValue={selectedType}
                onChange={setType}
                options={tipos}
                className="select-appointment"
                placeholder="Motivo"/>
                <br/>
                <Select defaultValue={selectedLocation}
                onChange={setLocation}
                options={suscursales}
                className="select-appointment"
                placeholder="Sucursal"/>
                <br/>
                <br/>
                <button className="button-appointment" onClick={onRequestAppointment}>Solicitar Cita</button>
            </div>
        )
    }
    else {
        return (<Menu userId={userId} email={props.email}/>)
    }
    
}

