import React from 'react'; 
import { describe, it } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Terminal from '../../Containers/Terminal/Terminal';

describe('Terminal', () => {
    let addTab;
    beforeEach(()=>{
      addTab = (i)=>jest.fn();
      render(<Terminal addTab={addTab} inView={true} display={''}/>)
    })
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    jest.setTimeout(30000);
    it('render Terminal', () => {

      act(()=>{
        userEvent.type(screen.getByTestId('terminalInput'), "ls{enter}");
      })

      jest.useFakeTimers();
      jest.advanceTimersByTime(3000);
    });
    it('test ls command', () => {
      act(()=>{
        userEvent.type(screen.getByTestId('terminalInput'), "ls{enter}");
      })
    });
    it('test cd command', () => {
      act(()=>{
        userEvent.type(screen.getByTestId('terminalInput'), "cd ./root{enter}");
      })
    });
    it('test clear command', () => {
      act(()=>{
      userEvent.type(screen.getByTestId('terminalInput'), "clear{enter}");
    })
    });
    it('test delete', () => {
      act(()=>{
        userEvent.type(screen.getByTestId('terminalInput'), "{backspace}{enter}");
      })
    });
});