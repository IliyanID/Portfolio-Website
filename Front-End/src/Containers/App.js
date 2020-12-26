import React, { PureComponent , useRef} from 'react';
import ReactTooltip from 'react-tooltip'
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
    tabs:[],
    id:0
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
        tempTabs.push("Terminal");
        break;
      }

      case "About":{
        tempTabs.push("About");
        break;
      }

      case "Experience":{
        tempTabs.push("Experience");
        break;
      }

      case "Work":{
        tempTabs.push("Work");
        break;
      }
      
      default :{
        return false;
      }
    }
    this.setState({tabs:tempTabs});
    return true;
  }

  removeTab = (tab) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);

    const tempTabs = [...this.state.tabs]

    let index = tempTabs.indexOf(tab)
    if(index < 0)
      return false;
    
      else{
      tempTabs.splice(index, 1);
    }
   
    this.setState({tabs:tempTabs})
    console.log("id " +this.state.id);
    return true;
  }

  selectTab = (id) =>{
    if(timeoutID !== null)
      clearTimeout(timeoutID);
    console.log("id: " + id +"\nselectedTab: " + this.state.id)
    this.setState({id:id});
  }

  render () {
    ReactTooltip.hide() ;


    let id = 0;
    let cx = classNames.bind(styles);
    let classes = cx('indTab',{selectedTab:id===this.state.id});
    const allTabs = (
      <li id="tabs">
        <li id={id} onClick={()=>this.selectTab(0)} className={classes}>Terminal</li>
        {this.state.tabs.map((tab) =>{
          id++;
          classes = cx('indTab',{selectedTab:id===this.state.id});
          return (<li onClick={()=>this.selectTab(id)} className={classes} key={id}>{tab}<b onClick={()=> {
            if(tab === "About")
              this.terminal.current.sendCommand("close aboutMe");
            else
              this.terminal.current.sendCommand("close " + tab.toLowerCase());
          }} className="closeX">X</b></li>);
        })}
        <li id="addTab"onClick={()=>{this.terminal.current.sendCommand("open terminal" )}}>+</li>
      </li>
    );

    
    return (      
    <div id="app">
      <ol id="navBar">
        <li onClick={()=> this.terminal.current.sendCommand("open aboutMe")}>About</li>
        <li onClick={()=> this.terminal.current.sendCommand("open experience")}>Experience</li>
        <li onClick={()=> this.terminal.current.sendCommand("open work")}>Work</li>
        <li onClick={()=> this.terminal.current.sendCommand("open contactMe")}>Contact Me</li>
      </ol>
      
      <ul className="links">
        <li><a href="https://github.com/IliyanID" target="_blank"><Github className="svg" title=""></Github></a></li>
        <li><a href="https://www.instagram.com/iliyanid2000/" target="_blank"><Instagram className="svg" title=""></Instagram></a></li>
        <li><a href="https://twitter.com/UnknownUnoticed" target="_blank"><Twitter className="svg" title=""></Twitter></a></li>
        <li><a href="https://www.linkedin.com/in/iliyan-dimitrov-43b520202/" target="_blank"><Linkedin className="svg" title=""></Linkedin></a></li>
        <li><a href="https://codepen.io/iliyanid" target="_blank"><Codepen className="svg" title=""></Codepen></a></li>
      </ul>

      <div className="emailLine">
        <div className="email"><a>iliyanid2000@gmail.com</a></div>
      </div>
      {allTabs}

      <Terminal 
        ref={this.terminal}
        addTab = {this.addTab}
        removeTab = {this.removeTab}
        setTimeoutId = {this.setTimeoutId}>   
      </Terminal>
      
      <a href="https://github.com/IliyanID/PortfolioWebsite" target="_blank" id="footer">Created and Designed by Iliyan Dimitrov</a>
    </div>
    );
  }
}

export default App;
