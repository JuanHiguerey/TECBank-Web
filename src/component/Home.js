import { useState, useEffect } from "react"

import { Menu } from "./Menu";
import { Login } from "./Login";
import { Account } from "./Account";
import { Transfer } from "./Transfer";
import { TransferLog } from "./TransferLog";

export const Home = (props) => {
    const [goBack, setBack] = useState(false);
    const [goMenu, setMenu] = useState(false);
    const [goTransfer, setTransfer] = useState(false);
    const [goTransferLog, setTransferLog] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const userId = props.userId;

    const onBack = (event) => {
        setBack(true);
    }

    const onMenu = (event) => {
        setMenu(true);
    }

    const onTransfer = (event) => {
        setTransfer(true);
    }

    const onTransferLog = (event) => {
        setTransferLog(true);
    }

    useEffect(() => {
        fetch(`http://localhost:1337/api/account/${userId}`)
        .then(async response => {
            const data = await response.json();
            if(data.status === "success") {
                console.log(data);
                setAccounts(data.accounts);
            }
            else {
                console.log("Failed to obtain bank accounts.");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, [userId]);

    if (goMenu) {
        return (<Menu userId={props.userId}/>)
    }
    else if(goTransfer) {
        return (<Transfer userId={userId}/>)
    }
    else if(goTransferLog) {
        return <TransferLog userId={userId}/>
    }
    else if(!goBack) {

        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/><br/><br/>

                {accounts.map((account) => {
                    return <Account key={account.idCuenta} name={account.IBAN} amount={account.saldo}/>
                })}

                <div className="flex-row">
                    <button className="button-home" onClick={onTransfer} userId={userId}>Transferencias</button>
                    <button className="button-home" onClick={onTransferLog}>Historial</button>
                    <button className="button-home">Pagos</button>
                    <button className="button-home" onClick={onMenu}>Menu</button>
                </div>
            </div>
        )
    }
    else {
        return (<Login/>)
    }
}