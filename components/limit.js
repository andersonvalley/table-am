import { store } from '../store/store'
import { initTable } from './initTable'

const selectLimit = document.querySelector('.limit')

export function setLimit() {
  selectLimit.value = store.limit

  selectLimit.onchange = e => {
    store.page = 1
    store.limit = e.target.value
    initTable()
  }
}
