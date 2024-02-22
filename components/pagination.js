import { store } from '../store/store'
import { initTable } from './initTable'

const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')
const pagination = document.querySelector('.pag')

export function initPagination() {
  pagination.classList.add('show')

  nextBtn.addEventListener('click', nextPage)
  prevBtn.addEventListener('click', prevPage)
}

async function nextPage() {
  store.page += 1
  await initTable()

  prevBtn.parentElement.classList.add('active')

  if (!store.nextPage) {
    nextBtn.parentElement.classList.remove('active')
  }
}

function prevPage() {
  if (store.page === 1) return

  prevBtn.parentElement.classList.add('active')
  nextBtn.parentElement.classList.add('active')
  store.page -= 1

  if (store.page === 1) {
    prevBtn.parentElement.classList.remove('active')
  }
  initTable()
}
