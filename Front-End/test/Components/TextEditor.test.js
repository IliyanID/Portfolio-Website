import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react'
import TextEditor from '../../src/Components/TextEditor/TextEditor';

describe('Text Editor', () => {
    it('render TextEditor', () => {
        render(<TextEditor />)
    })

});