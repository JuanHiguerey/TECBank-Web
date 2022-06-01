import { useState } from "react"
import { Menu } from "./Menu";


import { Login } from "./Login";

export const Home = (props) => {
    const [goBack, setBack] = useState(false);
    const [goMenu, setMenu] = useState(false);

    const onBack = (event) => {
        setBack(true);
    }

    const onMenu = (event) => {
        setMenu(true);
    }


    if (goMenu){
        return (<Menu userId={props.userId}/>)
    }
    else if(!goBack) {
        console.log("Logged in with userId " + props.userId);
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/><br/><br/>
                <div className="flex-row">
                    <button className="button-home">Transferencias</button>
                    <button className="button-home">Historial</button>
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

