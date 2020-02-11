export function numberToCurrency(n) {
  // format number 1000000 to 1,234,567
  let str = typeof n !== 'string' ? String(n) : n
  return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function currencyToNumber(n) {
  // format number 1,234,567 to 1000000
  let str = typeof n !== 'string' ? String(n) : n
  return str.replace(/[\,\.]/g, "")
}


