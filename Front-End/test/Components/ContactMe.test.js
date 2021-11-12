import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react'
import ContactMe from '../../src/Components/ContactMe/ContactMe';

describe('ContactMe', () => {
    beforeEach(()=>{
      render(<ContactMe/>)
    })
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    it('submit empty contactMe', () => {
        fireEvent.click(screen.getByRole('submitButton'))
    })
});