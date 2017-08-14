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
    assert.plan(4)

    let expected = 2
    let actual = csvToMd.countOccurrences("JavaScript", "a")
    assert.equal(actual, expected, "`countOccurrences` positive test")

    expected = 42
    actual = csvToMd.countOccurrences("JavaScript", "j")
    assert.notEqual(actual, expected, "`countOccurrences` negative test")

    expected = 10
    actual = csvToMd.getLongestElementLength(["Java", "JavaScript", "Ruby"])
    assert.equal(actual, expected, "`getLongestElementLength` positive test")

    expected = 42
    actual = csvToMd.getLongestElementLength(["Java", "JavaScript", "Ruby"])
    assert.notEqual(actual, expected, "`getLongestElementLength` negative test")

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
  .catch((error) => console.log(error))
