export const Account = (props) => {
    const name = props.name;
    const amount = props.amount;
    
    return (
        <div>
            <label className="label-account">{name}</label><button className="button-account">{amount}</button><br/>
        </div>
    )
}

