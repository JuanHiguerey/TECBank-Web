import { useState } from "react"
import React from 'react';
import { Menu } from "./Menu";
import Select from 'react-select';
import {countryList, value_label} from '../misc/paises';

export const Reportes = (props) => {
    const [goBack, setBack] = useState(false);

    const userId = props.userId;
    const [selectedName, setName] = useState(null);
    const [selectedCedula, setCedula] = useState(null);
    const [selectedPhoneNum, setPhoneNum] = useState(null);
    const [selectedEmail, setEmail] = useState(null);
    const [selectedCountries, setCountries] = useState(null);
    const [selectedExitDate, setExitDate] = useState(null);
    const [selectedReturnDate, setReturnDate] = useState(null);

    

    //boton de volver
    const onBack = (event) => {
        setBack(true);
    }

    //boton de submit
    const onSubmitReport = (event) => {
        event.preventDefault();
        //asegurarse que la fecha de regreso es después que la de salida
        if (compareDates(selectedExitDate.value, selectedReturnDate.value)){
            fetch(`http://localhost:1337/api/reporteSalida/${userId}/${selectedName}/${selectedCedula}/${selectedPhoneNum}/${selectedEmail}/${countriesToStr(selectedCountries)}/${selectedExitDate.value}/${selectedReturnDate.value}`, {
                method: 'POST'
            })
            .then(async response => {
                const data = await response.json();
                if (data.status === "success"){
                    console.log("Se generó el reporte exitosamente");
                } else{
                    console.log("Se encontró un error");
                }
            })
        }
        else{
            console.log("La fecha de regreso debe ser después de la fecha de salida")
        }
    }


    //dias
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    var days = [];

    for (let i = 0; i < 90; i++){
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

    //paises
    const paises = value_label(countryList)



    //pantalla
    if (!goBack){
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/>
                <h1>Reportes de Salida del País</h1>
                
                <div className="flex-row-report">
                    <label className="report-label">Nombre Completo</label><br/>
                    <input
                        className="long-input"
                        type='text'
                        value={selectedName}
                        onChange={(event) => setName(event.target.value)}
                    /><br/><br/>
                </div>
                <br/>
                <br/>

                <div className="flex-row-report">
                    <label className="report-label">Correo Electrónico</label><br/>
                    <input
                        className="long-input"
                        type='text'
                        value={selectedEmail}
                        onChange={(event) => setEmail(event.target.value)}
                    /><br/><br/>
                </div>
                <br/>
                <br/>

                <div className="flex-row-report">
                <label className="report-label">País</label><br/>
                    <Select defaultValue={selectedCountries}
                        onChange={setCountries}
                        options={paises}
                        className="select-date-report"
                        placeholder=""
                        isMulti={true}
                    /><br/><br/>
                </div>
                <br/>
                <br/>

                <div className="flex-row-report">
                    <label className="report-label">Número de Cédula</label><br/>
                    <input
                        className="short-input"
                        type='text'
                        value={selectedCedula}
                        onChange={(event) => setCedula(event.target.value)}
                    /><br/><br/>
                    <label className="report-label2">Número de Telefóno</label><br/>
                    <input
                        className="short-input"
                        type='text'
                        value={selectedPhoneNum}
                        onChange={(event) => setPhoneNum(event.target.value)}
                    /><br/><br/>
                </div>
                <br/>
                <br/>

                <div className="flex-row-report">
                    <label className="report-label">Día de Salida</label><br/>
                    <Select defaultValue={selectedExitDate}
                        onChange={setExitDate}
                        options={days}
                        className="select-date-report2"
                        placeholder=""
                    /><br/><br/>
                    <label className="report-label2">Día de Retorno</label><br/>
                    <Select defaultValue={selectedReturnDate}
                        onChange={setReturnDate}
                        options={days}
                        className="select-date-report2"
                        placeholder=""
                    /><br/><br/>
                </div>
                <br/>
                <br/>
                <button className="button-report" onClick={onSubmitReport}>Solicitar Cita</button>


            </div>
        )
    }
    else {
        return (<Menu userId={userId}/>)
    }
}



//funcion para comparar fechas
function compareDates(f1, f2){
    function getYear(f){
        let f_tmp = f
        let y = ""
        while (f_tmp[0] !== "-"){
            y = y + f_tmp[0]
            f_tmp = f_tmp.slice(1)
        }
        return y
    }

    function getMonth(f){
        let f_tmp = f
        let m = ""
        while (f_tmp[0] !== "-"){
            f_tmp = f_tmp.slice(1)
        }
        f_tmp = f_tmp.slice(1)
        while (f_tmp[0] !== "-"){
            m = m + f_tmp[0]
            f_tmp = f_tmp.slice(1)
        }
        return m
    }

    function getDay(f){
        let f_tmp = f
        while (f_tmp[0] !== "-"){
            f_tmp = f_tmp.slice(1)
        }
        f_tmp = f_tmp.slice(1)
        while (f_tmp[0] !== "-"){
            f_tmp = f_tmp.slice(1)
        }
        f_tmp = f_tmp.slice(1)
        return f_tmp
    }

    let y1 = parseInt(getYear(f1))
    let y2 = parseInt(getYear(f2))
    if (y1 < y2) {return true}
    if (y1 > y2) {return false}

    let m1 = parseInt(getMonth(f1))
    let m2 = parseInt(getMonth(f2))
    if (m1 < m2) {return true}
    if (m1 > m2) {return false}


    let d1 = parseInt(getDay(f1))
    let d2 = parseInt(getDay(f2))
    return d1 <= d2
}

//funcion para pasar los países a un string
function countriesToStr(countries){
    let str = ""
    let i = 0
    for (; i < countries.length - 1; i++){
        str = str + countries[i].value + ", "
    }
    return str + countries[i].value
}