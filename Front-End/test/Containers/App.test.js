import React from 'react'; 
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../../src/Containers/App';

describe('App', () => {

    let app = new App()
    it('render App', () => {
        app.render();
        app.setLoad();
        app.addTab('About')
        app.selectTab(0)
    });



});