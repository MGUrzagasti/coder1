"use client"
import { useState } from "react"
import Boton from "./boton";
const Contador = () => {
    const [counter,setCounter] = useState(0)
    const handleCounter = () => setCounter(counter + 1)
  return <div>
    <Boton
      onClick={handleCounter}
    
    >
    click: {counter}
    </Boton>
  </div>;
};
export default Contador;