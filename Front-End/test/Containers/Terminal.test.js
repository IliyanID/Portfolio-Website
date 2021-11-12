import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import { AppTester } from '../../src/Containers/App';

describe('Terminal', () => {
    it('render Terminal', () => {
        renderer.create(
            <AppTester/>,
          );

    });
});