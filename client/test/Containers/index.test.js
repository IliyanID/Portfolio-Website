import React from "react";
import ReactDOM from "react-dom";
import App from "../../src/Containers/App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("index.js", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../../src/index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
  });
});