function getCurrentMonthDates() {
  const now = new Date()
  return { month: now.getMonth() + 1, year: now.getFullYear() }
}

function getLastMonthDates() {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  return { month: lastMonth.getMonth() + 1, year: lastMonth.getFullYear() }
}

export { getCurrentMonthDates, getLastMonthDates }
