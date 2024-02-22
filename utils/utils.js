export const normalizeDate = timestamp => {
  if (!timestamp) return

  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('ru', { dateStyle: 'medium' })
}

export const normalizePrice = price => {
  return price.toLocaleString('ru', { style: 'currency', currency: 'RUB' })
}
