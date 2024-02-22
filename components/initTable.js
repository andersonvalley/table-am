import { LeadsService } from '../service/leads.service'
import { store } from '../store/store'
import { normalizeDate, normalizePrice } from '../utils/utils'
import { initPagination } from './pagination'
import { setSort } from './sort'
import { setLimit } from './limit'

const body = document.querySelector('.table__body')
const pagination = document.querySelector('.pag')

export const initTable = async () => {
  clearTableBody(body)
  store.leads = []

  if (store.limit === 'all') {
    await LeadsService.getAllLeadsWithDelay()
  } else {
    await LeadsService.getAll()
    initPagination()
  }

  insertRow()
  setLimit()
  setSort()
}

export function rerenderTable() {
  clearTableBody(body)
  insertRow()
  if (store.limit !== 'all') initPagination()
}

function insertRow() {
  for (let i = 0; i < store.leads.length; i++) {
    body.insertAdjacentHTML('beforeend', templateRow(store.leads[i]))
  }
}

function templateRow({ name, price, created_at, updated_at }) {
  return `
    <tr>
      <th scope="row">${name}</th>
      <td>${normalizePrice(price)}</td>
      <td>${normalizeDate(created_at)}</td>
      <td>${normalizeDate(updated_at)}</td>
    </tr>
  `
}

function clearTableBody(body) {
  pagination.classList.remove('show')
  body.innerHTML = ''
}
