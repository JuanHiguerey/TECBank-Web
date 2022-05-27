import { useState } from "react"

import { Login } from "./Login";

export const Home = (props) => {
    const [goBack, setBack] = useState(false);

    const onBack = (event) => {
        setBack(true);
    }

    if(!goBack) {
        console.log("Logged in with userId " + props.userId);
        return (
            <div>
                <br/><button className="button-back" onClick={onBack}>Salir</button><br/><br/>
                <h1>Sample Text</h1>
                <div className="flex-container">
                    
                </div>
            </div>
        )
    }
    else {
        return (<Login/>)
    }
}

