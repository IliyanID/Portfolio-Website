global.fetch = require('jest-fetch-mock');

// Subdue Console Messages in Jest Output (Console.error WILL get through for Testing!)

// Allow 'log' for debugging tests: screen.debug()
//console.log = jest.fn();

console.info = jest.fn();
console.debug = jest.fn();
console.trace = jest.fn();
console.warn = jest.fn();


// JSDOM used by Jest does not support SVG for Polyline due to missing createSVGRect
// Add a mock createSVGRect function to keep tests that render Polylines from failing.
// Credit: https://stackoverflow.com/questions/54382414/fixing-react-leaflet-testing-error-cannot-read-property-layeradd-of-null
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function(namespaceURI, qualifiedName) {
    if (namespaceURI==='http://www.w3.org/2000/svg' && qualifiedName==='svg') {
        const element = createElementNSOrig.apply(this, arguments);
        element.createSVGRect = function() {};
        return element;
    }
    return createElementNSOrig.apply(this, arguments);
}