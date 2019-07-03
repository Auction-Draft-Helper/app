'use strict'

const fs = require('fs'),
      path = require('path'),
      filePath = path.join(__dirname, )

console.log(JSON.parse(fs.readFileSync('data/qbs.json')))

fs.writeFileSync("data/test.json", JSON.stringify([{test: "hey!", hello: 'yo!'}], null, 2))
