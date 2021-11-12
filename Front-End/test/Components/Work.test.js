import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react'
import Work from '../../src/Components/Work/Work';

describe('Work', () => {
    let repo = [
        {name:'',link:'',description:'',languages:'',size:''}
    ]
    /*it('render Work', () => {
        render(<Work setLoad={()=>{}} getLoad={true} repos={repo}/>)
        //fireEvent.click(screen.getByRole('submitButton'))
    })*/
    it('render Work with repos', () => {
        render(<Work getLoad={false} repos={[]}/>)
    })

});