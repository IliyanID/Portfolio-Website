import React from 'react'; 
import { describe, it, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import  getRepos  from '../../src/util/getRepos';

describe('App', () => {

 
    it('render App', async () => {
        getRepos()
        

        //let f = await getRepos();

    });



});