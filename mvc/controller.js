import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
  const state = new model.State();

  const createTodo = () => {
    const inputbox = document.querySelector(view.domstr.inputbox);
    inputbox.addEventListener('keyup', event => {
      if (event.code === 'Enter' && event.target.value.trim() !== '') {
        const newtodo = new model.Todo(event.target.value);
        
        model.createTodo(newtodo).then(todo => {
          state.todolist = [todo, ...state.todolist];
        });
        event.target.value = '';
      }
    });
  }

  const createComplete = () => {
    const inputbox = document.querySelector(view.domstr2.inputbox);
    inputbox.addEventListener('keyup', event => {
      if (event.code === 'Enter' && event.target.value.trim() !== '') {
        const newcomplete = new model.Completed(event.target.value);
        
        model.createComplete(newcomplete).then(complete => {
          state.completedlist = [complete, ...state.completedlist];
        });
        event.target.value = '';
      }
    });
  }

  const moveTodo = () => {
    const toDoContainer = document.querySelector(view.domstr.container);
    // const completedContainer = document.querySelector(view.domstr2.container);
    
    toDoContainer.addEventListener('click', event => {
      if (event.target.className === 'right-arrow-btn') {
        console.log(event.target.value);
         const newcomplete = new model.Completed(event.target.value);
         model.createComplete(newcomplete).then(complete => {
          state.completedlist = [complete,...state.completedlist];
          state.todolist = state.todolist.filter((todo) =>  +todo.id !== +event.target.id);
        })      
    }});
  }

    const moveComplete = () => {
    const completedContainer = document.querySelector(view.domstr2.container);
    
    completedContainer.addEventListener('click', event => {
      if (event.target.className === 'left-arrow-btn') {
         console.log(event.target.value);
         const newtodo = new model.Todo(event.target.value);
         model.createTodo(newtodo).then(todo => {
          state.todolist = [todo,...state.todolist];
          state.completedlist = state.completedlist.filter((complete) =>  +complete.id !== +event.target.id);
        })      
    }});
  }

  const updateTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener('click', (event) => {
      const span = event.target.closest('SPAN');
      if (span) {
        const li = span.parentNode;
        const todoId = span.classList[0];
        const isComplete = span.classList.contains('complete');
        model.updateTodo(todoId);
        span.classList.toggle('complete', !isComplete);
        // console.log('span');
      }
    });
  };


  const deleteTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener('click', event => {
      if (event.target.className === 'deletebtn') {
        state.todolist = state.todolist.filter((todo) => {
          return +todo.id !== +event.target.id;
        });
        // console.log(event.target.id);
        model.deleteTodo(event.target.id);
      }
    });
  }

    const editTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener('click', (event) => {
       if (event.target.className === 'fa fa-pencil todo-pencil'){
        console.log('editable pencil!');
        const span = event.target.closest('SPAN');
        const input = document.createElement('input');
        input.type = 'text';
        span.value = span.textContent; 
        // const isComplete = span.classList.contains('complete');
        model.updateTodo(todoId);
      }
    });
  }


  const deleteComplete = () => {
    const container = document.querySelector(view.domstr2.container);

    container.addEventListener('click', event => {
      if (event.target.className === 'deletebtn2') {
        state.completedlist = state.completedlist.filter((complete) => {
          return +complete.id !== +event.target.id;
        });
        console.log(event.target.id);
        model.deleteComplete(event.target.id);
      }
    });
  }

  const init = () => {
    model.getTodos().then(todos => {
      state.todolist = todos.reverse();
    })
  }

  const init2 = () => {
    model.getCompletes().then(completes => {
      state.completedlist = completes.reverse();
    })
  }

  const bootstrap = () => {
    init();
    init2();
    deleteTodo();
    deleteComplete();
    createTodo();
    createComplete();
    updateTodo();
    moveTodo();
    moveComplete(); 
    editTodo(); 
  }

  return { bootstrap };
})(Model, View);







// const Controller = ((view, model) => {
//     const state = new model.State();
//     const init = () => {
//         model.getTodos().then((todos) => {
//             todos.reverse();
//             state.todos = todos;
//         });
//     };

//     const handleSubmit = () => {
//         view.submitBtnEl.addEventListener("click", (event) => {
//             /* 
//                 1. read the value from input
//                 2. post request
//                 3. update view
//             */
//             const inputValue = view.inputEl.value;
//             model.createTodo({ content: inputValue }).then((data) => {
//                 state.todos = [data, ...state.todos];
//                 view.clearInput();
//             });
//         });
//     };

//     const handleDelete = () => {
//         //event bubbling
//         /* 
//             1. get id
//             2. make delete request
//             3. update view, remove
//         */
//         view.todolistEl.addEventListener("click", (event) => {
//             if (event.target.className === "delete-btn") {
//                 const id = event.target.id;
//                 console.log("id", typeof id);
//                 model.deleteTodo(+id).then((data) => {
//                     state.todos = state.todos.filter((todo) => todo.id !== +id);
//                 });
//             }
//         });
//     };

//     const bootstrap = () => {
//         init();
//         handleSubmit();
//         handleDelete();
//         state.subscribe(() => {
//             view.renderTodos(state.todos);
//         });
//     };
//     return {
//         bootstrap,
//     };
// })(View, Model); //ViewModel

// Controller.bootstrap();
