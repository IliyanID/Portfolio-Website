"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveFocus = toHaveFocus;

var _utils = require("./utils");

function toHaveFocus(element) {
  (0, _utils.checkHtmlElement)(element, toHaveFocus, this);
  return {
    pass: element.ownerDocument.activeElement === element,
    message: () => {
      return [this.utils.matcherHint(`${this.isNot ? '.not' : ''}.toHaveFocus`, 'element', ''), '', 'Expected', `  ${this.utils.printExpected(element)}`, 'Received:', `  ${this.utils.printReceived(element.ownerDocument.activeElement)}`].join('\n');
    }
  };
}