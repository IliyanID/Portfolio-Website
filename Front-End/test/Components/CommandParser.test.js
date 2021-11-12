import { describe, it, expect } from '@jest/globals';
import CommandParser from '../../src/Containers/Terminal/CommandParser';

describe('CommandParser', () => {
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
    let setPath = (newPath)=> path;
    let allPackages = {
        os:os,
        path:path,setPath:setPath
    }

    it('test clear', () => {
        expect(CommandParser('clear',allPackages)).toEqual('clear')
    })

    it('test help', () => {
        expect(CommandParser('help',allPackages)).toBeDefined()
    })

    it('test ls', () => {
        expect(CommandParser('ls',allPackages)).toBeDefined()
    })

    it('test cd', () => {
        expect(CommandParser('cd ./root',allPackages)).toBeDefined()
        allPackages.os.cd = (a,b)=>{return ''}
        expect(CommandParser('cd ./root',allPackages)).toBeDefined()
    })

    it('test mkdir', () => {
        expect(CommandParser('mkdir root',allPackages)).toBeDefined()
    })

    it('test rm', () => {
        expect(CommandParser('rm root',allPackages)).toBeDefined()
    })

    it('test touch', () => {
        expect(CommandParser('touch file',allPackages)).toBeDefined()
    })

    it('test open', () => {
        expect(CommandParser('open file',allPackages)).toBeDefined()

        allPackages.os.open = (a,b)=>{return ['guest']}
        expect(CommandParser('open file',allPackages)).toBeDefined()

        allPackages.os.open = (a,b)=>{return ['other']}
        expect(CommandParser('open file',allPackages)).toBeDefined()
    })

    it('test su', () => {
        expect(CommandParser('su user',allPackages)).toBeDefined()
    })

    it('test reset', () => {
        expect(CommandParser('reset',allPackages)).toBeDefined()
        expect(CommandParser('reset extra',allPackages)).toBeDefined()
    })

    it('test no command', () => {
        expect(CommandParser('',allPackages)).toBeDefined()
    })
});