import { useState, useRef } from "react";

export default function Inputbox(){
    const [input, setInput] = useState("");
    const searchInput = useRef();
    
    return(
        <input className="w-full" ref={searchInput} onKeyUp={(e) => {
            if(e.key === "Enter"){
              setInput(searchInput.current.value);
            }}} placeholder="Search">
        </input>
    )
}