import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactMe from '../../src/Components/ContactMe/ContactMe';

describe('ContactMe', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );

    beforeEach(()=>{
      render(<ContactMe/>)
    })
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    it('submit empty contactMe', () => {
        fireEvent.click(screen.getByTestId('submitButton'))
    })
    it('submit none contactMe', async () => {
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByTestId('subject'), { target: { value: '40 -105' } });
      fireEvent.change(screen.getByTestId('text-box'), { target: { value: '40 -105' } });
      await waitFor(()=>{
        fireEvent.click(screen.getByTestId('submitButton'))
      })
      const a = () => new Promise(setImmediate);
      await a()
      
  })
});