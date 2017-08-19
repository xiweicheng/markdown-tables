const fs = require("fs")
const tape = require("tape")

const csvToMd = require("../src/index.js")

let input
let expected

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error)
      }
      const content = data.toString()
      resolve(content)
    })
  })
}

const getInput = () => {
  const inputPath = "./test/input.csv"
  return readFile(inputPath)
}

const getExpected = () => {
  const expectedPath = "./test/expected.md"
  return readFile(expectedPath)
}

const setInput = (data) => {
  input = data
}

const setExpected = (data) => {
  expected = data
}

const endToEndTest = () => {
  tape("csv-to-md end to end test", (assert) => {
    assert.plan(1)
    const actual = csvToMd(input)
    assert.equal(actual, expected, "Converts csv to md table as expected")
    assert.end()
  })
}

const unitTest = () => {
  tape("unit tests", (assert) => {
    assert.plan(5)

    let expected
    let actual

    expected = 2
    actual = csvToMd.countOccurrences("JavaScript", "a")
    assert.equal(actual, expected, "`countOccurrences` test")

    expected = 3
    actual = csvToMd.getColumnCount("a, b, c")
    assert.equal(actual, expected, "`getColumnCount` test")

    expected = 10
    actual = csvToMd.getLongestElementLength(["Java", "JavaScript", "Ruby"])
    assert.equal(actual, expected, "`getLongestElementLength` test")

    expected = 3
    let testString = "yellow, blue, red"
    actual = csvToMd.createColumns(testString)
    actual = actual.length
    assert.equal(actual, expected, "`createColumns` test")

    expected = [["1", "a"], ["2", "b"], ["3", "c"]]
    testString = "1,2,3\na,b,c"
    actual = csvToMd.createDataColumns(testString)
    assert.deepEqual(actual, expected, "`createDataColumns` test")

//    expected = [5, 10, 4]
//    testArray = ["apple", "JavaScript", "blue"]
//    actual =

    assert.end()
  })
}

getInput()
  .then((data) => setInput(data))
  .then(() => getExpected())
  .then((data) => setExpected(data))
  .then(() => unitTest())
  .then(() => endToEndTest())
  // eslint-disable-next-line no-console
  .catch((error) => console.log(`Error!! ${error}`))
