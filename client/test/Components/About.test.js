import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import About from '../../src/Components/About/About';

describe('About', () => {
    beforeEach(()=>{
      render(<About/>)
    })
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    it('render About', () => {

    })
});