import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import App from '../../src/Containers/App';

describe('App', () => {
    it('render App', () => {
        render(<App />);
    });
});