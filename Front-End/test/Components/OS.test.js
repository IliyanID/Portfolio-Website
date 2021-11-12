import { describe, it, expect } from '@jest/globals';
import  OS  from '../../src/Containers/Terminal/OS'
import defaultFiles from '../../src/Resources/Static/defaultFiles.json'

describe('OS', () => {
    var localStorageMock = (function() {
        var store = {
            "iliyan-dimitrov-files":JSON.stringify(defaultFiles)
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
      let path = 'test@test'

    const os = new OS();
    it('test ls', () => {
        expect(os.ls()).toBeDefined()
    })

    it('test cd', () => {
        expect(os.cd('./root/data',path)).toBeDefined()
        expect(os.cd('../..',path)).toBeDefined()
        expect(os.cd('..',path)).toBeDefined()
    })

    it('test mkdir', () => {
        expect(os.mkdir('file',path)).toEqual(undefined)
    })

    it('test touch', () => {
        expect(os.touch('file',path)).toEqual(undefined)
    })

    it('test open', () => {
        expect(os.open('file')).toBeDefined()
    })
    it('test rm', () => {
        os.rm('file',path)
    })

    it('test su', () => {
        os.su('user')
        expect(os.user).toEqual('user')
    })

    it('test reset', () => {
        os.reset()
    })
});