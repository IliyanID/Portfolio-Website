import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react'
import Work from '../../src/Components/Work/Work';


describe('Work', () => {
    it('render Work', () => {
        render(<Work test={true} getLoad={true} repos={[{"name":"","link":"","description":"","languages":""}]}></Work>)
        
    })

    it('render Work with repos', () => {
        render(<Work getLoad={false} repos={[]}/>)
    })

});