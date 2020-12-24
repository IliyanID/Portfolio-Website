import React, { PureComponent , useRef} from 'react';
import './App.css';
import Terminal from'./Terminal/Terminal'

let timeoutID = null;

class App extends PureComponent {

 

  state = {
    tabs:[],
    buttons:null
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
    tempTabs.splice(tempTabs.indexOf(tab), 1);
    this.setState({tabs:tempTabs})

  }

  render () {

    let id = 0;
    const allTabs = (
      <li id="tabs">
        <li className="indTab selectedTab">Terminal</li>
        {this.state.tabs.map((tab) =>{
        return (<li className="indTab" key={id++}>{tab}<b onClick={()=>{this.removeTab(tab)}} className="closeX">X</b></li>);
        })}
        <li id="addTab"onClick={()=>{this.addTab("Terminal")}}>+</li>
      </li>
    );

    

    return (
    <div id="app">
      <ol start="0" id="navBar">
        <li onClick={()=> this.addTab("About")}>About</li>
        <li onClick={()=> this.addTab("Experience")}>Experience</li>
        <li onClick={()=> this.addTab("Work")}>Work</li>
        <li>Contact Me</li>
      </ol>
      
      {allTabs}

      <Terminal 
        ref="child"
        addTab = {this.addTab}
        setTimeoutId = {this.setTimeoutId}>
        
      </Terminal>
      
      <p id="footer">Created and Designed by Iliyan Dimitrov</p>
    </div>
    );
  }
}

export default App;
