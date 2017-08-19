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

const csvToMd = (data) => {
  const hasHeaders = true
  const rows = data.split("\n")

  if (hasHeaders) {
    const columns = createDataColumns(data)
    const columnWidths = findColumnWidths(columns)
  }
  return "//TODO"
}

module.exports = csvToMd
module.exports.countOccurrences = countOccurrences
module.exports.getColumnCount = getColumnCount
module.exports.getLongestElementLength = getLongestElementLength
module.exports.createColumns = createColumns
module.exports.createDataColumns = createDataColumns
module.exports.findColumnWidths = findColumnWidths

// | Label          | SquareFootage | Color  |
// |----------------|---------------|--------|
// | Office         | 224           | Blue   |
// | Kitchen        | 230           | Green  |
// | Clothes Closet | 45            | Yellow |
// | Storage Closet | 56            | Red    |
// | Bedroom        | 182           | Orange |
// | Bathroom       | 100           | Teal   |
// | Living room    | 265           | Grey   |
// | Coat closet    | 30            | Pink   |
// | Bike Storage   | 65            | Purple |

// TODO
// [ ] - Unit tests
// [x] - Find longest header or data value for every column
// [ ] - Math the table spacing for every column
// [ ] - Make the table
// [ ] - Add optional header support
// [ ] - Add optional different seperator support
