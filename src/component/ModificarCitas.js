import { useState } from "react"
import { Menu } from "./Menu";
import React from 'react';
import Select from 'react-select';
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

export const MCitas = (props) => {
    const [goBack, setBack] = useState(false);

    const userId = props.userId;
    const [selectedDay, setDay] = useState(null);
    const [selectedTime, setTime] = useState(null);
    const [selectedLocation, setLocation] = useState(0);
    const [selectedNDay, setNDay] = useState(null);
    const [selectedNTime, setNTime] = useState(null);


    //boton de volver
    const onBack = (event) => {
        setBack(true);
    }

    //boton de modificar una cita
    const onRequestAppointment = (event) => {
        event.preventDefault();
        //verificar que los espacios no esten en blanco
        if(selectedDay===null||selectedTime===null||selectedLocation===0||selectedNDay===null||selectedNTime===null){
            toast.error('Debe rellenar todos los espacios', TOAST_PROPERTIES);
            return;
        }
        //buscar si el usuario tiene una cita en esa fecha y hora y en esa sucursal
        fetch(`http://localhost:1337/api/getCitaU/${userId}/${selectedDay.value}/${selectedTime.value}/${selectedLocation.value}`)
        .then(async response => {
            const data = await response.json();
            if (data.status === "success"){
                if (data.json.length !== 0){
                    //buscar si hay una cita agendada en la sucursal en la nueva fecha y hora
                    fetch(`http://localhost:1337/api/getCita/${selectedNDay.value}/${selectedNTime.value}/${selectedLocation.value}`)
                    .then(async response => {
                        const data = await response.json();
                        if (data.status === "success"){
                            if (data.json.length === 0){
                                //realizar la modificación
                                fetch(`http://localhost:1337/api/modificarCita/${userId}/${selectedDay.value}/${selectedTime.value}/${selectedNDay.value}/${selectedNTime.value}/${selectedLocation.value}`, {
                                    method: 'POST'
                                })
                                .then(async response => {
                                    const data = await response.json();
                                    if (data.status === "success"){
                                        toast.success('Se actualizó su cita exitosamente', TOAST_PROPERTIES)
                                        console.log("Se actualizó su cita exitosamente");
                                    }
                                    else{
                                        console.log("Se encontró un error");
                                        toast.error('Se encontró un error', TOAST_PROPERTIES);
                                    }
                                })
                            } else {
                                toast.error('Ya existe una cita a esta hora', TOAST_PROPERTIES)
                                console.log("Ya existe una cita a esta hora");
                            }
                        } else{
                            toast.error('Ya existe una cita a esta hora', TOAST_PROPERTIES)
                            console.log("Se encontró un error");
                        }

                    })
                } else{
                    toast.error('No tiene ninguna cita agendada a esta hora', TOAST_PROPERTIES)
                    console.log("El usuario no tiene ninguna cita agendada a esta hora");
                }
            } else{
                toast.error('Se encontró un error', TOAST_PROPERTIES)
                console.log("Se encontró un error");
            }
        })
        .catch(error => {
            toast.error('Se encontró un error', TOAST_PROPERTIES)
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
                <Select defaultValue={selectedLocation}
                onChange={setLocation}
                options={suscursales}
                className="select-appointment"
                placeholder="Sucursal"/>
                <br/>
                <Select defaultValue={selectedNDay}
                onChange={setNDay}
                options={days}
                className="select-appointment"
                placeholder="Nueva Fecha"/>
                <br/>
                <Select defaultValue={selectedNTime}
                onChange={setNTime}
                options={horas}
                className="select-appointment"
                placeholder="Nueva Hora"/>
                <br/>
                <br/>
                <button className="button-appointment" onClick={onRequestAppointment}>Modificar Cita</button>
            </div>
        )
    }
    else {
        return (<Menu userId={userId} email={props.email}/>)
    }
    
}

