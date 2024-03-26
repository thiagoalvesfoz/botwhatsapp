const DEFAULT_AMMOUNT = 1.0

export const formatCurrency = ({ currency = 'BRL', amount }) => {

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    precision: 4,
  }).format(amount)
}

export const getAmmount = (msg) => {
  const values = msg.split(' ')
  if (values.length <= 1) {
    return DEFAULT_AMMOUNT
  }

  const amount = values[1]

  if (isNaN(amount)) {
    return null
  }

  return amount
}
