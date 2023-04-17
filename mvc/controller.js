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
        /* const newcomplete = new model.Completed(event.target.value);
         console.log(newcomplete);*/
         const li = event.target.closest('li');
         const span = event.target.closest('li').querySelector('span');
         const makeils =  span.innerHTML.split('-');
         const newcomplete = { completed: true, title: makeils[1] };

         model.moveTodo(newcomplete).then(complete => {
          state.completedlist = [complete,...state.completedlist];
          state.todolist = state.todolist.filter((todo) =>  +todo.id !== +event.target.id);
          model.deleteTodo(event.target.id);
        })      
    }});
  }

    const moveComplete = () => {
    const completedContainer = document.querySelector(view.domstr2.container);
    
    completedContainer.addEventListener('click', event => {
      if (event.target.className === 'left-arrow-btn') {
         console.log(event.target.value);
         const li = event.target.closest('li');
         const span = event.target.closest('li').querySelector('span');
         const makeils =  span.innerHTML.split('-');
         const newtodo = { completed: true, title: makeils[1] };

         model.createTodo(newtodo).then(todo => {
          state.todolist = [todo,...state.todolist];
          state.completedlist = state.completedlist.filter((complete) =>  +complete.id !== +event.target.id);
           model.deleteComplete(event.target.id);
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
    console.log("adsad");
       if (event.target.className === 'fa fa-pencil todo-pencil'){
        console.log('editable pencil!');
        const li = event.target.closest('li');
        const span = event.target.closest('li').querySelector('span');
        const text = event.target.closest('li').querySelector('.inpuvaluels');
        if(span.style.display=='none'){
          console.log('b');
          span.style.display = 'block';
          text.style.display = 'none';
          span.innerHTML = li.getAttribute('atilsis')+'-'+text.value;
          model.updateTodo(li.getAttribute('atilsis'),false,text.value);
        }else{
          span.style.display = 'none';
          text.style.display = 'block';
          
          const makeils =  span.innerHTML.split('-');
          text.value=makeils[1];
          console.log(makeils);
          console.log('a');
        }
        
        // const isComplete = span.classList.contains('complete');
       // model.updateTodo(todoId);
      }
    });
  }


  const deleteComplete = () => {
    const container = document.querySelector(view.domstr2.container);

    container.addEventListener('click', event => {
      if (event.target.className === 'fa fa-pencil complete-pencil'){
        console.log('sss');
        console.log('editable pencil!');
        const li = event.target.closest('li');
        const span = event.target.closest('li').querySelector('span');
        const text = event.target.closest('li').querySelector('.inpuvaluels');
        if(span.style.display=='none'){
          console.log('b');
          span.style.display = 'block';
          text.style.display = 'none';
          span.innerHTML = li.getAttribute('atilsis')+'-'+text.value;
          model.updateComplete(li.getAttribute('atilsis'),true,text.value);
        }else{
          span.style.display = 'none';
          text.style.display = 'block';
          
          const makeils =  span.innerHTML.split('-');
          text.value=makeils[1];
          console.log(makeils);
          console.log('a');
        }
      }
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
