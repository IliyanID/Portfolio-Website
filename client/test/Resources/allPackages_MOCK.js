let os = {
    user:'guest',
    tree:[],
    currentDirectory:[],
    terminalString:'',
    ls:()=>{return [{type:'folder',name:'name'},{type:'file',name:'name2'}]},
    cd:(a,b)=>{return ' '},
    mkdir:(a,b)=>{return []},
    touch:(a,b)=>{return []},
    rm:(a,b)=>{return false},
    su:()=>{return []},
    open:(a)=>{},
    reset:()=>{return []}
}
let path = ''
const setPath = (newPath)=> path;
export const allPackages_MOCK = {
    os:os,
    path:path,setPath:setPath,
    commandSelector:[' ',' ']
}

export default allPackages_MOCK