import { store } from '../store/store'
import { rerenderTable } from './initTable'

const selectSort = document.querySelector('.sort')

export function setSort() {
  selectSort.onchange = e => {
    store.sortBy = e.target.value

    sortBy()
    rerenderTable()
  }
}

export function sortBy() {
  if (store.sortBy.includes('price')) {
    store.leads.sort((a, b) => (store.sortBy === 'price-min' ? a.price - b.price : b.price - a.price))
  } else {
    store.leads.sort((a, b) => a.name.localeCompare(b.name))
  }
}
