import { useState } from "react"
import {toast } from 'react-toastify';

import { Home } from "./Home";

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

export const Transfer = (props) => {
    const [goBack, setBack] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const [amount, setAmount] = useState('');
    const [ssn, setSSN] = useState('');
    const [bank, setBank] = useState('');
    const [detail, setDetail] = useState('');
    const [transerId, setTransferId] = useState('');
    const [tokenClient, setTokenClient] = useState("");
    const [tokenServer, setTokenServer] = useState(-1);

    const userId = props.userId;
    const email = props.email;

    const onBack = (event) => {
        setBack(true);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        var bankStr = bank;
        if(bankStr === '') {
            bankStr = "NONE";
        }
        if(tokenServer === tokenClient && tokenServer !== -1) {
            fetch(`http://localhost:1337/api/transfer/${source}/${target}/${amount}/${ssn}/${bankStr}/${detail}/${userId}`, {
                method: 'POST'
            })
            .then(async response => {
                const data = await response.json();
                if(data.status === "success") {
                    setTransferId(data.transferId);
                    setShowReceipt(true);
                }
                else {
                    toast.error('No fue posible realizar la transferencia.', TOAST_PROPERTIES);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                toast.error('Ha ocurrido un error.', TOAST_PROPERTIES);
            });
        }
        else {
            toast.error('El token introducido no coincide con el token generado', TOAST_PROPERTIES);
        }
    }

    const onGetToken = (event) => {
        fetch(`http://localhost:1337/api/token/send/${email}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                setTokenServer(data.token);
                toast.success('El token se envio exitosamente.', TOAST_PROPERTIES);
            }
            else {
                console.log("No se pudo obtener un  token.");
                toast.error('No se pudo obtener un  token.', TOAST_PROPERTIES);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('Ha ocurrido un error.', TOAST_PROPERTIES);
        });
    }

    if(goBack) {
        return (
            <Home userId={userId} email={props.email}/>
        )
    }
    else if(showReceipt) {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br/><br/>
                    <label className="label-account">IBAN del Beneficiario</label>
                    <button className="button-account">{target}</button><br/>
                    <label className="label-account">Cedula del Beneficiario</label>
                    <button className="button-account">{ssn}</button><br/>
                    <label className="label-account">Monto</label>
                    <button className="button-account">{amount}</button><br/>
                    <label className="label-account">Detalle</label>
                    <button className="button-account">{detail}</button><br/>
                    <label className="label-account">Numero de Comprobante</label>
                    <button className="button-account">{transerId}</button><br/>
            </div>
        )    
    }
    else {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br/><br/>
                <form onSubmit={onSubmitHandler}>
                    <label className="label-login">Cuenta Origen</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={source}
                        onChange={(event) => setSource(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Cuenta Destino</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={target}
                        onChange={(event) => setTarget(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Monto</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Cedula del Beneficiario</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={ssn}
                        onChange={(event) => setSSN(event.target.value)}
                    /><br/><br/>
                    <label className="label-login">Banco</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={bank}
                        onChange={(event) => setBank(event.target.value)}
                    /><br/><br/><br/>
                    <label className="label-login">Detalle</label><br/>
                    <input
                        className="input-login"
                        type='text'
                        value={detail}
                        onChange={(event) => setDetail(event.target.value)}
                    /><br/><br/><br/>
                    <label className="label-login">Token</label><br/>
                     <input
                        className="input-login"
                        type='text'
                        value={tokenClient}
                        onChange={(event) => setTokenClient(event.target.value)}
                    /><br/><br/><br/>
                    <button className="button-login" type="button" onClick={onGetToken}>Generar Token</button><br/><br/><br/>
                    <button className="button-login" type="submit">Confirmar</button><br/><br/>
                </form>
            </div>
        )
    }
}

