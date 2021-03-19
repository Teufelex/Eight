"use strict"
const DESK = {
  properties: {
    size: 8,
    fig: Array(this.size),
    matrix: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63, 64]
    ],
    sol: 0,
  },

  show() {
    let desk = document.createElement("div");
    desk.classList.add("board");
    desk.id = this.properties.sol;
    for (let r = 0; r < this.properties.size; r++) {
      for(let c = 0; c < this.properties.size; c++) {
        let cell = document.createElement("div");
        cell.setAttribute("data-id", `${r * this.properties.size + c + 1}`);
        cell.classList.add("cell", ((r + c) % 2) ? "black" : "white");
        if (this.properties.fig[c] === r) {
          cell.innerHTML = "&#9819;";
          cell.style.cursor = "pointer";
          cell.addEventListener("click", this.cellActive);
        }
        desk.appendChild(cell);
      }
    }
    document.body.appendChild(desk);
  },

  cellActive(e) {
    let parent = e.target.parentNode.getAttribute("id");
    let elem = e.target.getAttribute("data-id");
    let idxR, idxC;
    let matrix = DESK.properties.matrix;
    elem = +elem;

    for (let i = 0; i < matrix.length; i++) 
      if (matrix[i].indexOf(elem) > -1) {
        idxR = i;
        idxC = matrix[i].indexOf(elem);
        break;
      }

    for (let i = 0; i < matrix.length; i++) {
      document
      .getElementById(`${parent}`)
      .querySelector(`div[data-id = "${matrix[idxR][i]}"]`)
      .classList.toggle("active");

      document
      .getElementById(`${parent}`)
      .querySelector(`div[data-id = "${matrix[i][idxC]}"]`)
      .classList.toggle("active");

      for (let j = 0; j < matrix[i].length; j++) {
        if (Math.abs(idxR - i) === Math.abs(idxC - j)) { 
          document
          .getElementById(`${parent}`)
          .querySelector(`div[data-id = "${matrix[i][j]}"]`)
          .classList.toggle("active");
        }
      }
    }
  },
  
  solve(n) {
    if (n === undefined) n = 0;
    if (n === this.properties.size) {
      ++this.properties.sol;
      this.show();
      return;
    }
  
    for (let r = 0, c; r < this.properties.size; r++) {
      for (c = 0; c < n; c++)
        if (this.properties.fig[c] === r 
          || Math.abs(this.properties.fig[c] - r) === n - c) 
          break;
  
      if (c === n) {
        this.properties.fig[c] = r;
        this.solve(n + 1);
      }
    }
  }
}

const startPage = () => {
  let title = document.createElement("div");
  title.classList.add("conent__wrapper");
  title.innerHTML = `
  <h2 class="page__title">Количество найденных расстановок:</h2> 
  <span>${DESK.properties.sol}</span>
  <h3 class="page__subtitle">Введите номер расстановки:</h3>
  <div class="field" contenteditable=true></div>`
  document.body.appendChild(title);
}

const showDesk = () => {
  let val = document.querySelector(".field").innerHTML;
  let btn = document.querySelector(".back__btn");
  document.querySelector(".conent__wrapper").style.display = "none";
  document.getElementById(`${val}`).style.display = "flex";
  btn.style.display = "block";
  btn.addEventListener('click', goBack);
}

const goBack = () => {
  let val = document.querySelector(".field").innerHTML;
  document.querySelector(".field").innerHTML = "";
  document.querySelector(".conent__wrapper").style.display = "flex";
  document.getElementById(`${val}`).style.display = "none";
  document.querySelector(".back__btn").style.display = "none";
  document.querySelector(".field").focus();
}

const setNumber = (e) => {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      showDesk();
    }
  } else {
    showDesk();
  }
}

DESK.solve();
startPage();

document.querySelector(".field").addEventListener('keypress', setNumber);
document.querySelector(".field").addEventListener('blur', setNumber);
document.querySelector(".field").focus();