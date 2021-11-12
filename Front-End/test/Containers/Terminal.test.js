import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import App from '../../src/Containers/App';
import Terminal from '../../src/Containers/Terminal/Terminal';
import About from '../../src/Components/About/About';
import ContactMe from '../../src/Components/ContactMe/ContactMe';
import Experience from '../../src/Components/Experience/Experience';
import Work from '../../src/Components/Work/Work';

describe('Terminal', () => {
    it('render Terminal', () => {
        let app = new App()
        renderer.create(
            <>{app.render}</>,
          );
          renderer.create(
            <Terminal/>,
          );
          renderer.create(
            <About/>,
          );
          renderer.create(
            <ContactMe/>,
          );
          renderer.create(
            <Experience/>,
          );
          renderer.create(
            <Work/>,
          );

    });
});