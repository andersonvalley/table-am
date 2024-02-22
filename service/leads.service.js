import { rerenderTable } from '../components/initTable'
import { Messages } from '../components/message'
import { store } from '../store/store'
import { instance } from './api'
import { sortBy } from '../components/sort'

const loader = new Messages('.loader')
const error = new Messages('.error')
const noContent = new Messages('.no-content')

export class LeadsService {
  static async getAll() {
    try {
      error.hide()
      noContent.hide()
      loader.show()

      const response = await request(store.limit)

      if (response.status === 204) {
        store.nextPage = false
        noContent.show()
      }

      return response.data
    } catch (err) {
      error.show()
    } finally {
      loader.hide()
    }
  }

  static async getAllLeadsWithDelay() {
    const limit = 5
    const ms = 20000

    try {
      loader.show()
      if (!store.nextPage) return

      if (store.limit !== 'all') {
        store.leads = []
        if (id) clearTimeout(id)
        return
      }

      const response = await request(limit)

      if (response.status === 204) {
        store.nextPage = false
        return
      }

      const id = setTimeout(async () => {
        store.page += 1
        await this.getAllLeadsWithDelay()
        rerenderTable()
      }, ms)

      return response.data
    } catch (err) {
      console.log(err)
    } finally {
      loader.hide()
    }
  }
}

async function request(limit) {
  const response = await instance(`/api/v4/leads`, {
    params: {
      limit: limit,
      page: store.page,
    },
  })

  if (!response.data) return response

  store.nextPage = response.data._links.next ? true : false
  store.leads.push(...response.data._embedded.leads)

  if (store.sortBy) sortBy()

  return response
}
