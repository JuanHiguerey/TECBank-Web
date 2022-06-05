import { useState, useEffect} from "react"

import { Home } from "./Home";

const Log  = (props) => {
    const label1 = "Transferencia Interna";
    const label2 = "Transferencia Externa";

    const typeId = props.typeId;
    const amount = props.amount;

    return (
        <div>
            <label className="label-account">{typeId === 1 ? label1 : label2}</label>
            <label className="button-account">{amount}</label><br/><br/>
        </div>
    )
}

export const TransferLog = (props) => {
    const [goBack, setBack] = useState(false);
    const [transfers, setTransfers] = useState([]);

    const userId = props.userId;

    const onBack = (event) => {
        setBack(true);
    }

    useEffect(() => {
        fetch(`http://localhost:1337/api/transfer/${userId}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                setTransfers(data.transfers);
            }
            else {
                console.log("Failed to obtain transfers.");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, [userId]);

    if(goBack) {
        return (
            <Home userId={userId}/>
        )
    }
    else {
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Regresar</button><br/><br/>
                {transfers.map((transfer) => {
                    return <Log key={transfer.idTransferencia} typeId={transfer.idTipoMovimiento} amount={transfer.monto}/>
                })}
            </div>
        )
    }
}

