export const convertToCSV = (data) => {
  const headers = Object.keys(data[0])
  const rows = data.map((obj) => headers.map((header) => obj[header]))
  return [headers, ...rows].map((row) => row.join(',')).join('\n')
}

export const downloadCSV = (csv) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'data.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
