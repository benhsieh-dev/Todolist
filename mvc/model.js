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
      const tmp = view.createTmp(this.#completedlist);
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

  const {getTodos, deleteTodo, createTodo, createComplete, updateTodo} = api;

  return {
    getTodos,
    deleteTodo,
    createTodo,
    createComplete,
    updateTodo,
    Todo,
    Completed,
    State
  }
})(Api, View);







// const Model = (() => {
//     class State {
//         #todos; //private field
//         #onChange; //function, will be called when setter function todos is called
//         constructor() {
//             this.#todos = [];
//         }
//         get todos() {
//             return this.#todos;
//         }
//         set todos(newTodos) {
//             // reassign value
//             console.log("setter function");
//             this.#todos = newTodos;
//             this.#onChange?.(); // rendering
//         }

//         subscribe(callback) {
//             //subscribe to the change of the state todos
//             this.#onChange = callback;
//         }
//     }
//     const { getTodos, createTodo, deleteTodo } = APIs;
//     return {
//         State,
//         getTodos,
//         createTodo,
//         deleteTodo,
//     };
// })();
/* 
    todos = [
        {
            id:1,
            content:"eat lunch"
        },
        {
            id:2,
            content:"eat breakfast"
        }
    ]

*/