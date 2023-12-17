import * as HTML from './html.js'
import * as Checker from './check.js'
import { appData } from './appData.js'

document.addEventListener('DOMContentLoaded', () => {
  HTML.writeTTTArea()
})

window.onload = () => {
  const tttBtns = document.querySelectorAll('.ttt_btn')
  const resetBtn = document.querySelector('.reset_btn')

  for (let i = 0; i < tttBtns.length; i++) {
    tttBtns[i].onclick = () => {
      const btnHTML = Checker.btnHTML(tttBtns[i])
      if (btnHTML && !appData.gameOver) {
        const sign = HTML.getTurn()
        HTML.add(sign, tttBtns[i])
        Checker.changeTurn()
        HTML.turnPos()

        const gameOver = Checker.gameOver()
        if (gameOver) {
          resetBtn.classList.remove('hide_full')
          Checker.counter()
        }
      }
    }
  }

  resetBtn.onclick = () => {
    Checker.reset()
  }
}
