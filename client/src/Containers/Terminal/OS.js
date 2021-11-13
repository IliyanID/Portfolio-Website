import React from 'react'

import defaultFiles from '../../Resources/constants/defaultFiles.json'

const initializeLocalStorage = () =>{
    let tree = localStorage.getItem('iliyan-dimitrov-files');
    if(tree !== null)
        return
    
    saveData(defaultFiles)
}

const saveData = (tree) => {
    let stringFileStructure = JSON.stringify(tree)
    localStorage.setItem('iliyan-dimitrov-files',stringFileStructure)
}

export default class OS extends React.Component{
    user = 'guest'
    tree
    currentDirectory

    terminalString = this.user + '@IliyanDimitrov:~$ '


    constructor(props){
        super(props)
        initializeLocalStorage();
        this.tree = JSON.parse(localStorage.getItem('iliyan-dimitrov-files'))
        this.currentDirectory = this.tree
    }

    ls(){
        return this.currentDirectory
    }

    cd(parameters,path){

        let numberOfReversals = parameters.split('..').length - 1

        let absoluteSystemPath = path.split('/')
        if(numberOfReversals >= absoluteSystemPath.length)
            return ''

        //console.log('numberofrev:' + numberOfReversals  + 'before')
        //console.log(absoluteSystemPath)
        for(let i = 0; i < numberOfReversals; i++){
            absoluteSystemPath.pop()
        }
        console.log(absoluteSystemPath)

        let temp = [...absoluteSystemPath]
        let subDirectory = this.tree;
        for(let name in temp.splice(0,1)){
            name = temp[name]
            let index = -1;
            subDirectory.forEach((item,ind)=>{
                if(item.name === name && item.type === 'folder')
                    index = ind
            })
            if(index >= 0)
                subDirectory = subDirectory[index].children;
        }        
        console.log(numberOfReversals)


        if(numberOfReversals <= 0){
            let locations = parameters.split('/')
            let cumalitivePath = path
            for(let i = 0; i < locations.length;i++){
                let fileName = locations[i];
                for(let j = 0; j < this.currentDirectory.length; j++){
                    let item = this.currentDirectory[j]
                    if(item.name === fileName && item.type === 'folder'){
                        this.terminalString = item.path
                        this.currentDirectory = item.children;
                        
                        cumalitivePath += '/' + item.name
                        cumalitivePath = cumalitivePath.replaceAll(' ','')
                    }
                }
            }
            return cumalitivePath + ' ';
        }
        else{
            this.currentDirectory = subDirectory;

            let result = ''
            absoluteSystemPath.map((item)=>result += '/' + item)
            result = result.replaceAll(' ','')
            return result.substring(1) + ' ' 
        }
    }

    mkdir(parameters,path){
        let absoluteSystemPath = path.split('/')
        this.currentDirectory.push(
            {
                "type" : "folder",
                "name" : parameters,
                "path" : "/" + absoluteSystemPath[absoluteSystemPath.length - 2],
                "privileges" : ["read","write","execute"],
                "owner" : [this.user],
                "children":[]
            }
        )
        this.tree[absoluteSystemPath] = this.currentDirectory
        saveData(this.tree)
        
    }

    touch(parameters,path){
        let absoluteSystemPath = path.split('/')
        this.currentDirectory.push(
            {
                "type" : "file",
                "name" : parameters,
                "path" : "/" + absoluteSystemPath[absoluteSystemPath.length - 2],
                "privileges" : ["read","write","execute"],
                "owner" : [this.user]
            }
        )
        this.tree[absoluteSystemPath] = this.currentDirectory
        saveData(this.tree)
        
    }

    mv(parameters){

    }

    rm(parameters,path){
        let absoluteSystemPath = path.split('/')
        parameters = parameters.replaceAll('*','.*')
        let removedItem = this.currentDirectory.findIndex((el)=>el.name.match(parameters))
        while(removedItem >= 0){

            let permissions = this.currentDirectory[removedItem].owner
            let permissionsCheck = (permissions.length === 0 || permissions.includes(this.user))

            if(permissionsCheck){
                this.currentDirectory.splice(removedItem,1)
                this.tree[absoluteSystemPath] = this.currentDirectory
                saveData(this.tree)
            }
            removedItem = this.currentDirectory.findIndex((el)=>(el.name.match(parameters) && permissionsCheck)) 
        }
    }

    open(parameters){
        let index = this.currentDirectory.findIndex(el=>el.name === parameters)
        if(index >= 0)
            return this.currentDirectory[index].owner
        else
            return false
    }

    su(user){
        this.terminalString = this.terminalString.substring(this.terminalString.indexOf('@'))
        this.terminalString = user + this.terminalString;
        this.user = user
    }
    
    reset(){
        saveData(defaultFiles)
        window.location.reload();
    }
}

