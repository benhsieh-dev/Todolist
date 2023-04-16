export const View = (() => {

  const domstr = {
    container: '#todolist_container',
    deletebtn: '.deletebtn',
    inputbox: '.todolist__input'
  };

  const domstr2 = {
    container: '#completedlist_container',
    deletebtn: '.deletebtn2',
    inputbox: '.completedlist__input'
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  }

  const render2 = (ele2, tmp2) => {
    ele2.innerHTML = tmp2;
  }

  const createTmp = (arr) => {
    let tmp = arr
      .map((ele) => {
        return `
        <li>
          <span class="${ele.id}">${ele.id}-${ele.title}</span>
          <button id="${ele.id}" class="deletebtn">X</button>
          <button id="${ele.id}" class="right-arrow-btn">&#8594</button>
        </li>
      `;
      })
      .join('');
    return tmp;
  };

  const pendingTmp = (arr) => {
    let tmp2 = arr
      .map((ele2) => {
        return `
        <li>
          <button id="${ele2.id}" class="right-arrow-btn">&#8592</button>
          <span class="${ele2.id}">${ele2.id}-${ele2.title}</span>
          <button id="${ele2.id}" class="deletebtn2">X</button>
        </li>
      `;
      })
      .join('');
    return tmp2;
  };

  return {
    domstr,
    domstr2,
    render,
    render2,
    createTmp,
    pendingTmp
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