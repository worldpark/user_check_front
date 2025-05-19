import {useState} from "react";


const Test = () => {

    const {name, setName} = useState("aa");

    return(
        <div>
            test Component
            {name}
        </div>
    )
}

export default Test;