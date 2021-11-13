import { describe, it, expect } from '@jest/globals';
import  OS  from '../../src/Containers/Terminal/OS'
import default_files from '../../src/Resources/constants/default_files.json'
import allPackages_MOCK from '../Resources/allPackages_MOCK'

describe('OS', () => {
    var localStorageMock = (function() {
        var store = {
            "iliyan-dimitrov-files":JSON.stringify(default_files)
        };
        return {
          getItem: function(key) {
            return store[key];
          },
          setItem: function(key, value) {
            store[key] = value.toString();
          },
          clear: function() {
            store = {};
          },
          removeItem: function(key) {
            delete store[key];
          }
        };
      })();
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });

    const os = new OS();
    let allPackages = {...allPackages_MOCK}
    let path = allPackages.path

    const set = (str_input) => {
      allPackages.commandSelector = str_input.split(' ')
    }

    it('test ls', () => {
        expect(os.ls()).toBeDefined()
    })

    it('test cd', () => {
        expect(os.cd('./root/data',allPackages.path)).toBeDefined()

        expect(os.cd('../..',allPackages.path)).toBeDefined()

        expect(os.cd('..',allPackages.path)).toBeDefined()
    })

    it('test mkdir', () => {
        set('mkdir file')
        expect(os.mkdir(allPackages)).toEqual(undefined)
    })

    it('test touch', () => {
        set('touch file')
        expect(os.touch(allPackages)).toEqual(undefined)
    })

    it('test open', () => {
        expect(os.open('file')).toBeDefined()
    })
    it('test rm', () => {
        set('rm file')
        os.rm(allPackages)
    })

    it('test su', () => {
        os.su('user')
        expect(os.user).toEqual('user')
    })

    it('test reset', () => {
        os.reset()
    })
});