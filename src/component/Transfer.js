import { useState } from "react"

import { Home } from "./Home";

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

    const userId = props.userId;

    const onBack = (event) => {
        setBack(true);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        var bankStr = bank;
        if(bankStr === '') {
            bankStr = "NONE";
        }
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
                console.log("No fue posible realizar la transferencia.");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    if(goBack) {
        return (
            <Home userId={userId}/>
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
                    <button className="button-login" type="submit">Confirmar</button><br/><br/>
                </form>
            </div>
        )
    }
}

