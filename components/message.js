import { store } from '../store/store'
import { initTable } from './initTable'

export class Messages {
  constructor(className) {
    this.el = document.querySelector(className)
  }

  show() {
    this.el.classList.add('show')

    const reloadBtn = document.querySelector('.reload')

    reloadBtn.onclick = () => {
      store.page = 1
      initTable()
    }
  }

  hide() {
    this.el.classList.remove('show')
  }
}
