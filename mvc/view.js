export const View = (() => {

  const domstr = {
    container: '#todolist_container',
    deletebtn: '.deletebtn',
    inputbox: '.todolist__input',
    rightArrowBtn: 'right-arrow-btn',
    todoPencil: 'fa fa-pencil todo-pencil'
  };

  const domstr2 = {
    container: '#completedlist_container',
    deletebtn: '.deletebtn2',
    inputbox: '.completedlist__input',
    leftArrowBtn: 'left-arrow-btn',
    completePencil: 'complete-pencil'
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
        <li atilsis="${ele.id}">
          <span class="${ele.id}">${ele.id}-${ele.title}</span>
          <input type='text' class='inpuvaluels' >
          <i id="${ele.id}" class="fa fa-pencil todo-pencil"></i>
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
        <li atilsis="${ele2.id}">
          <button id="${ele2.id}" class="left-arrow-btn">&#8592</button>
          <span class="${ele2.id}">${ele2.id}-${ele2.title}</span>
          <input type='text' class='inpuvaluels' >
          <i id="${ele2.id}" class="fa fa-pencil complete-pencil"></i>
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
