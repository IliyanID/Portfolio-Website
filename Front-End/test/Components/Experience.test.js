import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react'
import Experience from '../../src/Components/Experience/Experience';

describe('Experience', () => {
    beforeEach(()=>{
      render(<Experience/>)
    })
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    it('Render Experience', () => {
        //fireEvent.click(screen.getByRole('submitButton'))
    })
});