import React, {useState} from 'react';
import './Terminal.css'
const Terminal = (props) => {
    const [getTerLine,setTerLine] = useState({Value:"iliyan@dimitrov:~$ ▮",blink:true});



    const updateTerminalLine = (e) =>{
        clearTimeout(timeoutID);
        setTerLine({Value:("iliyan@dimitrov:~$ "  + e.target.value.substring(19)).replaceAll("▮","") + "▮",blink:true});
      
    }

    
    let timeoutID = setTimeout(() =>{

        if(getTerLine.blink)
            setTerLine({Value:(getTerLine.Value + "").replaceAll("▮",""),blink:!getTerLine.blink});
        
        else
            setTerLine({Value: getTerLine.Value + ("▮"),blink:!getTerLine.blink});
        
    },1000);


    return (
        <div  id="main">

            <h1>This is a terminal</h1>
            <p>interactive Portfolio</p>
            <input id="command-line" type="text" spellCheck="false" value={getTerLine.Value} onChange={updateTerminalLine}/>       
        </div>
        
    );

    
}
export default Terminal;