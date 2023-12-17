import { appData } from './appData.js'

const tttArea = document.querySelector('.ttt_area')

function writeTTTArea() {
  tttArea.innerHTML = ''
  const child = `<div class="ttt_btn btn df_ai_jc_ce hover"></div>`
  const html = Array(9).fill(child)

  add(html.join('').trim(), tttArea)
}

function add(htmlStr, pEl) {
  if (typeof htmlStr != 'string' || !(pEl instanceof HTMLElement)) {
    throw new Error('Invalid parameters')
  }

  const template = document.createElement('template')
  template.innerHTML += htmlStr.trim()

  pEl.appendChild(template.content)
  return template
}

function getTurn() {
  const sign = appData.turn == 'x' ? 'close' : 'trip_origin'
  const html = `<span class="${appData.turn} material-symbols-outlined"> ${sign} </span>`
  return html
}

function turnPos() {
  const turnPosEl = document.querySelector('.turn_area_pos')
  turnPosEl.classList.remove('right', 'left')

  if (appData.turn == 'x') {
    turnPosEl.classList.add('right')
  }
  if (appData.turn == 'o') {
    turnPosEl.classList.add('left')
  }
}

function gameOverBtns(btns) {
  if (!btns) return

  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.add('active')
  }
}

export { writeTTTArea, add, getTurn, turnPos, gameOverBtns }
