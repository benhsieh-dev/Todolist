/* 
  client side
    template: static template
    logic(js): MVC(model, view, controller): used to server side technology, single page application
        model: prepare/manage data,
        view: manage view(DOM),
        controller: business logic, event bindind/handling

  server side
    json-server
    CRUD: create(post), read(get), update(put, patch), delete(delete)
*/

/* ~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~ */

export const Api = (() => {
  const baseUrl = 'http://localhost:3000';
  const todoPath = 'todos';

  const getTodos = () => fetch([baseUrl, todoPath].join('/'))
    .then((response) => response.json());

  const createTodo = (newtodo) => fetch([baseUrl, todoPath].join('/'), {
    method: 'POST',
    body: JSON.stringify(newtodo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());

  const createComplete = (newtodo) => fetch([baseUrl, todoPath].join('/'), {
    method: 'POST',
    body: JSON.stringify(newtodo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());

  const updateTodo = (id, status) => fetch([baseUrl, todoPath, id].join('/'), {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
        completed: status, 
    })
  });
  const deleteTodo = (id) => fetch([baseUrl, todoPath, id].join('/'), {
    method: 'DELETE',
  });

  return {
    updateTodo,
    getTodos,
    deleteTodo,
    createTodo,
    createComplete
  }; // <---------- Api
})();


//IIFE
//todos
/* 
    hashMap: faster to search
    array: easier to iterate, has order


*/