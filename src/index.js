const countOccurrences = (string, whatToLookFor) => {
  const regExp = new RegExp(whatToLookFor, "gi")
  return (string.match(regExp) || []).length
}

const getColumnCount = (data) => {
  let row = data.split("\n")
  if (row === undefined) {
    row = data
  } else {
    row = row[0]
  }
  return countOccurrences(row, ",") + 1
}

const getLongestElementLength = (column) => {
  let longest = 0

  for (const element of column) {
    if (element) {
      const elementLength = element.length
      if (elementLength > longest) {
        longest = elementLength
      }
    }
  }

  return longest
}

const createColumns = (data) => {
  const columns = []
  const numberOfColumns = getColumnCount(data)

  for (let column = 0; column < numberOfColumns; column++) {
    columns.push([])
  }

  return columns
}

const createDataColumns = (data) => {
  const rows = data.split("\n")
  const columns = createColumns(data)
  const numberOfColumns = columns.length

  for (const row of rows) {
    for (let column = 0; column < numberOfColumns; column++) {
      const element = row.split(",")
      if (element[column]) {
        columns[column].push(element[column])
      }
    }
  }

  return columns
}

const findColumnWidths = (columns) => {
  const columnWidths = []
  const numberOfColumns = columns.length

  for (let column = 0; column < numberOfColumns; column++) {
    const longest = getLongestElementLength(columns[column])
    columnWidths.push(longest)
  }

  return columnWidths
}

const getColumnSpaces = (element, columnWidth) => {
  let output = ""

  if (element !== undefined) {
    const spacesNeeded = columnWidth - element.length
    for (let spaces = 0; spaces < spacesNeeded; spaces++) {
      output += " "
    }
  }

  return output
}

const getColumnHyphens = (element, columnWidth) => {
  let output = ""

  if (element !== undefined) {
    const hyphensNeeded = columnWidth - element.length
    for (let hyphens = 0; hyphens < hyphensNeeded; hyphens++) {
      output += "-"
    }
  }

  return output
}

const markdownTables = (data) => {
  const hasHeaders = true
  const rows = data.split("\n")
  let output = ""

  const columns = createDataColumns(data)
  const numberOfColumns = columns.length
  const columnWidths = findColumnWidths(columns)

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const headerRow = rowIndex === 1

    if (headerRow && hasHeaders) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        const hyphens = getColumnHyphens("", columnWidths[columnIndex])
        output += `|-${hyphens}-`
        if (columnIndex === numberOfColumns - 1) {
          output += "|\n"
        }
      }
    }

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      const element = columns[columnIndex][rowIndex]

      if (element !== undefined) {
        const spaces = getColumnSpaces(element, columnWidths[columnIndex])
        output += `| ${element}${spaces} `
        if (columnIndex === numberOfColumns - 1) {
          output += "|\n"
        }
      }
    }
  }

  return output
}

module.exports = markdownTables
module.exports.countOccurrences = countOccurrences
module.exports.getColumnCount = getColumnCount
module.exports.getLongestElementLength = getLongestElementLength
module.exports.createColumns = createColumns
module.exports.createDataColumns = createDataColumns
module.exports.findColumnWidths = findColumnWidths
module.exports.getColumnSpaces = getColumnSpaces
module.exports.getColumnHyphens = getColumnHyphens

// TODO
// [x] - Unit tests
// [x] - Find longest header or data value for every column
// [x] - Math the table spacing for every column
// [x] - Make the table
// [x] - Find available name
// [ ] - Add optional header support
// [ ] - Add optional different seperator support
