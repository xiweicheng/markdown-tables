const fs = require("fs")
const tape = require("tape")

const csvToMd = require("../src/index.js")

const inputPath = "./test/input.csv"
const outputPath = "./test/output.csv"
const expectedPath = "./test/expected.md"

let actual
let expected

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log(error)
      }
      const content = data.toString()
      resolve(content)
    })
  })
}

const getInput = () => {
  input = readFile(inputPath)
  return input
}
const getExpected = () => {
  expected = readFile(expectedPath)
  return expected
}

const test = (input, expected) => {
  tape("Test csv-to-md converts csv to md as expected", (assert) => {
    console.log("input", input)
    console.log("expected", expected)
    assert.plan(1)
    const actual = csvToMd.csvToMd(input)
    assert.equal(actual, expected, "Expected csv-to-md to convert the csv into md table correctly.")
    assert.end()
  })
}

getInput()
  .then((message) => console.log(message))
  .then((message) => getExpected())
  .then((message) => console.log(message))
  .then(test(input, expected))

// read input csv
// read expected md in as expected
// convert input csv to markdown
// compare
