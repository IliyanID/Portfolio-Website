import React, {useState, Fragment, useEffect, useRef } from 'react';
import './Terminal.css'
import  OS  from './OS'
import CommandParser from './CommandParser'
import starter_command_descriptions  from '../../Resources/constants/starter_command_descriptions.json'

const create_initial_text = ()=>{
    let result = 
    [
        <h2>Iliyan Dimitrov</h2>,
        <h3>This is a Fully Interactive Portfolio Page with a Linux Insprired Terminal<br/></h3>,

        <p>To Use the Portfolio Either <u className="attention">Use the Navigation</u></p>,
        <p>Or <u className="attention">Explore the Terminal</u><br/><br/></p>,

        <p>To Begin, Type:</p>
    ]
    starter_command_descriptions.forEach((command_obj,index)=>{
        result.push(<p className="indented"><b className="I">[{index+1}]</b> or <b className="I">[open {command_obj.name}]</b>: {command_obj.description}</p>)
    })
    result.push(<br/>)
    return result;
}

const updateTerminalLine = (e,allPackages) =>{
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
    commands.forEach((indivCommand)=>{
        if(indivCommand === '')
            return
        let addition = CommandParser(indivCommand.trim(),allPackages)
        if(addition === 'clear')
            tempArr = create_initial_text();
        else
            tempArr = tempArr.concat(addition)
    }
    )
    allPackages.setContent(tempArr)
    allPackages.setCommand('')
}

const Handle_allPackages = (allPackages) =>{
    return useEffect(()=>{
        if(allPackages.interval.current.id !== 0)
            clearInterval(allPackages.interval.current.id)
        if(!allPackages.inView)
            return
        allPackages.interval.current.id = setInterval(allPackages.interval.current.function,1000);

        allPackages.inputRef.current.scrollIntoView();
    },[allPackages])
}

const PackageStates = () =>{
    const [os] = useState(new OS())
    const [command,setCommand] = useState('');
    const [path,setPath] = useState(os.terminalString);
    const[content,setContent] = useState(create_initial_text());
    return {
        os:os,
        command,setCommand,
        path,setPath,
        content,setContent
    }
}

const PackageRefs = (props) =>{
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
    return {
        inputRef:inputRef,
        blink:blink,
        interval:interval
    }
}


const PackageAll = (props) =>{
    const packagedStates = PackageStates();
    const packagedRefs = PackageRefs(props);
    let allPackages={
        ...packagedStates,
        ...packagedRefs,
        ...props
    }
    return allPackages
}


const Terminal = (props) => {

    const allPackages = PackageAll(props);
    Handle_allPackages(allPackages);

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
                <input data-testid='terminalInput' type="text" autoFocus spellCheck="false" autoComplete="off" value={allPackages.path + allPackages.command} onChange={(e)=>updateTerminalLine(e,allPackages)} ref={allPackages.inputRef}/>     
                <p>⠀</p>  
            </form>
        </div>       
    );
}
export default Terminal;