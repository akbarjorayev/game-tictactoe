import * as HTML from './html.js'
import { appData } from './appData.js'

function btnHTML(btn) {
  return btn.children.length === 0
}

function changeTurn() {
  appData.turn = appData.turn == 'x' ? 'o' : 'x'
  return appData.turn
}

function getOpposite(turn) {
  return turn == 'x' ? 'o' : 'x'
}

const patterns = {
  horizontal: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ],
  vertical: [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ],
  diagonal: [
    [0, 4, 8],
    [2, 4, 6],
  ],
}

function gameOver() {
  const tttBtns = document.querySelector('.ttt_area').children
  const values = Object.values(patterns)

  for (let i = 0; i < values.length; i++) {
    const gameOver = byPattern(values[i], tttBtns)
    if (gameOver) {
      return true
    }
  }

  const activeBtns = []
  for (let i = 0; i < tttBtns.length; i++) {
    if (tttBtns[i].children.length === 0) {
      activeBtns.push(tttBtns[i])
    }
  }

  if (activeBtns.length === 0) {
    gameOvered(false, false)
    return true
  }
}

function byPattern(pattern, btns) {
  for (let i = 0; i < pattern.length; i++) {
    const pPattern = pattern[i]
    const checkArr = []

    for (let j = 0; j < pPattern.length; j++) {
      const btn = btns[pPattern[j]]
      if (btn.children.length !== 0) {
        checkArr.push(btn)
      }
    }

    if (checkArr.length !== 3) continue

    const signs = []
    for (let j = 0; j < checkArr.length; j++) {
      signs.push(checkArr[j])
    }

    const turnSigns = signs.filter(
      (sign) => getSign(sign) === getOpposite(appData.turn)
    )
    if (turnSigns.length == 3) {
      gameOvered(signs, true)
      return true
    }
  }
}

function gameOvered(btns, count) {
  HTML.gameOverBtns(btns)
  appData.gameOver = true
  if (count) appData.counter[getOpposite(appData.turn)]++
  return true
}

function getSign(btn) {
  if (btn.lastChild.classList.contains('x')) return 'x'
  if (btn.lastChild.classList.contains('o')) return 'o'
}

const resetBtn = document.querySelector('.reset_btn')

function reset() {
  appData.turn = 'o'
  appData.gameOver = false
  HTML.turnPos()
  resetBtn.classList.add('hide_full')

  const tttBtns = document.querySelector('.ttt_area').children
  for (let i = 0; i < tttBtns.length; i++) {
    tttBtns[i].classList.remove('active')
    tttBtns[i].innerHTML = ''
  }
}

const oCounter = document.querySelector('.counter_area .o')
const xCounter = document.querySelector('.counter_area .x')
function counter() {
  xCounter.innerText = appData.counter.x
  oCounter.innerText = appData.counter.o
}

export { btnHTML, changeTurn, gameOver, reset, counter }
