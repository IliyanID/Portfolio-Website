import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import Terminal from '../../src/Containers/Terminal/Terminal';

describe('Terminal', () => {
    it('render Terminal', () => {
        renderer.create(
            <Terminal/>,
          );

    });
});