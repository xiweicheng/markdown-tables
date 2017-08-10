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

const test = () => {
  tape("Test csv-to-md", (assert) => {
    assert.plan(1)
    const actual = csvToMd(input)
    assert.equal(actual, expected, "Converts csv to md as expected")
    assert.end()
  })
}

const setInput = (data) => {
  input = data
}

const setExpected = (data) => {
  expected = data
}

getInput()
  .then((data) => setInput(data))
  .then(() => getExpected())
  .then((data) => setExpected(data))
  .then(() => test())
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error))
