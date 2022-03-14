import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

describe("Texto", () => {
  describe("Texto 2", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it("otro test", () => {});
  });
});
