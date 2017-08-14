const countOccurrences = (string, whatToLookFor) => {
  const regExp = new RegExp(whatToLookFor, "gi")
  return (string.match(regExp) || []).length
}

const getColumnCount = (row) => {
  return countOccurrences(row, ",") + 1
}

const getLongestElementLength = (column) => {
  let longest = 0
  let elementLength

  for (const element of column) {
    if (element) {
      elementLength = element.length
      if (elementLength > longest) {
        longest = elementLength
      }
    }
  }

  return longest
}

const createColumnArrays = (numberOfColumns, columns) => {
  for (let column = 0; column < numberOfColumns; column++) {
    columns.push([])
  }
}

const pushColumnElementsIntoColumns = (rows, numberOfColumns, columns) => {
  for (const row of rows) {
    for (let column = 0; column < numberOfColumns; column++) {
      const element = row.split(",")
      columns[column].push(element[column])
    }
  }
}

const findTableWidths = (numberOfColumns, columns, columnWidths) => {
  for (let column = 0; column < numberOfColumns; column++) {
    let longest = getLongestElementLength(columns[column])
    columnWidths.push(longest)
  }
}

const csvToMd = (input) => {
  const hasHeaders = true

  const rows = input.split("\n")

  if (hasHeaders) {
    const headerRow = rows[0]
    const numberOfColumns = getColumnCount(headerRow)
    const columns = []
    const columnWidths = []

    createColumnArrays(numberOfColumns, columns)
    pushColumnElementsIntoColumns(rows, numberOfColumns, columns)
    findTableWidths(numberOfColumns, columns, columnWidths)
  }
  return "//TODO"
}

module.exports = csvToMd
module.exports.countOccurrences = countOccurrences
module.exports.getLongestElementLength = getLongestElementLength

//| Label          | SquareFootage | Color  |
//|----------------|---------------|--------|
//| Office         | 224           | Blue   |
//| Kitchen        | 230           | Green  |
//| Clothes Closet | 45            | Yellow |
//| Storage Closet | 56            | Red    |
//| Bedroom        | 182           | Orange |
//| Bathroom       | 100           | Teal   |
//| Living room    | 265           | Grey   |
//| Coat closet    | 30            | Pink   |
//| Bike Storage   | 65            | Purple |

// TODO
// [ ] - Unit tests
// [x] - Find longest header or data value for every column
// [ ] - Math the table spacing for every column
// [ ] - Make the table
// [ ] - Add optional header support
// [ ] - Add optional different seperator support
