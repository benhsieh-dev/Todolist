import { Api } from "./api.js";
import { View } from "./view.js";

export const Model = ((api, view) => {
  class State {
    #todolist = [];
    #completedlist = [];

    get todolist() {
      return this.#todolist;
    }

    get completedlist() {
      return this.#completedlist;
    }

    set todolist(newtodos) {
      this.#todolist = newtodos;

      const container = document.querySelector(view.domstr.container);
      const tmp = view.createTmp(this.#todolist);
      view.render(container, tmp);
    }

    set completedlist(newcompletes) {
      this.#completedlist = newcompletes;

      const container = document.querySelector(view.domstr2.container);
      const tmp = view.pendingTmp(this.#completedlist);
      view.render(container, tmp);
    }
  }

  class Todo {
    constructor(title) {
      this.title = title;
      this.completed = false;
      this.userId = 8;
    }
  }

   class Completed {
    constructor(title) {
      this.title = title;
      this.completed = true;
      this.userId = 8;
    }
  }

  const {getTodos, getCompletes, deleteTodo, deleteComplete, createTodo, createComplete, updateTodo,updateComplete, moveTodo, editTodo} = api;

  return {
    getTodos,
    getCompletes,
    deleteTodo,
    deleteComplete, 
    createTodo,
    createComplete,
    updateTodo,
    updateComplete,
    moveTodo,
    editTodo,
    Todo,
    Completed,
    State
  }
})(Api, View);


