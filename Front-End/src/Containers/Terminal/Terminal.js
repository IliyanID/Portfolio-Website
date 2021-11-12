import React, {useState, Fragment, useEffect, useRef } from 'react';
import './Terminal.css'
import { OS } from './OS'
import CommandParser from './CommandParser'
import { entryText } from '../../Resources/Static/entryText'


const updateTerminalLine = (e,allPackages) =>{
    clearInterval(allPackages.interval.current.id)
    allPackages.interval.current.id = setInterval(allPackages.interval.current.function,1000)

    let input = e.target.value;
    input = input.replaceAll('▮','') 

    if(input.length >= allPackages.path.length){
        allPackages.setCommand(input.substring(allPackages.path.length));
    }
}

const terminalSubmit = (e,allPackages) =>{
    e.preventDefault();

    let tempArr = [...allPackages.content]
    tempArr.push(<p>{allPackages.path + allPackages.command}</p>);

    let commands = allPackages.command.split('&&')
   
    commands.map((indivCommand)=>{
        let addition = CommandParser(indivCommand.trim(),allPackages)
        if(addition === 'clear')
            tempArr = entryText;
        else
            tempArr = tempArr.concat(addition)
    }
    )
    allPackages.setContent(tempArr)
    allPackages.setCommand('')
}

const ComponentDidMount = (allPackages) =>{
    return useEffect(()=>{
        allPackages.interval.current.id = setInterval(allPackages.interval.current.function,1000);
    },[])
}
const ScrollIntoViewOnTerminalUpdate = (allPackages) =>{
    return useEffect(()=>{
        let element = document.getElementById("command-line")
        if(element !== null){
            element.scrollIntoView();
        }
    },[allPackages.content])
}

const PackageAll = (props) =>{
    const [os] = useState(new OS())
    const [command,setCommand] = useState('');
    const [path,setPath] = useState(os.terminalString);
    const[content,setContent] = useState(entryText);

    const inputRef = useRef(null);
    const blink = useRef(false)
    const interval = useRef({
        id:0,
        function:()=>{
            if(!props.inView && inputRef.current && blink.current !== null)
                return

            inputRef.current.focus();

            if(blink.current)
                inputRef.current.value = inputRef.current.value.replaceAll('▮','');          
            else
                inputRef.current.value = inputRef.current.value + '▮'
            
            blink.current = !blink.current
            
            
        }
    })
    let allPackages={
        os:os,
        command:command,setCommand:setCommand,
        path:path,setPath:setPath,
        content:content,setContent:setContent,
        inputRef:inputRef,blink:blink,interval:interval
    }
    return allPackages
}


const Terminal = (props) => {

    const allPackages = PackageAll(props);
    ComponentDidMount(allPackages);
    ScrollIntoViewOnTerminalUpdate(allPackages);

    return (
        <div className={props.display + " main"}>
            <div className={"css-typing "}>           
                {
                    allPackages.content.map((item,key)=>{
                        return <Fragment key={key}>{item}</Fragment>;
                    })
                }
            </div>
            <form onSubmit={(e)=>terminalSubmit(e,allPackages)}>
                <input role='terminalInput' id="command-line" type="text" autoFocus spellCheck="false" autoComplete="off" value={allPackages.path + allPackages.command} onChange={(e)=>updateTerminalLine(e,allPackages)} ref={allPackages.inputRef}/>     
                <p>⠀</p>  
            </form>
        </div>       
    );
}
export default Terminal;