import React from "react";
import ReactDOM from "react-dom";
import App, { Todo, TodoForm, useTodos } from "./App";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    it("Ejecutar completeTodo cuando hizo click en complete button", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;

      //completeTodo.mock.calls === []
      const todo = {
        isCompleted: true,
        text: "lala",
      };

      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          todo={todo}
          index={index}
        />
      );

      wrapper.find("button").at(0).simulate("click");
      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    it("Ejecutar removeTodo cuando hizo click en remove button", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;

      //completeTodo.mock.calls === []
      const todo = {
        isCompleted: true,
        text: "lala",
      };

      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          todo={todo}
          index={index}
        />
      );

      wrapper.find("button").at(1).simulate("click");
      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });
  });

  describe("TodoForm", () => {
    it("Llamar a addTodo cuando el formulario tiene un valor", () => {
      const addTodo = jest.fn();
      const prevent = jest.fn(); // no es necesario agregar en el preventDefault
      const wrapper = shallow(<TodoForm addTodo={addTodo} />);

      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi nuevo todo!" } });
      wrapper.find("form").simulate("submit", { preventDefault: prevent });

      expect(addTodo.mock.calls).toEqual([["mi nuevo todo!"]]);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });

  describe("customHook: useTodos", () => {
    it("addTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };

      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.addTodo("texto de prueba");
      props = wrapper.find("div").props();
      //console.log(props);
      expect(props.todos[0]).toEqual({ text: "texto de prueba" });
    });
    it("completeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };

      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      const index = 0;
      props.completeTodo(index);
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
    });
    it("removeTodo", () => {
      const Test = (props) => {
        const hook = props.hook();
        return <div {...hook} />;
      };

      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      const index = 0;
      props.removeTodo(index);
      props = wrapper.find("div").props();
      //console.log(props);
      expect(props.todos).toEqual([
        {
          text: "Todo 2",
          isCompleted: false,
        },
        {
          text: "Todo 3",
          isCompleted: false,
        },
      ]);
    });
    it("App", () => {
      const wrapper = mount(<App />);
      const prevent = jest.fn();

      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi todo!" } });

      wrapper.find("form").simulate("submit", { preventDefault: prevent });

      const respuesta = wrapper.find(".todo").at(0).text().includes("mi todo!");

      expect(respuesta).toEqual(true);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });
});
