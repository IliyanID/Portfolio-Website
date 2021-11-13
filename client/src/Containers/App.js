import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';

import Terminal from'./Terminal/Terminal'
import About from '../Components/About/About';
import ContactMe from '../Components/ContactMe/ContactMe';
import Experience from '../Components/Experience/Experience';
import Work from '../Components/Work/Work';

import github_api from '../Resources/util/github_api'
import links_icons from '../Resources/constants/links_icons'

class App extends PureComponent {
  state = {
    tabs:[{name:"Terminal",displayed:true,id:0}],
    load:false,
    repos:[{name:"",link:"",description:"",languages:"",size:0}]
  };


  componentDidMount(){
    github_api().then((result)=>{
      this.setState(result)
    });
    
  }

  setLoad = () =>{
    this.setState({load:!this.state.load})
  }

  addTab = (tabName) =>{
    let tempTabs = [...this.state.tabs];

    if(tabName !=="Terminal" && tempTabs.findIndex((tab)=>tab.name === tabName) !== -1){
      let id = tempTabs[tempTabs.findIndex((tab)=>tab.name === tabName)].id;
      this.selectTab(id);
      return false;
    }

    tempTabs.map((tab)=>tab.displayed = false);
    switch(tabName){   
      case "Terminal":{
        tempTabs.push({name:"Terminal",displayed:true});
        break;
      }

      case "About":{
        tempTabs.push({name:"About",displayed:true});
        break;
      }

      case "Experience":{
        tempTabs.push({name:"Experience",displayed:true});
        break;
      }

      case "Work":{
        tempTabs.push({name:"Work",displayed:true});
        break;
      }

      case "Contact":{
        tempTabs.push({name:"Contact",displayed:true});
        break;
      }
      
      default :{
        return false;
      }
    }
    this.setState({tabs:tempTabs});
    return true;
  }

  removeTab = (id) =>{
 

    const tempTabs = [...this.state.tabs];
    let index = tempTabs.findIndex((tab)=>tab.displayed === true);
    tempTabs[index].displayed = false;
    tempTabs[0].displayed = true;

    if(!Number.isInteger(parseFloat(id)))
      index = tempTabs.findIndex((tab)=>tab.name === id);
    else
      index = tempTabs.findIndex((tab)=>tab.id === id);
      
    if(index <= 0)
      return false;
    
    else
      tempTabs.splice(index, 1);
      
    this.setState({tabs:tempTabs})
    
    return true;
  }

  selectTab = (id) =>{


    let tempArr = [...this.state.tabs].reverse();
    let findIndex = () =>{
      for(let i = tempArr.length - 1; i >= 0 ;i--){
        if(tempArr[i].id === id)
          return i;
      }
      return -1;
    }
    let index = findIndex();


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

  getContent = () =>{
    let index = this.state.tabs.findIndex((tab) => tab.displayed);
    let result = null;
    if(this.state.tabs[index].name === 'About')
      result = <About></About>
    else if(this.state.tabs[index].name === 'Experience')
      result = <Experience></Experience>
    else if(this.state.tabs[index].name === 'Work')
      result = <Work repos={this.state.repos} setLoad={this.setLoad} getLoad={this.state.load}></Work>
    else if(this.state.tabs[index].name === 'Contact')
      result = <ContactMe></ContactMe>

    return result;
  }

  allTabs(){
    let id = 0;
    let cx = classNames.bind(styles);
    return (
      <ol id="tabs">
        {
        this.state.tabs.map((tab)=>{
          let classes = cx({indTab:tab.id!==0},{terminal:tab.id===0},{selectedTab:tab.displayed});
          tab.id = id;
          let result = (<li key={id} onClick={()=>this.selectTab(tab.id)} className={classes}>{tab.name}<b onClick={(e)=> {e.stopPropagation();this.removeTab(tab.id);}} className="closeX">X</b></li>);
          id++;
          return result;  
        })}
        <li id="addTab"onClick={()=>this.terminal.current.sendCommand("open terminal" )}>+</li>
      </ol>
    );
  }

  render () {
   let content = this.getContent();
    return (      
    <div id="app">
      <ol id="navBar">
        <li onClick={()=> this.addTab("About")}>About</li>
        <li onClick={()=> this.addTab("Experience")}>Experience</li>
        <li onClick={()=> this.addTab("Work")}>Work</li>
        <li onClick={()=> this.addTab("Contact")}>Contact Me</li>
      </ol>
      
      <ul className="links">
        {
          links_icons.map((LinkObj,index)=>{
            const Icon = LinkObj.icon;
            return <li key={`link-key-${index}`}><a href={LinkObj.link} target="_blank" rel="noreferrer"><Icon className="svg" title=""/></a></li>
          })
        }
      </ul>

      <div className="emailLine">
        <div className="email"><span onClick={()=> this.addTab("Contact")}>dev.iliyan.dimitrov@gmail.com</span></div>
      </div>
      {this.allTabs()}
      <Terminal 
        ref={this.terminal}
        addTab = {this.addTab}
        removeTab = {this.removeTab}
        display = {this.state.tabs[0].displayed ? "" : "hideTerminal"}
        inView = {this.state.tabs[0].displayed}>   
      </Terminal>
      {content}
      <a href="https://github.com/IliyanID/PortfolioWebsite" target="_blank" id="footer" rel="noreferrer">Created and Designed by Iliyan Dimitrov</a>
    </div>
    );
  }
}


export default App;
