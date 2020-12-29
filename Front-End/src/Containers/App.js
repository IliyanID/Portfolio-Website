import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';

import {ReactComponent as Github} from "../Resources/github.svg";
import {ReactComponent as Linkedin} from "../Resources/linkedin.svg";
import {ReactComponent as Twitter} from "../Resources/twitter.svg";
import {ReactComponent as Instagram} from "../Resources/instagram.svg";
import {ReactComponent as Codepen} from "../Resources/codepen.svg";

import Terminal from'./Terminal/Terminal'

let timeoutID = null;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.terminal = React.createRef();
  }
 

  state = {
    tabs:[{name:"Terminal",displayed:true,id:0}]
  };

  

  setTimeoutId = (iTimeoutID) =>{
    timeoutID = iTimeoutID;
  }

  addTab = (tabName) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    let tempTabs = [...this.state.tabs];

    if(tabName !=="Terminal" && tempTabs.indexOf(tabName) !== -1)
      return false;

      console.log("Adding tabName: " + tabName);
    switch(tabName){   
      case "Terminal":{
        tempTabs.push({name:"Terminal",displayed:false});
        break;
      }

      case "About":{
        tempTabs.push({name:"About",displayed:false});
        break;
      }

      case "Experience":{
        tempTabs.push({name:"Experience",displayed:false});
        break;
      }

      case "Work":{
        tempTabs.push({name:"Work",displayed:false});
        break;
      }
      
      default :{
        return false;
      }
    }
    this.setState({tabs:tempTabs});
    return true;
  }

  removeTab = (name) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    const tempTabs = [...this.state.tabs];
    let index = tempTabs.findIndex((tab)=>tab.displayed === true);
    tempTabs[index].displayed = false;
    tempTabs[0].displayed = true;

    index = tempTabs.findIndex((tab)=>tab.name === name);
    if(index < 0)
      return false;
    
    else
      tempTabs.splice(index, 1);
      
    this.setState({tabs:tempTabs})
    
    return true;
  }

  selectTab = (name) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    let tempArr = [...this.state.tabs].reverse();
    let findIndex = () =>{
      for(let i = tempArr.length - 1; i >= 0 ;i--){
        if(tempArr[i].name === name)
          return i;
      }
      return -1;
    }
    let index = findIndex();
    console.log("index " + index);


    for(let i = 0; i < tempArr.length; i++){
      if(i === index){
        tempArr[i].displayed = true;
      }
      else
        tempArr[i].displayed = false;
    }
    tempArr.reverse();
    this.setState({tabs:tempArr});
  }

  render () {


    let id = 0;
    let cx = classNames.bind(styles);
    
    const allTabs = (
      <li id="tabs">
        {this.state.tabs.map((tab)=>{
          let classes = cx('indTab',{selectedTab:tab.displayed});
          let result = (<li key={id} onClick={()=>this.selectTab(tab.id)} className={classes}>{tab.name}<b onClick={(e)=> {e.stopPropagation();this.removeTab(tab.id);}} className="closeX">X</b></li>);
          id++;
          return result;  
        })}
        <li id="addTab"onClick={()=>this.terminal.current.sendCommand("open terminal" )}>+</li>
      </li>
    );


    let currentDisplayed = this.state.tabs[this.state.tabs.findIndex((tab) => tab.displayed === true)].name;
    console.log("Current Displayed: " + currentDisplayed);
    

    return (      
    <div id="app">
      <ol id="navBar">
        <li onClick={()=> this.terminal.current.sendCommand("open aboutMe")}>About</li>
        <li onClick={()=> this.terminal.current.sendCommand("open experience")}>Experience</li>
        <li onClick={()=> this.terminal.current.sendCommand("open work")}>Work</li>
        <li onClick={()=> this.terminal.current.sendCommand("open contactMe")}>Contact Me</li>
      </ol>
      
      <ul className="links">
        <li><a href="https://github.com/IliyanID" target="_blank" rel="noreferrer"><Github className="svg" title=""></Github></a></li>
        <li><a href="https://www.instagram.com/iliyanid2000/" target="_blank" rel="noreferrer"><Instagram className="svg" title=""></Instagram></a></li>
        <li><a href="https://twitter.com/UnknownUnoticed" target="_blank" rel="noreferrer"><Twitter className="svg" title=""></Twitter></a></li>
        <li><a href="https://www.linkedin.com/in/iliyan-dimitrov-43b520202/" target="_blank" rel="noreferrer"><Linkedin className="svg" title=""></Linkedin></a></li>
        <li><a href="https://codepen.io/iliyanid" target="_blank" rel="noreferrer"><Codepen className="svg" title=""></Codepen></a></li>
      </ul>

      <div className="emailLine">
        <div className="email"><a href="/">iliyanid2000@gmail.com</a></div>
      </div>
      {allTabs}
      <Terminal 
        ref={this.terminal}
        addTab = {this.addTab}
        removeTab = {this.removeTab}
        setTimeoutId = {this.setTimeoutId}
        display = {currentDisplayed === "Terminal" ? "" : "hideTerminal"}>   
      </Terminal>
      
      
      <a href="https://github.com/IliyanID/PortfolioWebsite" target="_blank" id="footer" rel="noreferrer">Created and Designed by Iliyan Dimitrov</a>
    </div>
    );
  }
}

export default App;
