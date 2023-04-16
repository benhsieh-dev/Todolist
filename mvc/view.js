export const View = (() => {

  const domstr = {
    container: '#todolist_container',
    deletebtn: '.deletebtn',
    inputbox: '.todolist__input'
  };
  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  }
  const createTmp = (arr) => {
    let tmp = '';
    arr.forEach(ele => {
        if (ele.completed === true) {
             tmp += `
                <li>
                    <span class="completedTask" id="${ele.id}">${ele.id}-${ele.title}</span>
                    <button id="${ele.id}" class="deletebtn">X</button>
                </li>
          `; 
        } else {
            tmp += `
                <li>
                    <span class="pendingTask" id="${ele.id}">${ele.id}-${ele.title}</span>
                    <button id="${ele.id}" class="deletebtn">X</button>
                </li>
                
            `;
        }
    });
    return tmp;
  }

  return {
    domstr,
    render,
    createTmp
  };
})();






// const View = (() => {
//     const todolistEl = document.querySelector(".todo-list");
//     const submitBtnEl = document.querySelector(".submit-btn");
//     const inputEl = document.querySelector(".input");

//     const renderTodos = (todos) => {
//         let todosTemplate = "";
//         todos.forEach((todo) => {
//             const liTemplate = `<li><span>${todo.content}</span><button class="delete-btn" id="${todo.id}">delete</button></li>`;
//             todosTemplate += liTemplate;
//         });
//         if (todos.length === 0) {
//             todosTemplate = "<h4>no task to display!</h4>";
//         }
//         todolistEl.innerHTML = todosTemplate;
//     };

//     const clearInput = () => {
//         inputEl.value = "";
//     };

//     return { renderTodos, submitBtnEl, inputEl, clearInput, todolistEl };
// })();