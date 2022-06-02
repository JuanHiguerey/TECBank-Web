import { useState } from "react"

import { Login } from "./Login";

export const Home = (props) => {
    const [goBack, setBack] = useState(false);

    const userId = props.userId;

    const onBack = (event) => {
        setBack(true);
    }

    if(!goBack) {
        console.log("Logged in with userId " + userId);
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/>
                <div className="flex-row">
                    <button className="button-home">Transferencias</button>
                    <button className="button-home">Historial</button>
                    <button className="button-home">Pagos</button>
                    <button className="button-home">Menu</button>
                </div>
            </div>
        )
    }
    else {
        return (<Login/>)
    }
}

