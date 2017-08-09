const fs = require("fs")
const tape = require("tape")

const csvToMd = require("../src/index.js")

let input

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
  input = readFile(inputPath)
  return input
}
const getExpected = () => {
  const expectedPath = "./test/expected.md"
  return readFile(expectedPath)
}

const test = (expected) => {
  tape("Test csv-to-md", (assert) => {
    assert.plan(1)
    const actual = csvToMd.csvToMd(input)
    assert.equal(actual, expected, "Converts csv to md as expected")
    assert.end()
  })
}

getInput()
  .then(() => getExpected())
  .then((expectedData) => test(expectedData))
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error))
