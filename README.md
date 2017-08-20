# markdown-tables

![markdown-tables-logo](./media/markdown-tables-logo.png)

[![Build Status](https://travis-ci.org/matt-jarrett/markdown-tables.svg?branch=master)](https://travis-ci.org/matt-jarrett/markdown-tables)

#### What & Why

Convert csv data into markdown tables friendly for GitHub or GitLab.

#### Use
Adding markdown-tables to your Node project for use:
```
npm install markdown-tables --save
```

To covert sample CSV data of:
```
Label,Square Footage,Color
Office,224,Blue
Kitchen,230,Green
Clothes Closet,45,Yellow
Storage Closet,56,Red
```

To output data of:
```
| Label          | Square Footage | Color  |
|----------------|----------------|--------|
| Office         | 224            | Blue   |
| Kitchen        | 230            | Green  |
| Clothes Closet | 45             | Yellow |
| Storage Closet | 56             | Red    |
```

You use `markdown-tables` as such:
```
const markdownTables = require("markdown-tables")
...
const markdownTable = markdownTables(csvData)
```

#### Want to contribute to Markdown Tables?
Check out our [CONTRIBUTING.md](./CONTRIBUTING.md).
